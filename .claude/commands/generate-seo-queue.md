# Generate SEO Queue

Generate a queue of 100 SEO-optimized blog post ideas based on real Google search data.

## What This Command Does

1. Uses 10 seed keywords related to AI automation consulting
2. Calls Serper API to find "People Also Ask" questions for each keyword (10 questions per keyword)
3. Calls Gemini API to generate 10 fan-out questions for each PAA question
4. Creates `content/q.md` with 100 blog post items, each with an FAQ section

## Prerequisites

Ensure the `.env` file exists with these keys:
- `SERPER_API_KEY` - Get from https://serper.dev
- `GEMINI_API_KEY` - Get from https://aistudio.google.com

## Instructions

### Step 1: Check Environment
First, verify the `.env` file exists and has the required API keys:

```bash
cat .env
```

If missing, create it with the API keys.

### Step 2: Install Dependencies
Make sure dotenv is available:

```bash
cd /home/user/aiessentialsUSdone && npm list dotenv || npm install dotenv --save-dev
```

### Step 3: Run the Generator
Execute the script:

```bash
cd /home/user/aiessentialsUSdone && node scripts/generate-seo-queue.js
```

### Step 4: Review Output
After the script completes, read and summarize the generated queue:

```bash
head -100 content/q.md
```

### Step 5: Report Results
Provide a summary including:
- Total blog posts generated
- List of keywords processed
- Sample of 3-5 blog post titles
- Any errors encountered

## Seed Keywords

The script uses these 10 keywords:
1. ai automation
2. ai systems
3. ai company
4. ai consulting
5. ai for my business
6. ai agency
7. consulting ai
8. ai and automation
9. ai in automation
10. ai for work

## Output File

The generated `content/q.md` file contains:
- 100 blog post items (10 keywords × 10 questions each)
- Each item has a title, slug, and 10 FAQ questions
- All items start with status "queued"
- Use the `blog-post-from-queue` command to write posts from this queue
