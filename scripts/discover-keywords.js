#!/usr/bin/env node

/**
 * Google Ads Keyword Discovery Script
 *
 * Uses Google Ads Keyword Planner API to discover keywords from URL seed,
 * classifies them by intent, scores them, and selects a balanced mix:
 * - 5 Informational (awareness/top of funnel)
 * - 3 Commercial (consideration/mid funnel)
 * - 2 Transactional (bottom of funnel/ready to buy)
 *
 * Prerequisites:
 * - GOOGLE_ADS_DEVELOPER_TOKEN
 * - GOOGLE_ADS_CLIENT_ID
 * - GOOGLE_ADS_CLIENT_SECRET
 * - GOOGLE_ADS_REFRESH_TOKEN
 * - GOOGLE_ADS_CUSTOMER_ID (regular account with Keyword Planner - without dashes)
 * - GOOGLE_ADS_LOGIN_CUSTOMER_ID (MCC account with API access - without dashes)
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  urlSeed: 'https://aiessentials.us',
  outputFile: 'content/keywords-discovered.json',
  selection: {
    informational: 5,
    commercial: 3,
    transactional: 2
  }
};

// Environment variables
const DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_ADS_REFRESH_TOKEN;
const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID; // Regular account (with Keyword Planner)
const LOGIN_CUSTOMER_ID = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID; // MCC account (with API access)

// Intent classification patterns
const INTENT_PATTERNS = {
  informational: [
    /^what\s/i, /^how\s/i, /^why\s/i, /^when\s/i, /^who\s/i, /^where\s/i,
    /\bguide\b/i, /\btutorial\b/i, /\bexamples?\b/i, /\bbenefits?\b/i,
    /\bexplain/i, /\bunderstand/i, /\blearn/i, /\bdefinition\b/i,
    /\bmeaning\b/i, /\btips\b/i, /\bideas?\b/i, /\bbasics?\b/i
  ],
  transactional: [
    /\bpricing\b/i, /\bcost\b/i, /\bhire\b/i, /\bbuy\b/i, /\bpurchase\b/i,
    /\bservices?\b/i, /\bagency\b/i, /\bconsultant\b/i, /\bnear me\b/i,
    /\bquote\b/i, /\bfree trial\b/i, /\bdemo\b/i, /\bget started\b/i,
    /\bsign up\b/i, /\bcontact\b/i, /\bbook\b/i, /\bschedule\b/i
  ],
  commercial: [
    /\bbest\b/i, /\btop\b/i, /\breview/i, /\bcomparison\b/i, /\bvs\b/i,
    /\balternative/i, /\bfor business/i, /\bfor companies/i, /\bfor small/i,
    /\bpros and cons\b/i, /\bworth it\b/i, /\bshould i\b/i, /\bcompare\b/i
  ]
};

// Junk filter patterns
const JUNK_PATTERNS = {
  tooGeneric: [
    /^ai$/i, /^automation$/i, /^business$/i, /^software$/i, /^tool$/i,
    /^system$/i, /^company$/i, /^service$/i
  ],
  irrelevantIndustry: [
    /\bhealthcare\b/i, /\bmedical\b/i, /\blegal\b/i, /\blaw\b/i,
    /\breal estate\b/i, /\bgaming\b/i, /\bcrypto\b/i, /\bnft\b/i,
    /\bstock\b/i, /\binvest\b/i, /\btrading\b/i
  ],
  brandNavigational: [
    /\bchatgpt login\b/i, /\bopenai\b/i, /\bgoogle ai\b/i, /\bmicrosoft ai\b/i,
    /\bclaude ai\b/i, /\bgemini\b/i, /\bsalesforce\b/i, /\bhubspot\b/i
  ]
};

// Commercial intent boost terms
const COMMERCIAL_BOOST_TERMS = [
  'consulting', 'services', 'implementation', 'agency', 'consultant',
  'pricing', 'cost', 'for business', 'for companies', 'small business',
  'enterprise', 'solutions', 'provider', 'expert', 'specialist'
];

/**
 * Get access token using refresh token
 */
async function getAccessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`Token error: ${data.error} - ${data.error_description}`);
  }
  return data.access_token;
}

/**
 * Call Google Ads Keyword Planner API
 */
async function getKeywordIdeas(accessToken) {
  const url = `https://googleads.googleapis.com/v18/customers/${CUSTOMER_ID}:generateKeywordIdeas`;

  const requestBody = {
    urlSeed: {
      url: CONFIG.urlSeed
    },
    geoTargetConstants: ['geoTargetConstants/2840'], // United States
    language: 'languageConstants/1000', // English
    keywordPlanNetwork: 'GOOGLE_SEARCH',
    includeAdultKeywords: false
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'developer-token': DEVELOPER_TOKEN,
      'login-customer-id': LOGIN_CUSTOMER_ID,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data.results || [];
}

/**
 * Check if keyword matches any pattern in a list
 */
function matchesAnyPattern(keyword, patterns) {
  return patterns.some(pattern => pattern.test(keyword));
}

/**
 * Filter out junk keywords
 */
function filterJunk(keywords) {
  return keywords.filter(kw => {
    const text = kw.text.toLowerCase();

    // Filter single-word generic terms
    if (text.split(/\s+/).length === 1 && matchesAnyPattern(text, JUNK_PATTERNS.tooGeneric)) {
      return false;
    }

    // Filter irrelevant industries
    if (matchesAnyPattern(text, JUNK_PATTERNS.irrelevantIndustry)) {
      return false;
    }

    // Filter brand navigational
    if (matchesAnyPattern(text, JUNK_PATTERNS.brandNavigational)) {
      return false;
    }

    // Filter very low volume (less than 10 monthly searches)
    if (kw.avgMonthlySearches < 10) {
      return false;
    }

    return true;
  });
}

/**
 * Remove duplicate variants (singular/plural, punctuation)
 */
function removeDuplicates(keywords) {
  const seen = new Set();
  return keywords.filter(kw => {
    // Normalize: lowercase, remove punctuation, trim
    const normalized = kw.text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Simple singular/plural normalization
    const base = normalized.replace(/s$/, '');

    if (seen.has(base) || seen.has(normalized)) {
      return false;
    }
    seen.add(base);
    seen.add(normalized);
    return true;
  });
}

/**
 * Classify keyword intent
 */
function classifyIntent(keyword) {
  const text = keyword.toLowerCase();

  // Check transactional first (highest buyer intent)
  if (matchesAnyPattern(text, INTENT_PATTERNS.transactional)) {
    return 'transactional';
  }

  // Check informational
  if (matchesAnyPattern(text, INTENT_PATTERNS.informational)) {
    return 'informational';
  }

  // Check commercial
  if (matchesAnyPattern(text, INTENT_PATTERNS.commercial)) {
    return 'commercial';
  }

  // Default to informational for ambiguous keywords
  return 'informational';
}

/**
 * Score keyword based on intent type
 */
function scoreKeyword(kw, intent) {
  const searches = kw.avgMonthlySearches || 0;
  const bidLow = kw.lowTopPageBid || 0;
  const bidHigh = kw.highTopPageBid || 0;
  const avgBid = (bidLow + bidHigh) / 2;
  const competition = kw.competition || 'UNKNOWN';

  // Competition score (lower is better for ranking)
  const competitionScore = {
    'LOW': 1.0,
    'MEDIUM': 0.7,
    'HIGH': 0.4,
    'UNKNOWN': 0.5
  }[competition] || 0.5;

  // Commercial boost
  const hasCommercialTerms = COMMERCIAL_BOOST_TERMS.some(term =>
    kw.text.toLowerCase().includes(term)
  );
  const commercialBoost = hasCommercialTerms ? 1.2 : 1.0;

  // Normalize values (rough normalization)
  const normalizedSearches = Math.min(searches / 10000, 1);
  const normalizedBid = Math.min(avgBid / 50, 1);

  let score;

  switch (intent) {
    case 'informational':
      // Focus on volume & rankability
      score = (normalizedSearches * 0.5) + (competitionScore * 0.3) + (normalizedBid * 0.2);
      break;
    case 'commercial':
      // Balance volume with buyer intent
      score = (normalizedSearches * 0.3) + (normalizedBid * 0.4) + (competitionScore * 0.2) + (commercialBoost * 0.1);
      break;
    case 'transactional':
      // Prioritize high-value buyer intent
      score = (normalizedBid * 0.5) + (normalizedSearches * 0.2) + (competitionScore * 0.2) + (commercialBoost * 0.1);
      break;
    default:
      score = normalizedSearches;
  }

  return Math.round(score * 100) / 100;
}

/**
 * Parse keyword results from API response
 */
function parseKeywordResults(results) {
  return results.map(result => {
    const metrics = result.keywordIdeaMetrics || {};
    return {
      text: result.text || '',
      avgMonthlySearches: parseInt(metrics.avgMonthlySearches) || 0,
      competition: metrics.competition || 'UNKNOWN',
      lowTopPageBid: (metrics.lowTopOfPageBidMicros || 0) / 1000000,
      highTopPageBid: (metrics.highTopOfPageBidMicros || 0) / 1000000
    };
  });
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Google Ads Keyword Discovery');
  console.log('='.repeat(60));
  console.log();

  // Validate environment
  const required = ['GOOGLE_ADS_DEVELOPER_TOKEN', 'GOOGLE_ADS_CLIENT_ID',
    'GOOGLE_ADS_CLIENT_SECRET', 'GOOGLE_ADS_REFRESH_TOKEN', 'GOOGLE_ADS_CUSTOMER_ID',
    'GOOGLE_ADS_LOGIN_CUSTOMER_ID'];

  for (const key of required) {
    if (!process.env[key]) {
      console.error(`ERROR: ${key} not found in .env file`);
      process.exit(1);
    }
  }

  try {
    // Step 1: Get access token
    console.log('Step 1: Authenticating with Google Ads API...');
    const accessToken = await getAccessToken();
    console.log('✅ Authentication successful\n');

    // Step 2: Get keyword ideas
    console.log(`Step 2: Fetching keyword ideas for ${CONFIG.urlSeed}...`);
    const rawResults = await getKeywordIdeas(accessToken);
    console.log(`✅ Received ${rawResults.length} keyword ideas\n`);

    if (rawResults.length === 0) {
      console.log('No keywords found. Try a different URL or check your Google Ads account.');
      process.exit(0);
    }

    // Step 3: Parse results
    console.log('Step 3: Parsing keyword metrics...');
    let keywords = parseKeywordResults(rawResults);
    console.log(`✅ Parsed ${keywords.length} keywords\n`);

    // Step 4: Filter junk
    console.log('Step 4: Filtering junk keywords...');
    const beforeFilter = keywords.length;
    keywords = filterJunk(keywords);
    console.log(`✅ Filtered: ${beforeFilter} → ${keywords.length} keywords\n`);

    // Step 5: Remove duplicates
    console.log('Step 5: Removing duplicates...');
    const beforeDedup = keywords.length;
    keywords = removeDuplicates(keywords);
    console.log(`✅ Deduplicated: ${beforeDedup} → ${keywords.length} keywords\n`);

    // Step 6: Classify and score
    console.log('Step 6: Classifying intent and scoring...');
    const classified = {
      informational: [],
      commercial: [],
      transactional: []
    };

    for (const kw of keywords) {
      const intent = classifyIntent(kw.text);
      const score = scoreKeyword(kw, intent);
      classified[intent].push({
        ...kw,
        intent,
        score
      });
    }

    // Sort each category by score
    for (const intent of Object.keys(classified)) {
      classified[intent].sort((a, b) => b.score - a.score);
    }

    console.log(`✅ Classified: ${classified.informational.length} informational, ${classified.commercial.length} commercial, ${classified.transactional.length} transactional\n`);

    // Step 7: Select balanced mix
    console.log('Step 7: Selecting balanced mix...');
    const selected = [
      ...classified.informational.slice(0, CONFIG.selection.informational),
      ...classified.commercial.slice(0, CONFIG.selection.commercial),
      ...classified.transactional.slice(0, CONFIG.selection.transactional)
    ];

    console.log(`✅ Selected ${selected.length} keywords:\n`);

    // Display results
    console.log('-'.repeat(60));
    console.log('INFORMATIONAL (Top of Funnel):');
    classified.informational.slice(0, CONFIG.selection.informational).forEach((kw, i) => {
      console.log(`  ${i + 1}. "${kw.text}" (${kw.avgMonthlySearches} searches, score: ${kw.score})`);
    });

    console.log('\nCOMMERCIAL (Mid Funnel):');
    classified.commercial.slice(0, CONFIG.selection.commercial).forEach((kw, i) => {
      console.log(`  ${i + 1}. "${kw.text}" (${kw.avgMonthlySearches} searches, score: ${kw.score})`);
    });

    console.log('\nTRANSACTIONAL (Bottom of Funnel):');
    classified.transactional.slice(0, CONFIG.selection.transactional).forEach((kw, i) => {
      console.log(`  ${i + 1}. "${kw.text}" (${kw.avgMonthlySearches} searches, score: ${kw.score})`);
    });
    console.log('-'.repeat(60));

    // Step 8: Save results
    console.log('\nStep 8: Saving results...');
    const output = {
      generatedAt: new Date().toISOString(),
      urlSeed: CONFIG.urlSeed,
      totalKeywordsFound: rawResults.length,
      afterFiltering: keywords.length,
      selection: CONFIG.selection,
      keywords: selected.map(kw => ({
        keyword: kw.text,
        intent: kw.intent,
        monthlySearches: kw.avgMonthlySearches,
        competition: kw.competition,
        topBidLow: kw.lowTopPageBid,
        topBidHigh: kw.highTopPageBid,
        score: kw.score
      }))
    };

    const outputPath = path.join(process.cwd(), CONFIG.outputFile);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`✅ Saved to ${CONFIG.outputFile}\n`);

    console.log('='.repeat(60));
    console.log('Done! Keyword discovery complete.');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
