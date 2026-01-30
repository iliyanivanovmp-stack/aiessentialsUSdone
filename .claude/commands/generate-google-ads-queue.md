# Generate Google Ads SEO Queue

Complete end-to-end pipeline: Discover keywords from Google Ads → Collect PAA questions → Generate SEO queue with search-grounded FAQ queries.

## What This Command Does

Runs the full Google Ads keyword-to-content pipeline:

1. **Discover Keywords** (`discover-keywords.js`)
   - Calls Google Ads Keyword Planner API
   - Filters and scores keywords
   - Selects 10 keywords (5 informational + 3 commercial + 2 transactional)
   - Saves to `content/keywords-discovered.json`

2. **Collect PAA Questions** (`collect-paa-questions.js`)
   - For each keyword, fetches PAA from Serper API
   - Classifies questions by intent
   - Fills gaps with Gemini to reach 10 questions per keyword
   - Saves to `content/paa-questions.json` (100 total questions)

3. **Generate SEO Queue** (`generate-seo-queue-from-paa.js`)
   - For each question, uses Google Search Grounding to generate 10 fan-out queries
   - Creates blog post items with search-grounded FAQ questions
   - Saves to `content/q-google-ads.md` (100 blog posts ready to publish)

## Prerequisites

Ensure `.env` has these API keys:
- `GOOGLE_ADS_DEVELOPER_TOKEN`
- `GOOGLE_ADS_CLIENT_ID`
- `GOOGLE_ADS_CLIENT_SECRET`
- `GOOGLE_ADS_REFRESH_TOKEN`
- `GOOGLE_ADS_CUSTOMER_ID`
- `GOOGLE_ADS_LOGIN_CUSTOMER_ID`
- `SERPER_API_KEY`
- `GEMINI_API_KEY`

## Instructions

### Step 1: Run the Full Pipeline

Run all three scripts in sequence:

```bash
node scripts/discover-keywords.js && \
node scripts/collect-paa-questions.js && \
node scripts/generate-seo-queue-from-paa.js
```

**Time estimate:** ~55 minutes total
- discover-keywords.js: ~30 seconds
- collect-paa-questions.js: ~5 minutes (100 API calls)
- generate-seo-queue-from-paa.js: ~50 minutes (100 Gemini calls with search grounding)

### Step 2: Review Output Files

Check that all files were generated:

```bash
ls -lh content/keywords-discovered.json content/paa-questions.json content/q-google-ads.md
```

### Step 3: Verify Queue Contents

```bash
tail -20 content/q-google-ads.md
```

Should show:
- Total items: 100
- Queued: 100
- All items with search-grounded FAQ questions

### Step 4: Commit Changes

```bash
git add content/keywords-discovered.json content/paa-questions.json content/q-google-ads.md
git commit -m "Generate Google Ads SEO queue with 100 blog posts"
git push
```

## Output Summary

Provide a report showing:

**Keywords Discovered:**
- Total from API: [X]
- After filtering: [X]
- Selected: 10 (5 info + 3 commercial + 2 transactional)

**PAA Questions:**
- Total questions: 100
- From Serper: [X]
- From Gemini: [X]

**SEO Queue:**
- Total blog posts: 100
- Total FAQ questions: 1,000 (10 per post)
- Search-grounded queries: [X]
- Fallback queries: [X]

**Files Generated:**
- ✅ `content/keywords-discovered.json`
- ✅ `content/paa-questions.json`
- ✅ `content/q-google-ads.md`

## Next Steps

Use the `blog-post-from-google-ads-queue` command to start publishing blog posts from the queue.

## Troubleshooting

**If discover-keywords.js fails:**
- Check Google Ads API credentials in .env
- Verify customer ID and login customer ID are correct
- Check that Google Ads API is enabled in Google Cloud Console

**If collect-paa-questions.js returns 0 PAA:**
- Verify `lr: 'lang_en'` parameter is set (required for PAA results)
- Check Serper API key is valid
- Script will use Gemini fallback automatically

**If generate-seo-queue-from-paa.js fails:**
- Verify Gemini API key is valid
- Check that google_search tool is enabled (not googleSearchRetrieval)
- Script will use fallback questions if search grounding fails
