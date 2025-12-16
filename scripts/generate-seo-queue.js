#!/usr/bin/env node

/**
 * SEO Queue Generator
 *
 * This script:
 * 1. Takes 10 seed keywords
 * 2. Uses Serper API to find "People Also Ask" questions for each keyword
 * 3. Uses Gemini API to generate fan-out questions for each PAA question
 * 4. Outputs a q.md file with 100 blog post items
 */

require('dotenv').config();

const SERPER_API_KEY = process.env.SERPER_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SEED_KEYWORDS = [
  "ai automation",
  "ai systems",
  "ai company",
  "ai consulting",
  "ai for my business",
  "ai agency",
  "consulting ai",
  "ai and automation",
  "ai in automation",
  "ai for work"
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch "People Also Ask" questions from Serper API
 */
async function getSerperQuestions(keyword) {
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
        hl: 'en',
        num: 10
      })
    });

    if (!response.ok) {
      throw new Error(`Serper API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract "People Also Ask" questions
    const paaQuestions = data.peopleAlsoAsk || [];

    // Get up to 10 questions
    const questions = paaQuestions.slice(0, 10).map(item => item.question);

    console.log(`  Found ${questions.length} PAA questions for "${keyword}"`);
    return questions;
  } catch (error) {
    console.error(`  Error fetching questions for "${keyword}":`, error.message);
    return [];
  }
}

/**
 * Generate fan-out questions using Gemini API
 */
async function getGeminiFanOut(question, keyword) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `You are an SEO expert. Given this main question about "${keyword}":

"${question}"

Generate exactly 10 related follow-up questions that someone might also want answered. These will be used for an FAQ section.

Requirements:
- Questions should be specific and actionable
- Mix of "how", "what", "why", "when", "how much" questions
- Relevant to small business owners interested in AI
- Each question should be on a new line
- Do NOT number the questions
- Do NOT add any other text, just the 10 questions

Example format:
How much does X cost per month?
What tools are needed for X?
Can I do X without coding?`;

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

    // Extract text from response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Split into questions and clean up
    const fanOutQuestions = text
      .split('\n')
      .map(q => q.trim())
      .filter(q => q.length > 0 && q.endsWith('?'))
      .slice(0, 10);

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
 * Generate the q.md file content
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

  return `# SEO Publishing Queue (q.md)

This file is the source of truth for what gets written next.
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
  console.log('='.repeat(60));
  console.log('SEO Queue Generator');
  console.log('='.repeat(60));
  console.log();

  if (!SERPER_API_KEY) {
    console.error('ERROR: SERPER_API_KEY not found in environment variables');
    process.exit(1);
  }
  if (!GEMINI_API_KEY) {
    console.error('ERROR: GEMINI_API_KEY not found in environment variables');
    process.exit(1);
  }

  const allItems = [];
  let itemCounter = 0;

  for (let kwIndex = 0; kwIndex < SEED_KEYWORDS.length; kwIndex++) {
    const keyword = SEED_KEYWORDS[kwIndex];
    const kwNum = String(kwIndex + 1).padStart(2, '0');

    console.log(`\n[${kwNum}/10] Processing keyword: "${keyword}"`);
    console.log('-'.repeat(40));

    // Get PAA questions from Serper
    const questions = await getSerperQuestions(keyword);

    if (questions.length === 0) {
      console.log(`  WARNING: No questions found, skipping keyword`);
      continue;
    }

    // Process each question
    for (let qIndex = 0; qIndex < questions.length; qIndex++) {
      const question = questions[qIndex];
      const qNum = String(qIndex + 1).padStart(2, '0');
      itemCounter++;

      console.log(`  [Q${qNum}] ${question.substring(0, 50)}...`);

      // Get fan-out questions from Gemini
      const fanOutQuestions = await getGeminiFanOut(question, keyword);

      // Generate title and slug
      const title = generateTitle(question);
      const slug = generateSlug(title);

      allItems.push({
        id: `kw${kwNum}-q${qNum}`,
        keyword,
        question,
        title,
        slug,
        faq_questions: fanOutQuestions.length > 0 ? fanOutQuestions : [
          `What is the cost of ${keyword}?`,
          `How long does ${keyword} take to implement?`,
          `What are the benefits of ${keyword}?`,
          `Is ${keyword} right for small businesses?`,
          `What tools are used for ${keyword}?`,
          `Do I need technical skills for ${keyword}?`,
          `What is the ROI of ${keyword}?`,
          `How do I get started with ${keyword}?`,
          `What are common mistakes with ${keyword}?`,
          `When should I hire a consultant for ${keyword}?`
        ],
        status: 'queued'
      });

      // Rate limiting - be nice to APIs
      await sleep(500);
    }

    // Pause between keywords
    await sleep(1000);
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Generated ${allItems.length} blog post items`);
  console.log('='.repeat(60));

  // Generate and save the file
  const content = generateQueueFile(allItems);
  const fs = require('fs');
  const path = require('path');

  const outputPath = path.join(process.cwd(), 'content', 'q.md');
  fs.writeFileSync(outputPath, content, 'utf8');

  console.log(`\nQueue file saved to: ${outputPath}`);

  // Auto-commit and push to git
  console.log('\n' + '='.repeat(60));
  console.log('Committing and pushing to GitHub...');
  console.log('='.repeat(60));

  const { execSync } = require('child_process');

  try {
    execSync('git add content/q.md', { stdio: 'inherit' });
    execSync(`git commit -m "Generate SEO queue with ${allItems.length} blog post topics"`, { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    console.log('\n✅ Successfully pushed to GitHub!');
  } catch (gitError) {
    console.log('\n⚠️  Git push failed or no changes to commit.');
    console.log('You may need to manually run:');
    console.log('  git add content/q.md');
    console.log('  git commit -m "Generate SEO queue"');
    console.log('  git push');
  }

  console.log('\nDone!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
