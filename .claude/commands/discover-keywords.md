# Discover Keywords from Google Ads

Use Google Ads Keyword Planner API to discover the top 10 most valuable keywords for aiessentials.us, balanced across the buyer journey.

## What This Command Does

1. Calls Google Ads Keyword Planner API with URL seed (aiessentials.us)
2. Retrieves keyword suggestions with metrics (searches, competition, bids)
3. Filters out junk keywords (too generic, irrelevant, brand navigational)
4. Classifies keywords by intent (informational, commercial, transactional)
5. Scores and ranks within each category
6. Selects a balanced mix:
   - **5 Informational** (awareness/top of funnel)
   - **3 Commercial** (consideration/mid funnel)
   - **2 Transactional** (bottom of funnel/ready to buy)
7. Saves results to `content/keywords-discovered.json`

## Prerequisites

Ensure the `.env` file has these keys:
- `GOOGLE_ADS_DEVELOPER_TOKEN`
- `GOOGLE_ADS_CLIENT_ID`
- `GOOGLE_ADS_CLIENT_SECRET`
- `GOOGLE_ADS_REFRESH_TOKEN`
- `GOOGLE_ADS_CUSTOMER_ID`

## Instructions

### Step 1: Run the Discovery Script

```bash
node scripts/discover-keywords.js
```

### Step 2: Review Output

After the script completes, review the discovered keywords:

```bash
cat content/keywords-discovered.json
```

### Step 3: Report Results

Provide a summary including:
- Total keywords found from API
- Keywords after filtering
- List of 10 selected keywords grouped by intent
- Any issues encountered

## Scoring Methodology

### Informational Keywords
Focus on volume & rankability:
```
Score = (search_volume × 0.5) + (low_competition × 0.3) + (bid_value × 0.2)
```

### Commercial Keywords
Balance volume with buyer intent:
```
Score = (search_volume × 0.3) + (bid_value × 0.4) + (competition × 0.2) + (commercial_boost × 0.1)
```

### Transactional Keywords
Prioritize high-value buyer intent:
```
Score = (bid_value × 0.5) + (search_volume × 0.2) + (competition × 0.2) + (commercial_boost × 0.1)
```

## Filters Applied

**Removed:**
- Single-word generic terms ("ai", "automation", "business")
- Irrelevant industries (healthcare, legal, crypto, stocks)
- Brand navigational terms ("chatgpt login", "openai")
- Low volume keywords (< 10 monthly searches)
- Duplicate variants (singular/plural)

**Boosted:**
- Keywords with commercial terms (consulting, services, agency, pricing, cost, for business)

## Output File

`content/keywords-discovered.json` contains:
```json
{
  "generatedAt": "2026-01-24T...",
  "urlSeed": "https://aiessentials.us",
  "keywords": [
    {
      "keyword": "ai automation consulting",
      "intent": "commercial",
      "monthlySearches": 1200,
      "competition": "MEDIUM",
      "topBidLow": 5.50,
      "topBidHigh": 15.00,
      "score": 0.75
    }
  ]
}
```

## Next Steps

After discovering keywords, the next step will be to:
1. Use Serper API to find "People Also Ask" questions for each keyword
2. Generate FAQ questions with Gemini
3. Create the blog post queue
