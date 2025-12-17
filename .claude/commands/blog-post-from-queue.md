# Write Blog Post from Queue (with AI-Generated Images)

Write the next SEO-optimized blog post from the publishing queue (`content/q.md`) with 4 contextual AI-generated images.

## Your Task

Read the queue file, find the next "queued" item, write a comprehensive blog post with image placeholders, generate contextual images using Imagen 3, then update all related files.

## Instructions

### Step 1: Read Context Files

Read these files to understand what to write and how:

1. **content/q.md** - Find the first item with `status: "queued"` - this is your topic
2. **content/tone-of-voice.md** - Follow these writing guidelines exactly
3. **content/llms.txt** - Understand company context, services, and value propositions
4. **content/seo-strategy.md** - Reference for SEO best practices, target audience, and content standards

### Step 2: Extract Post Details from Queue

From the queue item, you will have:
- `keyword` - The primary SEO keyword (use naturally 3-5 times)
- `question` - The main question to answer (this is the core topic - answer it in the first 2-3 paragraphs)
- `title` - Suggested title (you may improve it for SEO)
- `slug` - URL slug for the file
- `faq_questions` - 10 questions for the FAQ section at the end

### Step 3: Write the Blog Post (Pass 1 - Content with Placeholders)

Create a comprehensive, SEO-optimized blog post with this EXACT structure:

**Frontmatter format:**
```yaml
---
title: "Your SEO-Optimized Title Here"
date: "YYYY-MM-DD"
excerpt: "A compelling 150-160 character description that answers the core question"
author: "AI Essentials Team"
tags: ["primary-keyword", "related-tag", "another-tag"]
image: "/images/blog/[slug]-hero.png"
---
```

**Content Structure (CRITICAL - Follow Exactly):**

```markdown
## [Main Question as H2 - Rephrase the question naturally]

[Direct answer - 2-3 sentences that directly answer the question. Be concise and clear. This is for featured snippets.]

![{slug}-hero](/images/blog/{slug}-hero.png)

[2-3 paragraphs expanding on the answer with more detail, context, and examples. This section should be 200-300 words total.]

## [Section 2 Title - First Major Topic] (400-500 words)

[Comprehensive content addressing a key aspect of the topic]
[Use H3 subsections as needed]
[Include specific examples and data]

![{slug}-1](/images/blog/{slug}-1.png)

## [Section 3 Title - Second Major Topic] (400-500 words)

[Continue building on the topic]
[Add practical, actionable advice]
[Use bullet points for scannability]

![{slug}-2](/images/blog/{slug}-2.png)

## [Section 4 Title - Third Major Topic] (300-400 words)

[Tie everything together]
[Include case study or real-world example if applicable]

![{slug}-3](/images/blog/{slug}-3.png)

## Frequently Asked Questions

### [FAQ Question 1]
[Concise answer - 50-100 words. Be direct and helpful.]

### [FAQ Question 2]
[Concise answer - 50-100 words]

... (include ALL 10 FAQ questions from faq_questions)

## Conclusion (100-150 words)

[Summarize 2-3 key takeaways]
[Clear CTA: "Ready to [benefit]? Book a free 30-minute strategy call to see how AI automation can [specific outcome] for your business."]
[Link to booking: https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials]
```

**Image Placement Rules:**
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

### Step 5: Generate Images (Pass 2 - AI Image Generation)

After saving the blog post, generate 4 contextual images using the Imagen 3 API.

**For each image, extract the relevant content section:**

1. **Hero Image**: Extract the direct answer text (the 2-3 sentences right after the H2 question)
2. **Image 1**: Extract the full content of Section 2
3. **Image 2**: Extract the full content of Section 3
4. **Image 3**: Extract the full content of Section 4

**Run the image generation script:**

```bash
# Load environment variables and run the script
cd /home/user/aiessentialsUSdone

# The script needs slug and a JSON array of sections
node scripts/generate-blog-images.js "[slug]" '[
  {"imageNumber": 1, "blogTitle": "[title]", "content": "[direct answer text]"},
  {"imageNumber": 2, "blogTitle": "[title]", "content": "[section 2 content]"},
  {"imageNumber": 3, "blogTitle": "[title]", "content": "[section 3 content]"},
  {"imageNumber": 4, "blogTitle": "[title]", "content": "[section 4 content]"}
]'
```

**Important:** The JSON must be properly escaped. Use single quotes for the outer string and double quotes inside the JSON.

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
git commit -m "Add blog post: [title]"
git push
```

## Output

After completing all steps, provide:
1. ✅ Blog post title and file path
2. ✅ Word count (target: 1,800-2,500)
3. ✅ Primary keyword used
4. ✅ Number of FAQ questions included (should be 10)
5. ✅ 4 images generated and paths listed
6. ✅ Confirmation that q.md status was updated to "published"
7. ✅ Confirmation that llms.txt was updated
8. ✅ Git commit confirmation

## Example Image Generation Flow

For a blog post about "AI automation costs":

1. **Hero Image** - Based on: "AI automation typically costs between $500-$5,000/month for small businesses, depending on complexity and tools used."
   → Generates: Professional illustration of cost/pricing concept with AI elements

2. **Image 1** - Based on: Section about "Factors That Affect AI Automation Costs" discussing tools, complexity, customization
   → Generates: Visual showing different automation tools and pricing tiers

3. **Image 2** - Based on: Section about "ROI and Cost Savings" with specific metrics
   → Generates: Chart/graph style illustration showing ROI growth

4. **Image 3** - Based on: Section about "Getting Started with AI Automation" with practical steps
   → Generates: Step-by-step visual or workflow illustration

## Troubleshooting

**If image generation fails:**
- Check that GEMINI_API_KEY is set in .env file
- Verify the script path: `scripts/generate-blog-images.js`
- Check JSON escaping in the sections parameter
- If API quota exceeded, wait and retry or proceed without images

**If running locally:**
- Make sure to run from the project root directory
- Ensure .env file exists with valid API keys
