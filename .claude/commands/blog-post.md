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

### Step 3: Save the Blog Post
Save the blog post to: `content/blog-posts/[slug].md`

The slug should be the title in lowercase with hyphens (e.g., "how-ai-automation-saves-time.md")

### Step 4: Update seo-strategy.md
Mark the completed topic as done by changing `- [ ]` to `- [x]`

### Step 5: Update sitemap.xml
Add the new blog post URL to `content/sitemap.xml`:
```xml
<url>
  <loc>https://aiessentials.us/blog/[slug]</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Step 6: Update llms.txt
Add the new blog post to the "Recent Blog Posts" section in `content/llms.txt`

### Step 7: Commit and Push
Create a git commit with message: "Add blog post: [title]" and push to main branch.

## Output
After completing all steps, provide:
1. The blog post title and slug
2. Word count
3. Confirmation of all file updates
4. Git commit confirmation
