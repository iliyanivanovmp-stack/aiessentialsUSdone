#!/usr/bin/env node

/**
 * SEO Queue Generator from PAA Questions
 *
 * Takes the 100 PAA questions from content/paa-questions.json and:
 * 1. Generates 10 fan-out FAQ questions for each using Gemini API
 * 2. Creates a q-google-ads.md file with the same structure as q.md
 * 3. Total output: 100 blog post items with 10 FAQ questions each
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  inputFile: 'content/paa-questions.json',
  outputFile: 'content/q-google-ads.md',
  delayBetweenCalls: 500 // ms between API calls to avoid rate limits
};

// Environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Sleep helper for rate limiting
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate fan-out questions using Gemini API with Google Search Grounding
 */
async function getGeminiFanOut(question, keyword) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  // Prompt designed to encourage multiple distinct searches
  const prompt = `Research "${question}" about ${keyword} in detail for small business owners.

Perform multiple distinct searches to cover:
- Different perspectives and approaches
- Technical specifications and implementation details
- Cost considerations and ROI
- Best practices and common mistakes
- Recent trends and industry news
- Comparison with alternatives
- Step-by-step guides and tutorials
- Real-world examples and case studies

Provide a comprehensive answer that addresses all these aspects.`;

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
        tools: [{
          google_search: {}
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Extract fan-out queries from grounding metadata
    const webSearchQueries = data.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

    // Convert search queries to question format if needed
    const fanOutQuestions = webSearchQueries
      .map(q => {
        // If already a question, return as-is
        if (q.endsWith('?')) return q;
        // Otherwise, convert to question format
        return q;
      })
      .slice(0, 10);

    if (fanOutQuestions.length > 0) {
      console.log(`    → Generated ${fanOutQuestions.length} search-grounded queries`);
    }

    return fanOutQuestions;
  } catch (error) {
    console.error(`  Error generating fan-out for "${question.substring(0, 50)}...":`, error.message);
    return [];
  }
}

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60)
    .replace(/-$/, '');
}

/**
 * Generate a blog post title from a question
 */
function generateTitle(question) {
  // Remove question mark and common question starters for cleaner title
  let title = question.replace(/\?$/, '');

  // Capitalize first letter of each word for title case
  title = title.split(' ').map((word, index) => {
    // Keep small words lowercase unless first word
    const smallWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    if (index > 0 && smallWords.includes(word.toLowerCase())) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');

  return title;
}

/**
 * Generate the q-google-ads.md file content
 */
function generateQueueFile(items) {
  const now = new Date().toISOString();

  const yamlItems = items.map(item => {
    const faqYaml = item.faq_questions
      .map(q => `      - "${q.replace(/"/g, '\\"')}"`)
      .join('\n');

    return `  - id: "${item.id}"
    keyword: "${item.keyword}"
    question: "${item.question.replace(/"/g, '\\"')}"
    title: "${item.title.replace(/"/g, '\\"')}"
    slug: "${item.slug}"
    faq_questions:
${faqYaml}
    status: "queued"
    postPath: null
    updatedAt: null
    publishedAt: null
    error: null`;
  }).join('\n\n');

  return `# SEO Publishing Queue - Google Ads Keywords (q-google-ads.md)

This file contains 100 blog post topics generated from Google Ads Keyword Planner.
Only the YAML block between QUEUE_START and QUEUE_END is edited by automation.

<!--QUEUE_START-->
\`\`\`yaml
version: 1
generatedAt: "${now}"

defaults:
  country: "US"
  language: "en"
  blogBasePath: "content/blog-posts"
  statusOrder: ["queued", "in_progress", "published", "failed"]

items:
${yamlItems}
\`\`\`
<!--QUEUE_END-->

## How to Use This File

1. **Run the blog-post-from-queue command** to write the next queued post
2. Posts are processed in order from top to bottom
3. Status changes: queued -> in_progress -> published (or failed)
4. The postPath field is filled in when the post is published

## Statistics

- **Total items:** ${items.length}
- **Queued:** ${items.filter(i => i.status === 'queued').length}
- **In Progress:** ${items.filter(i => i.status === 'in_progress').length}
- **Published:** ${items.filter(i => i.status === 'published').length}
- **Failed:** ${items.filter(i => i.status === 'failed').length}
`;
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(70));
  console.log('SEO Queue Generator from Google Ads PAA Questions');
  console.log('='.repeat(70));
  console.log();

  // Validate environment
  if (!GEMINI_API_KEY) {
    console.error('ERROR: GEMINI_API_KEY not found in .env file');
    process.exit(1);
  }

  // Load PAA questions
  const inputPath = path.join(process.cwd(), CONFIG.inputFile);
  if (!fs.existsSync(inputPath)) {
    console.error(`ERROR: ${CONFIG.inputFile} not found. Run collect-paa-questions.js first.`);
    process.exit(1);
  }

  const paaData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

  // Flatten all questions from all keywords
  const allQuestions = [];
  for (const result of paaData.results) {
    for (const q of result.questions) {
      allQuestions.push({
        keyword: result.keyword,
        keywordIntent: result.keywordIntent,
        question: q.question,
        intent: q.intent,
        source: q.source
      });
    }
  }

  console.log(`Loaded ${allQuestions.length} questions from ${paaData.results.length} keywords\n`);

  const allItems = [];
  let itemCounter = 0;

  for (let i = 0; i < allQuestions.length; i++) {
    const q = allQuestions[i];
    const num = String(i + 1).padStart(3, '0');
    itemCounter++;

    console.log(`[${num}/${allQuestions.length}] Processing: "${q.question.substring(0, 60)}..."`);
    console.log(`  Keyword: "${q.keyword}" | Intent: ${q.intent} | Source: ${q.source}`);

    // Generate fan-out questions with Gemini
    const fanOutQuestions = await getGeminiFanOut(q.question, q.keyword);

    if (fanOutQuestions.length < 10) {
      console.log(`  WARNING: Only got ${fanOutQuestions.length} fan-out questions, using fallback for remaining`);
    }

    // Use fallback questions if needed
    const faqQuestions = fanOutQuestions.length >= 10
      ? fanOutQuestions
      : [
          ...fanOutQuestions,
          `What is the cost of ${q.keyword}?`,
          `How long does ${q.keyword} take to implement?`,
          `What are the benefits of ${q.keyword}?`,
          `Is ${q.keyword} right for small businesses?`,
          `What tools are used for ${q.keyword}?`,
          `Do I need technical skills for ${q.keyword}?`,
          `What is the ROI of ${q.keyword}?`,
          `How do I get started with ${q.keyword}?`,
          `What are common mistakes with ${q.keyword}?`,
          `When should I hire a consultant for ${q.keyword}?`
        ].slice(0, 10);

    // Generate title and slug
    const title = generateTitle(q.question);
    const slug = generateSlug(title);

    allItems.push({
      id: `gads-${num}`,
      keyword: q.keyword,
      question: q.question,
      title,
      slug,
      faq_questions: faqQuestions,
      status: 'queued'
    });

    // Rate limiting
    await sleep(CONFIG.delayBetweenCalls);

    // Progress update every 10 items
    if ((i + 1) % 10 === 0) {
      console.log(`  Progress: ${i + 1}/${allQuestions.length} (${Math.round((i + 1) / allQuestions.length * 100)}%)\n`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`Generated ${allItems.length} blog post items`);
  console.log('='.repeat(70));

  // Generate and save the file
  const content = generateQueueFile(allItems);
  const outputPath = path.join(process.cwd(), CONFIG.outputFile);
  fs.writeFileSync(outputPath, content, 'utf8');

  console.log(`\nQueue file saved to: ${CONFIG.outputFile}`);
  console.log('\n' + '='.repeat(70));
  console.log('Done! SEO queue generation complete.');
  console.log('='.repeat(70));
}

main().catch(error => {
  console.error('\nFatal error:', error.message);
  process.exit(1);
});
