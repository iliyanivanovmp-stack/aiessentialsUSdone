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
image: "/images/blog/[slug]-hero.webp"
---
```

**Note:** For new posts, set `updatedAt` to the same date as `date`. When updating existing posts, change `updatedAt` to the current date.

**Content Structure (CRITICAL - Follow Exactly):**

```markdown
## [Main Question as H2 - Rephrase the question naturally]

[Direct answer - 2-3 sentences that directly answer the question. Be concise and clear. This is for featured snippets.]

![Hero image for {title}](/images/blog/{slug}-hero.webp)

[2-3 paragraphs expanding on the answer with more detail, context, and examples. This section should be 200-300 words total.]

> **[Benefit-oriented headline - e.g., "Want to see how much time AI could save you?"]**
> [1-2 sentences explaining the value proposition]
> [Book a Free Strategy Call →](https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials)

## Table of Contents
- [Section 2 Title](#section-2-anchor)
- [Section 3 Title](#section-3-anchor)
- [Section 4 Title](#section-4-anchor)
- [Who This Is For](#who-this-is-for-and-who-should-look-elsewhere)
- [Frequently Asked Questions](#frequently-asked-questions)

## [Section 2 Title - First Major Topic] (400-500 words)

[Comprehensive content addressing a key aspect of the topic]
[Use H3 subsections as needed]
[Include specific examples and data]

> **[CTA headline related to section topic - e.g., "Ready to automate this process?"]**
> [Brief value prop specific to this section's topic]
> [Get Your Free Assessment →](https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials)

![Section 2 illustration](/images/blog/{slug}-1.webp)

## [Section 3 Title - Second Major Topic] (400-500 words)

[Continue building on the topic]
[Add practical, actionable advice]
[Use bullet points for scannability]

> **[CTA headline related to section topic]**
> [Brief value prop specific to this section's topic]
> [Book Your Free Call →](https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials)

![Section 3 illustration](/images/blog/{slug}-2.webp)

## [Section 4 Title - Third Major Topic] (300-400 words)

[Tie everything together]
[Include case study or real-world example if applicable]
[**Compare to alternatives:** When discussing solutions, compare the AI automation approach vs alternatives like hiring staff, doing it manually, or using traditional software. Be honest about tradeoffs.]

> **[CTA headline related to section topic]**
> [Brief value prop specific to this section's topic]
> [Start Your AI Journey →](https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials)

![Section 4 illustration](/images/blog/{slug}-3.webp)

## Who This Is For (And Who Should Look Elsewhere)

**This approach is ideal for:**
- [Specific business type/situation that benefits most]
- [Another ideal use case]
- [Third ideal scenario]

**You might want to consider alternatives if:**
- [Situation where this isn't the best fit]
- [Another scenario where alternatives make more sense]
- [Honest limitation or constraint]

**Why AI Essentials specifically?**
[2-3 sentences explaining key differentiators vs other AI agencies/consultants in plain language. Be specific about what makes the approach different - speed, pricing model, guarantee, expertise area, etc.]

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

**CTA Block Requirements (CRITICAL - Must include 3-4 CTAs):**

Each blog post MUST include **3-4 CTA blocks** using this exact blockquote format:

```markdown
> **[Benefit-oriented headline]**
> [1-2 sentences with specific value proposition]
> [Button Text →](https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials)
```

**CTA Placement Rules:**
1. **First CTA**: After the opening section (after hero image and expansion paragraphs)
2. **Section CTAs**: At the end of each major H2 section (before the section image)
3. **Each CTA must be unique** - different headline, different benefit, relevant to the section topic

**CTA Headline Examples:**
- "Want to see how much time AI could save you?"
- "Ready to automate your [topic] process?"
- "Curious what this would look like for your business?"
- "Want a custom implementation plan?"
- "Ready to stop doing this manually?"

The blockquote format with **bold headline** triggers special CTA styling (cyan left border, gradient background, styled button).

**Image Placement Rules (from seo-strategy.md):**
1. **Hero Image** (`{slug}-hero.webp`): Immediately after the direct answer, before the expansion paragraphs
2. **Image 1** (`{slug}-1.webp`): At the end of Section 2, reflecting that section's content
3. **Image 2** (`{slug}-2.webp`): At the end of Section 3, reflecting that section's content
4. **Image 3** (`{slug}-3.webp`): At the end of Section 4, reflecting that section's content

**Content Requirements:**
- **Word Count:** 1,800-2,500 words total (main content + FAQ answers)
- **Readability:** 8th-10th grade reading level
- **Structure:** Clear H2/H3 hierarchy, short paragraphs (2-4 sentences)
- **Keyword Usage:** Primary keyword 3-5 times naturally, include related terms
- **Tone:** Follow tone-of-voice.md exactly - friendly but professional, no corporate jargon
- **E-E-A-T:** Include specific metrics, examples, and demonstrate expertise
- **No Fluff:** Every paragraph should provide value
- **Entity Mentions:** When appropriate and contextually relevant, mention well-known brands, tools, locations, industries, or people (only the biggest names in the space - e.g., Salesforce, HubSpot, ChatGPT, Zapier). Don't force mentions; only include when naturally connected to the topic.

**AEO (Answer Engine Optimization) Requirements - CRITICAL:**
- **Compare to Alternatives:** When discussing solutions, compare AI automation vs other approaches (hiring staff, manual work, traditional software). Use plain language, be honest about tradeoffs.
- **Problem-Solution Mapping:** For each problem addressed, clearly tie the brand's solution to that problem with specific benefits AND limitations.
- **"Who This Is For" Section:** REQUIRED section before FAQ that explicitly states who this approach is ideal for AND who should consider alternatives.
- **Key Differentiators:** In the "Why AI Essentials specifically?" subsection, explain what makes the service different from competitors in plain language (speed, pricing, guarantees, expertise).

**Internal Linking Requirements:**
- Include **2-3 internal links** to other blog posts on the site
- **ONLY add links when there's a natural topical connection** - don't force links
- Link when you mention a concept that another post covers in depth
- Use descriptive anchor text (not "click here" or "read more")
- Check existing posts in `content/blog-posts/` to find relevant links
- Example: If discussing "saving time with automation", link to the post about "how AI automation saves 20 hours per week"

**FAQ Section Requirements (CRITICAL for Google Rich Results):**
- **MUST use exactly `## Frequently Asked Questions` as the H2 heading** - this exact format is required for Google to recognize FAQPage schema
- **MUST use H3 format (`###`) for each question** - this structure enables automatic FAQ schema generation
- Use ALL 10 questions from `faq_questions` in the queue item
- Each answer should be 50-100 words
- Be direct and helpful - answer the question immediately
- The blog page automatically extracts FAQ schema from this structure - **if the format is wrong, your post won't get FAQ rich results in Google**

**Correct FAQ format example:**
```markdown
## Frequently Asked Questions

### What is the first question?

Direct answer to the first question in 50-100 words.

### What is the second question?

Direct answer to the second question in 50-100 words.
```

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
   ls -la public/images/blog/[slug]*.webp
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

### Step 7: Regenerate SEO Files (sitemap.xml and llms.txt)

**IMPORTANT: Run this script to update the sitemap and llms.txt with the new blog post.**

```bash
node scripts/generate-seo-files.js
```

This script automatically:
- Regenerates `public/sitemap.xml` with all blog posts and correct dates
- Regenerates `public/llms.txt` with the updated blog post list

### Step 8: Commit and Push

Create a git commit and push:

```bash
git add content/blog-posts/[slug].md content/q.md public/images/blog/ public/sitemap.xml public/llms.txt
git commit -m "Add blog post: [title] (with images)"
git push
```

## Output

After completing all steps, provide a **Requirements Compliance Report** showing all requirements were followed:

### 📋 Requirements Checklist

**Content Structure:**
- [ ] Direct answer in first 2-3 sentences
- [ ] Hero image placed after direct answer
- [ ] 2-3 expansion paragraphs after hero image
- [ ] Table of Contents with anchor links
- [ ] 3-4 H2 sections covering the topic comprehensively
- [ ] Each H2 section has H3 subsections where appropriate
- [ ] "Who This Is For" section included (before FAQ)
- [ ] Conclusion section with key takeaways

**CTA Blocks (3-4 required):**
- [ ] CTA #1: After opening section - Headline: "[headline]"
- [ ] CTA #2: End of Section 2 - Headline: "[headline]"
- [ ] CTA #3: End of Section 3 - Headline: "[headline]"
- [ ] CTA #4: End of Section 4 - Headline: "[headline]"
- [ ] All CTAs use blockquote format with bold headline
- [ ] All CTAs have unique, benefit-oriented headlines
- [ ] All CTAs link to Calendly booking page

**Images (4 required):**
- [ ] Hero image: `/images/blog/[slug]-hero.webp`
- [ ] Section 2 image: `/images/blog/[slug]-1.webp`
- [ ] Section 3 image: `/images/blog/[slug]-2.webp`
- [ ] Section 4 image: `/images/blog/[slug]-3.webp`

**FAQ Section:**
- [ ] All 10 FAQ questions from queue included
- [ ] Each answer is 50-100 words
- [ ] Direct, helpful answers

**SEO Requirements:**
- [ ] Primary keyword used 3-5 times naturally
- [ ] Title is SEO-optimized
- [ ] Excerpt is 150-160 characters
- [ ] Frontmatter includes all required fields (title, date, updatedAt, excerpt, author, tags, image)

**AEO Requirements (Answer Engine Optimization):**
- [ ] Comparisons to alternatives included (AI automation vs hiring, manual work, traditional software)
- [ ] Tradeoffs discussed honestly (not just benefits)
- [ ] "Who This Is For" section with ideal customers listed
- [ ] "Who Should Look Elsewhere" section with honest limitations
- [ ] Key differentiators vs competitors explained in plain language
- [ ] Problem-solution mapping includes specific benefits AND limitations

**Internal Linking:**
- [ ] 2-3 internal links to other blog posts included
- [ ] Links are contextually relevant (not forced)
- [ ] Descriptive anchor text used

**Tone & Style:**
- [ ] Follows tone-of-voice.md guidelines
- [ ] 8th-10th grade reading level
- [ ] No corporate jargon
- [ ] Friendly but professional tone
- [ ] Short paragraphs (2-4 sentences)

**Technical:**
- [ ] Word count: [X] words (target: 1,800-2,500)
- [ ] File saved to: `content/blog-posts/[slug].md`
- [ ] q.md status updated to "published"
- [ ] SEO files regenerated (sitemap.xml, llms.txt)
- [ ] Git commit completed

### 📊 Summary

| Requirement | Status |
|-------------|--------|
| Blog post title | [title] |
| File path | `content/blog-posts/[slug].md` |
| Word count | [X] words |
| Primary keyword | [keyword] |
| CTA blocks | [X]/4 |
| Images generated | [X]/4 |
| FAQ questions | [X]/10 |
| "Who This Is For" section | ✅ |
| Comparisons to alternatives | ✅ |
| Tradeoffs/limitations included | ✅ |
| Internal links | [X]/2-3 |
| SEO files updated | ✅ |
| Git committed | ✅ |

## Troubleshooting

**If image generation fails:**
- Check that both GEMINI_API_KEY and KIE_API_KEY are set in .env file
- The script is at: `scripts/generate-blog-images.js`
- Images save to: `public/images/blog/`
- If API fails, the blog post is still valid - images can be regenerated later

**If SEO files generation fails:**
- The script is at: `scripts/generate-seo-files.js`
- Run manually: `node scripts/generate-seo-files.js`
- Check that all blog posts have valid date formats in frontmatter (YYYY-MM-DD)

**The command should complete fully automatically with no manual intervention required.**
