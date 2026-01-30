#!/usr/bin/env node

/**
 * PAA Question Collector
 *
 * For each keyword in keywords-discovered.json:
 * 1. Fetches "People Also Ask" questions from Serper API
 * 2. Classifies questions by intent (informational/commercial/transactional)
 * 3. Fills gaps using Gemini API to reach target distribution:
 *    - 5 Informational questions
 *    - 3 Commercial questions
 *    - 2 Transactional questions
 * 4. Saves results to content/paa-questions.json
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  inputFile: 'content/keywords-discovered.json',
  outputFile: 'content/paa-questions.json',
  questionsPerKeyword: {
    informational: 5,
    commercial: 3,
    transactional: 2
  }
};

// Environment variables
const SERPER_API_KEY = process.env.SERPER_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Intent classification patterns for questions
const QUESTION_INTENT_PATTERNS = {
  informational: [
    /^what\s/i, /^how\s/i, /^why\s/i, /^when\s/i, /^who\s/i, /^where\s/i,
    /\bguide\b/i, /\btutorial\b/i, /\bexamples?\b/i, /\bbenefits?\b/i,
    /\bexplain/i, /\bunderstand/i, /\blearn/i, /\bdefinition\b/i,
    /\bmeaning\b/i, /\btips\b/i, /\bideas?\b/i, /\bbasics?\b/i,
    /^is\s.*\s(a|an)\b/i, /^can\s.*\s(be|do)\b/i, /^does\s/i,
    /\bdifference\s+between\b/i, /\bwork\b/i
  ],
  transactional: [
    /\bpricing\b/i, /\bcost\b/i, /\bhire\b/i, /\bbuy\b/i, /\bpurchase\b/i,
    /\bservices?\b/i, /\bagency\b/i, /\bconsultant\b/i, /\bnear me\b/i,
    /\bquote\b/i, /\bfree trial\b/i, /\bdemo\b/i, /\bget started\b/i,
    /\bsign up\b/i, /\bcontact\b/i, /\bbook\b/i, /\bschedule\b/i,
    /\bhow much\b/i, /\bprice\b/i, /\bafford\b/i, /\bbudget\b/i,
    /\bwhere\s+(can|do)\s+i\s+(buy|get|find)\b/i
  ],
  commercial: [
    /\bbest\b/i, /\btop\b/i, /\breview/i, /\bcomparison\b/i, /\bvs\b/i,
    /\balternative/i, /\bfor business/i, /\bfor companies/i, /\bfor small/i,
    /\bpros and cons\b/i, /\bworth it\b/i, /\bshould i\b/i, /\bcompare\b/i,
    /\bwhich\s+(is|are)\s+better\b/i, /\brecommend/i, /\brating/i
  ]
};

/**
 * Sleep helper for rate limiting
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if text matches any pattern in a list
 */
function matchesAnyPattern(text, patterns) {
  return patterns.some(pattern => pattern.test(text));
}

/**
 * Classify question intent
 */
function classifyQuestionIntent(question) {
  const text = question.toLowerCase();

  // Check transactional first (highest buyer intent)
  if (matchesAnyPattern(text, QUESTION_INTENT_PATTERNS.transactional)) {
    return 'transactional';
  }

  // Check commercial
  if (matchesAnyPattern(text, QUESTION_INTENT_PATTERNS.commercial)) {
    return 'commercial';
  }

  // Check informational
  if (matchesAnyPattern(text, QUESTION_INTENT_PATTERNS.informational)) {
    return 'informational';
  }

  // Default to informational for ambiguous questions
  return 'informational';
}

/**
 * Fetch PAA questions from Serper API
 */
async function getSerperPAA(keyword) {
  const url = 'https://google.serper.dev/search';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: keyword,
        gl: 'us',
        lr: 'lang_en',  // Language restrict - required for PAA results
        num: 10
      })
    });

    if (!response.ok) {
      throw new Error(`Serper API error: ${response.status}`);
    }

    const data = await response.json();

    // Note: PAA may not be returned for all queries or API plans
    // Script gracefully falls back to Gemini when PAA is unavailable
    const paaQuestions = data.peopleAlsoAsk || [];

    return paaQuestions.slice(0, 10).map(item => ({
      question: item.question,
      snippet: item.snippet || null,
      source: 'serper'
    }));
  } catch (error) {
    console.error(`  Error fetching PAA for "${keyword}":`, error.message);
    return [];
  }
}

/**
 * Generate questions using Gemini API to fill gaps
 */
async function generateQuestionsWithGemini(keyword, intent, count) {
  if (count <= 0) return [];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const intentDescriptions = {
    informational: 'educational questions that help people understand concepts, learn how things work, or get definitions. Use "what is", "how does", "why", "when should" style questions.',
    commercial: 'comparison and evaluation questions that help people decide between options. Use "best", "vs", "comparison", "pros and cons", "which is better" style questions.',
    transactional: 'buyer-intent questions about pricing, hiring, services, or getting started. Use "how much", "cost", "pricing", "where to buy", "hire", "services" style questions.'
  };

  const prompt = `You are an SEO expert. Generate exactly ${count} ${intent} questions about "${keyword}".

${intent.toUpperCase()} questions are: ${intentDescriptions[intent]}

Requirements:
- Each question must end with a question mark
- Questions should be relevant to small business owners
- Questions should be searchable (things people actually ask Google)
- One question per line
- Do NOT number the questions
- Do NOT add any other text, just the questions

Generate ${count} questions:`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const questions = text
      .split('\n')
      .map(q => q.trim())
      .filter(q => q.length > 0 && q.endsWith('?'))
      .slice(0, count)
      .map(q => ({
        question: q,
        snippet: null,
        source: 'gemini'
      }));

    return questions;
  } catch (error) {
    console.error(`  Error generating ${intent} questions:`, error.message);
    return [];
  }
}

/**
 * Process a single keyword: get PAA, classify, fill gaps
 */
async function processKeyword(keyword, keywordIntent) {
  console.log(`\n  Fetching PAA questions from Serper...`);
  const paaQuestions = await getSerperPAA(keyword);
  console.log(`  Found ${paaQuestions.length} PAA questions`);

  // Classify PAA questions by intent
  const classified = {
    informational: [],
    commercial: [],
    transactional: []
  };

  for (const paa of paaQuestions) {
    const intent = classifyQuestionIntent(paa.question);
    classified[intent].push({
      ...paa,
      intent
    });
  }

  console.log(`  Classified: ${classified.informational.length} info, ${classified.commercial.length} commercial, ${classified.transactional.length} transactional`);

  // Calculate gaps
  const gaps = {
    informational: Math.max(0, CONFIG.questionsPerKeyword.informational - classified.informational.length),
    commercial: Math.max(0, CONFIG.questionsPerKeyword.commercial - classified.commercial.length),
    transactional: Math.max(0, CONFIG.questionsPerKeyword.transactional - classified.transactional.length)
  };

  const totalGaps = gaps.informational + gaps.commercial + gaps.transactional;

  if (totalGaps > 0) {
    console.log(`  Gaps to fill: ${gaps.informational} info, ${gaps.commercial} commercial, ${gaps.transactional} transactional`);
    console.log(`  Generating ${totalGaps} questions with Gemini...`);

    // Fill gaps for each intent type
    for (const intent of ['informational', 'commercial', 'transactional']) {
      if (gaps[intent] > 0) {
        await sleep(300); // Rate limit
        const generated = await generateQuestionsWithGemini(keyword, intent, gaps[intent]);
        for (const q of generated) {
          classified[intent].push({
            ...q,
            intent
          });
        }
      }
    }
  }

  // Build final selection
  const selected = [
    ...classified.informational.slice(0, CONFIG.questionsPerKeyword.informational),
    ...classified.commercial.slice(0, CONFIG.questionsPerKeyword.commercial),
    ...classified.transactional.slice(0, CONFIG.questionsPerKeyword.transactional)
  ];

  const finalCounts = {
    informational: selected.filter(q => q.intent === 'informational').length,
    commercial: selected.filter(q => q.intent === 'commercial').length,
    transactional: selected.filter(q => q.intent === 'transactional').length
  };

  console.log(`  Final: ${finalCounts.informational} info, ${finalCounts.commercial} commercial, ${finalCounts.transactional} transactional (${selected.length} total)`);

  return {
    keyword,
    keywordIntent,
    serperQuestionsFound: paaQuestions.length,
    questions: selected
  };
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(60));
  console.log('PAA Question Collector');
  console.log('='.repeat(60));
  console.log();

  // Validate environment
  if (!SERPER_API_KEY) {
    console.error('ERROR: SERPER_API_KEY not found in .env file');
    process.exit(1);
  }
  if (!GEMINI_API_KEY) {
    console.error('ERROR: GEMINI_API_KEY not found in .env file');
    process.exit(1);
  }

  // Load keywords
  const inputPath = path.join(process.cwd(), CONFIG.inputFile);
  if (!fs.existsSync(inputPath)) {
    console.error(`ERROR: ${CONFIG.inputFile} not found. Run discover-keywords.js first.`);
    process.exit(1);
  }

  const keywordsData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const keywords = keywordsData.keywords || [];

  if (keywords.length === 0) {
    console.error('ERROR: No keywords found in input file');
    process.exit(1);
  }

  console.log(`Loaded ${keywords.length} keywords from ${CONFIG.inputFile}\n`);
  console.log(`Target per keyword: ${CONFIG.questionsPerKeyword.informational} info + ${CONFIG.questionsPerKeyword.commercial} commercial + ${CONFIG.questionsPerKeyword.transactional} transactional = 10 questions`);

  const results = [];

  for (let i = 0; i < keywords.length; i++) {
    const kw = keywords[i];
    const num = String(i + 1).padStart(2, '0');

    console.log(`\n${'─'.repeat(60)}`);
    console.log(`[${num}/${keywords.length}] Keyword: "${kw.keyword}" (${kw.intent})`);
    console.log(`${'─'.repeat(60)}`);

    const result = await processKeyword(kw.keyword, kw.intent);
    results.push(result);

    // Rate limit between keywords
    if (i < keywords.length - 1) {
      await sleep(1000);
    }
  }

  // Build output
  const output = {
    generatedAt: new Date().toISOString(),
    sourceFile: CONFIG.inputFile,
    questionsPerKeyword: CONFIG.questionsPerKeyword,
    totalKeywords: results.length,
    totalQuestions: results.reduce((sum, r) => sum + r.questions.length, 0),
    results
  };

  // Save results
  const outputPath = path.join(process.cwd(), CONFIG.outputFile);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Keywords processed: ${results.length}`);
  console.log(`Total questions collected: ${output.totalQuestions}`);
  console.log(`Output saved to: ${CONFIG.outputFile}`);
  console.log('='.repeat(60));
}

main().catch(error => {
  console.error('\nFatal error:', error.message);
  process.exit(1);
});
