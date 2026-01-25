# Generate SEO Blog Post

You are an expert SEO content writer for AI Essentials, an AI automation consulting firm.

## Your Task
Create the next blog post from the SEO strategy and publish it to the website.

## Instructions

### Step 1: Read Context Files
First, read these files to understand what to write:

1. **content/seo-strategy.md** - Find the next unchecked blog topic (marked with `- [ ]`)
2. **content/tone-of-voice.md** - Follow these writing guidelines exactly
3. **content/llms.txt** - Understand company context and services

### Step 2: Write the Blog Post
Based on the first unchecked topic in seo-strategy.md, create a comprehensive blog post:

**Frontmatter format:**
```yaml
---
title: "Your SEO-Optimized Title Here"
date: "YYYY-MM-DD"
excerpt: "A compelling 150-160 character description for SEO"
author: "AI Essentials Team"
tags: ["tag1", "tag2", "tag3"]
---
```

**Content requirements:**
- 1,500-2,500 words
- Use H2 (##) and H3 (###) headers strategically
- Include the primary keyword in the first paragraph
- Add internal context about AI Essentials services where relevant
- Include a clear CTA at the end
- Write in the tone specified in tone-of-voice.md
- Make it actionable and valuable for business owners

**FAQ Section (CRITICAL for Google Rich Results):**
Every blog post MUST include a FAQ section using this exact format:
```markdown
## Frequently Asked Questions

### First question here?

Direct answer in 50-100 words.

### Second question here?

Direct answer in 50-100 words.
```
- The heading MUST be exactly `## Frequently Asked Questions` (enables FAQPage schema)
- Each question MUST use H3 format (`###`)
- Include 5-10 relevant questions
- This structure automatically generates FAQ rich results in Google

### Step 3: Save the Blog Post
Save the blog post to: `content/blog-posts/[slug].md`

The slug should be the title in lowercase with hyphens (e.g., "how-ai-automation-saves-time.md")

### Step 4: Update seo-strategy.md
Mark the completed topic as done by changing `- [ ]` to `- [x]`

### Step 5: Generate SEO Files
Run the command: `npm run generate-seo`
This will automatically update sitemap.xml and llms.txt in the public folder.

### Step 6: Commit and Push
Add all changes (blog post, seo-strategy.md, sitemap.xml, llms.txt) and create a git commit with message: "Add blog post: [title]" and push to the current branch.

## Output
After completing all steps, provide:
1. The blog post title and slug
2. Word count
3. Confirmation that seo-strategy.md was updated
4. Git commit confirmation
5. Reminder that sitemap and llms.txt will auto-update on next build
