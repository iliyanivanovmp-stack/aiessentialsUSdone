# Write Blog Post from Queue

Write the next blog post from the SEO publishing queue (`content/q.md`).

## Your Task

Read the queue file, find the next "queued" item, write a comprehensive blog post, and update the queue.

## Instructions

### Step 1: Read Context Files

1. **content/q.md** - Find the first item with `status: "queued"`
2. **content/tone-of-voice.md** - Follow these writing guidelines
3. **content/llms.txt** - Understand company context

### Step 2: Extract Post Details

From the queue item, you will have:
- `keyword` - The primary SEO keyword
- `question` - The main question to answer (this is the core topic)
- `title` - Suggested title (you may improve it)
- `slug` - URL slug for the file
- `faq_questions` - 10 questions for the FAQ section

### Step 3: Write the Blog Post

Create a comprehensive blog post with this structure:

```markdown
---
title: "Your SEO-Optimized Title"
date: "YYYY-MM-DD"
excerpt: "150-160 character description answering the core question"
author: "AI Essentials Team"
tags: ["keyword", "related-tag", "another-tag"]
---

## Introduction
- Hook the reader with the problem/question
- Include the primary keyword naturally
- Promise what they'll learn

## [Main Content Sections]
- 2-4 H2 sections that thoroughly answer the main question
- Use H3 subsections as needed
- Include practical examples and actionable advice
- Reference AI Essentials services where relevant

## FAQ

### [FAQ Question 1 from faq_questions]
[Short, direct answer - 2-3 sentences]

### [FAQ Question 2 from faq_questions]
[Short, direct answer - 2-3 sentences]

... (include all 10 FAQ questions)

## Conclusion
- Summarize key points
- Clear CTA to contact AI Essentials
```

**Content Requirements:**
- 1,500-2,500 words total
- Main question answered in first 2-3 paragraphs
- FAQ answers should be concise (50-100 words each)
- Include the keyword naturally 3-5 times
- Write in tone from tone-of-voice.md

### Step 4: Save the Blog Post

Save to: `content/blog-posts/[slug].md`

### Step 5: Update the Queue

Edit `content/q.md` to update the item:
- Change `status: "queued"` to `status: "published"`
- Set `postPath: "content/blog-posts/[slug].md"`
- Set `publishedAt: "[current ISO timestamp]"`
- Set `updatedAt: "[current ISO timestamp]"`

### Step 6: Commit and Push

```bash
git add content/blog-posts/[slug].md content/q.md
git commit -m "Add blog post: [title]"
git push
```

## Output

After completing, provide:
1. Blog post title and word count
2. The slug/filename
3. Confirmation that q.md was updated
4. Git commit confirmation
