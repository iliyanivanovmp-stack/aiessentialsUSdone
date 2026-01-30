# Evergreen SEO Requirements

**Purpose:** This file defines SEO enhancements that are automatically applied to all blog posts at render time. These are technical implementations in the blog post page template—writers do not need to add these manually.

**Last Updated:** December 23, 2025

---

## 1) Canonical URL

Every blog post must have a canonical URL set in its metadata.

**Implementation:**
- Set via Next.js `generateMetadata()` using `alternates.canonical`
- Format: `https://aiessentials.us/blog/[slug]`
- Prevents duplicate content issues
- Signals to search engines the preferred URL for the page

**Example:**
```typescript
alternates: {
  canonical: `https://aiessentials.us/blog/${slug}`,
}
```

---

## 2) JSON-LD Structured Data

Every blog post must include JSON-LD structured data for enhanced search visibility.

### Required Schemas:

**A) Article Schema**
```json
{
  "@type": "Article",
  "headline": "[post title]",
  "description": "[excerpt]",
  "author": { "@type": "Organization", "name": "AI Essentials" },
  "publisher": { "@type": "Organization", "name": "AI Essentials" },
  "datePublished": "[date]",
  "dateModified": "[date]",
  "image": "[hero image URL]"
}
```

**B) BreadcrumbList Schema**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Home", "item": "https://aiessentials.us" },
    { "position": 2, "name": "Blog", "item": "https://aiessentials.us/blog" },
    { "position": 3, "name": "[post title]" }
  ]
}
```

**C) Organization Schema**
```json
{
  "@type": "Organization",
  "name": "AI Essentials",
  "url": "https://aiessentials.us",
  "description": "AI automation consulting for B2B businesses"
}
```

**D) FAQPage Schema (Optional)**
- Only include if the post has an FAQ section
- Note: Google has limited FAQ rich results, but valid markup is still useful
- Extract FAQ H3 questions and their answers from the post content

---

## 3) Author Credibility Box

Every blog post must display an author bio section after the main content.

**Placement:** After the article content, before the footer CTA

**Content:**
- Author photo: `/images/iliyan-ivanov.png`
- Author name: "Iliyan Ivanov"
- Bio: "Founder of AIessentials"
- Social links: X (@IliyanIvanov_AI) and LinkedIn

**Design:**
- Compact horizontal layout with photo and text
- Social media icons (X and LinkedIn) as subtle circular buttons to the right
- Subtle styling that matches site design
- Professional appearance that builds trust
- Mobile-responsive layout

## 3.1) Blog Post Header (Author Attribution)

Every blog post header displays author information with social links.

**Format:** `[Date] • Iliyan Ivanov • [X, LinkedIn]`

**Design:**
- Date first, then author name, then social links
- Social links wrapped in cyan-colored brackets
- X and LinkedIn icons are clickable, open in new tabs
- X links to: https://x.com/IliyanIvanov_AI
- LinkedIn links to: https://www.linkedin.com/in/iliyan-ivanov-50299b215/

---

## 4) Updated At Date (Content Freshness)

Every blog post should include an `updatedAt` date in its frontmatter to signal content freshness to search engines.

**Why it matters:**
- Google favors fresh, updated content
- `dateModified` in JSON-LD helps search engines understand content relevance
- OpenGraph `modifiedTime` signals freshness to social platforms
- Builds user trust by showing content is maintained

**Frontmatter field:**
```yaml
---
title: "Your Post Title"
date: "2025-12-17"
updatedAt: "2025-12-23"
# ... other fields
---
```

**Implementation:**
- Add `updatedAt` field to frontmatter when updating a post
- JSON-LD `dateModified` uses `updatedAt` (falls back to `date` if not set)
- OpenGraph `modifiedTime` uses `updatedAt` (falls back to `date` if not set)
- Display "Updated [date]" in post header when `updatedAt` differs from `date`

**When to update:**
- Any content changes (fixes, additions, improvements)
- Adding new sections or examples
- Updating outdated information
- SEO improvements to existing content

---

## 5) Continue Reading Section (Related Posts)

Every blog post must include a "Continue Reading" section with related posts.

**Placement:** Last element before the site footer (after CTA section)

**Content:**
- 3 related posts maximum
- Selection criteria:
  1. Posts with matching tags (prioritized)
  2. Most recent posts (fallback)
- Exclude the current post from suggestions

**Display:**
- Post title
- Excerpt (truncated)
- Reading time
- Publication date

**Design:**
- Grid layout (3 columns on desktop, 1 on mobile)
- Consistent with blog listing page cards
- Clear "Continue Reading" or "Related Articles" heading

---

## 6) CTA Section (Call-to-Action)

Every blog post must include a prominent CTA section before the footer.

**Placement:** Before the Related Posts section (CTA → Related Posts → Footer)

**Content:**
- Headline: "Ready to automate your business?"
- Subtext: "Book a free discovery call and learn how AI can save you 20+ hours per week."
- Button: "Book Free Call" linking to Calendly

**Design:**
- Gradient background (black to cyan tint)
- Centered text layout
- Prominent cyan button
- Consistent with /blog page CTA

---

## 7) Site Footer

Every blog post must include the standard site footer.

**Placement:** At the very bottom of the page, after all content

**Content:**
- Company info: "AIessentials by IvanovIV LLC 2025"
- Links: Privacy, Terms, Home, Contact
- Modal popups for Privacy Policy and Terms of Service

**Implementation:**
- Uses the shared `Footer` component from `/components/Footer.tsx`
- Consistent across all pages (home, blog listing, blog posts)

---

## Implementation Notes

These requirements are implemented in:
- `app/blog/[slug]/page.tsx` - Main blog post template
- `components/AuthorBox.tsx` - Author credibility component
- `components/RelatedPosts.tsx` - Continue reading component
- `components/Footer.tsx` - Site footer component

The blog post generation command (`/blog-post-from-queue`) does not need modification—these enhancements are applied automatically at render time.

---

## SEO Impact

| Feature | SEO Benefit |
|---------|-------------|
| Canonical URL | Prevents duplicate content, consolidates ranking signals |
| Article Schema | Eligibility for rich results, better SERP display |
| Breadcrumb Schema | Enhanced navigation display in search results |
| Organization Schema | Brand knowledge panel eligibility |
| Updated At Date | Content freshness signals, improved rankings for timely content |
| Author Box | E-E-A-T signals (Experience, Expertise, Authority, Trust) |
| Related Posts | Reduced bounce rate, increased session duration, internal linking |
| CTA Section | Conversion optimization, clear user journey |
| Site Footer | Trust signals, legal compliance, consistent UX |

---

**Document Version:** 1.2
**Prepared for:** AI Essentials (https://aiessentials.us/)
