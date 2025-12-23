# Write Blog Post from Queue (with AI-Generated Images)

Write the next SEO-optimized blog post from the publishing queue (`content/q.md`) with 4 contextual AI-generated images. This is a fully automated command - one execution produces a complete blog post with images.

## Your Task

Read the queue file, find the next "queued" item, write a comprehensive blog post, automatically generate 4 contextual images, and commit everything.

## Instructions

### Step 1: Read Context Files

Read these files to understand what to write and how:

1. **content/q.md** - Find the first item with `status: "queued"` - this is your topic
2. **content/tone-of-voice.md** - Follow these writing guidelines exactly
3. **content/llms.txt** - Understand company context, services, and value propositions
4. **content/seo-strategy.md** - Reference for SEO best practices, target audience, content standards, and **image placement rules**
5. **content/evergreen-seo-requirements.md** - Understand the SEO enhancements automatically applied at render time (canonical URLs, JSON-LD structured data, author box, related posts)

### Step 2: Extract Post Details from Queue

From the queue item, you will have:
- `keyword` - The primary SEO keyword (use naturally 3-5 times)
- `question` - The main question to answer (this is the core topic - answer it in the first 2-3 paragraphs)
- `title` - Suggested title (you may improve it for SEO)
- `slug` - URL slug for the file
- `faq_questions` - 10 questions for the FAQ section at the end

### Step 3: Write the Blog Post

Create a comprehensive, SEO-optimized blog post with this EXACT structure:

**Frontmatter format:**
```yaml
---
title: "Your SEO-Optimized Title Here"
date: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
excerpt: "A compelling 150-160 character description that answers the core question"
author: "AI Essentials Team"
tags: ["primary-keyword", "related-tag", "another-tag"]
image: "/images/blog/[slug]-hero.png"
---
```

**Note:** For new posts, set `updatedAt` to the same date as `date`. When updating existing posts, change `updatedAt` to the current date.

**Content Structure (CRITICAL - Follow Exactly):**

```markdown
## [Main Question as H2 - Rephrase the question naturally]

[Direct answer - 2-3 sentences that directly answer the question. Be concise and clear. This is for featured snippets.]

![Hero image for {title}](/images/blog/{slug}-hero.png)

[2-3 paragraphs expanding on the answer with more detail, context, and examples. This section should be 200-300 words total.]

## Table of Contents
- [Section 2 Title](#section-2-anchor)
- [Section 3 Title](#section-3-anchor)
- [Section 4 Title](#section-4-anchor)
- [FAQ](#faq)

## [Section 2 Title - First Major Topic] (400-500 words)

[Comprehensive content addressing a key aspect of the topic]
[Use H3 subsections as needed]
[Include specific examples and data]
[End with "How AI Essentials helps here:" tie-back]

![Section 2 illustration](/images/blog/{slug}-1.png)

## [Section 3 Title - Second Major Topic] (400-500 words)

[Continue building on the topic]
[Add practical, actionable advice]
[Use bullet points for scannability]
[End with "How AI Essentials helps here:" tie-back]

![Section 3 illustration](/images/blog/{slug}-2.png)

## [Section 4 Title - Third Major Topic] (300-400 words)

[Tie everything together]
[Include case study or real-world example if applicable]
[End with "How AI Essentials helps here:" tie-back]

![Section 4 illustration](/images/blog/{slug}-3.png)

## Frequently Asked Questions

### [FAQ Question 1]
[Concise answer - 50-100 words. Be direct and helpful.]

### [FAQ Question 2]
[Concise answer - 50-100 words]

... (include ALL 10 FAQ questions from faq_questions)

## Conclusion (100-150 words)

[Summarize 2-3 key takeaways]

Ready to [benefit]? [Book a free 30-minute strategy call](https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials) to see how AI automation can [specific outcome] for your business.
```

**Image Placement Rules (from seo-strategy.md):**
1. **Hero Image** (`{slug}-hero.png`): Immediately after the direct answer, before the expansion paragraphs
2. **Image 1** (`{slug}-1.png`): At the end of Section 2, reflecting that section's content
3. **Image 2** (`{slug}-2.png`): At the end of Section 3, reflecting that section's content
4. **Image 3** (`{slug}-3.png`): At the end of Section 4, reflecting that section's content

**Content Requirements:**
- **Word Count:** 1,800-2,500 words total (main content + FAQ answers)
- **Readability:** 8th-10th grade reading level
- **Structure:** Clear H2/H3 hierarchy, short paragraphs (2-4 sentences)
- **Keyword Usage:** Primary keyword 3-5 times naturally, include related terms
- **Tone:** Follow tone-of-voice.md exactly - friendly but professional, no corporate jargon
- **E-E-A-T:** Include specific metrics, examples, and demonstrate expertise
- **No Fluff:** Every paragraph should provide value

**FAQ Section Requirements:**
- Use ALL 10 questions from `faq_questions` in the queue item
- Each answer should be 50-100 words
- Be direct and helpful - answer the question immediately

### Step 4: Save the Blog Post

Save to: `content/blog-posts/[slug].md`

### Step 5: Generate Images Automatically

**IMPORTANT: Generate images immediately after saving the blog post. Do not skip this step.**

After saving the blog post, you MUST automatically generate 4 contextual images:

1. **Extract the content for each image:**
   - **Hero**: The direct answer (2-3 sentences after the H2 question)
   - **Image 1**: Full content of Section 2
   - **Image 2**: Full content of Section 3
   - **Image 3**: Full content of Section 4

2. **Create a JSON file with the section content:**
   Save to `scripts/temp-sections.json`:
   ```json
   [
     {"imageNumber": 1, "blogTitle": "[title]", "content": "[direct answer text - 2-3 sentences]"},
     {"imageNumber": 2, "blogTitle": "[title]", "content": "[section 2 full content]"},
     {"imageNumber": 3, "blogTitle": "[title]", "content": "[section 3 full content]"},
     {"imageNumber": 4, "blogTitle": "[title]", "content": "[section 4 full content]"}
   ]
   ```

3. **Run the image generation script using Bash:**
   ```bash
   cd /home/user/aiessentialsUSdone && node scripts/generate-blog-images.js "[slug]" "$(cat scripts/temp-sections.json)"
   ```

4. **Verify images were created:**
   ```bash
   ls -la public/images/blog/[slug]*.png
   ```

5. **Clean up temp file:**
   ```bash
   rm scripts/temp-sections.json
   ```

### Step 6: Update the Queue (q.md)

Edit `content/q.md` to update the published item:
- Change `status: "queued"` to `status: "published"`
- Set `postPath: "content/blog-posts/[slug].md"`
- Set `publishedAt: "[current ISO timestamp]"`
- Set `updatedAt: "[current ISO timestamp]"`

### Step 7: Update llms.txt

Edit `content/llms.txt` to add the new blog post to the "Recent Blog Posts" section:

```markdown
## Recent Blog Posts
- [New Post Title](/blog/[slug]) - [Month] [Year]
- [Previous posts...]
```

Add the new post at the TOP of the list.

### Step 8: Commit and Push

Create a git commit and push:

```bash
git add content/blog-posts/[slug].md content/q.md content/llms.txt public/images/blog/
git commit -m "Add blog post: [title] (with images)"
git push
```

## Output

After completing all steps, provide:
1. ✅ Blog post title and file path
2. ✅ Word count (target: 1,800-2,500)
3. ✅ Primary keyword used
4. ✅ Number of FAQ questions included (should be 10)
5. ✅ 4 images generated with paths:
   - `/images/blog/[slug]-hero.png`
   - `/images/blog/[slug]-1.png`
   - `/images/blog/[slug]-2.png`
   - `/images/blog/[slug]-3.png`
6. ✅ Confirmation that q.md status was updated to "published"
7. ✅ Confirmation that llms.txt was updated
8. ✅ Git commit confirmation

## Troubleshooting

**If image generation fails:**
- Check that GEMINI_API_KEY is set in .env file
- The script is at: `scripts/generate-blog-images.js`
- Images save to: `public/images/blog/`
- If API fails, the blog post is still valid - images can be regenerated later

**The command should complete fully automatically with no manual intervention required.**
