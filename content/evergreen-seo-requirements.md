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
- Author name: "AI Essentials Team"
- Author image: Company logo or team avatar
- Bio: Brief description of expertise and credentials
- Optional: Links to about page or LinkedIn

**Design:**
- Subtle styling that matches site design
- Professional appearance that builds trust
- Mobile-responsive layout

---

## 4) Continue Reading Section (Related Posts)

Every blog post must include a "Continue Reading" section with related posts.

**Placement:** After the footer CTA section (last element before site footer)

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

## Implementation Notes

These requirements are implemented in:
- `app/blog/[slug]/page.tsx` - Main blog post template
- `components/AuthorBox.tsx` - Author credibility component
- `components/RelatedPosts.tsx` - Continue reading component

The blog post generation command (`/blog-post-from-queue`) does not need modification—these enhancements are applied automatically at render time.

---

## SEO Impact

| Feature | SEO Benefit |
|---------|-------------|
| Canonical URL | Prevents duplicate content, consolidates ranking signals |
| Article Schema | Eligibility for rich results, better SERP display |
| Breadcrumb Schema | Enhanced navigation display in search results |
| Organization Schema | Brand knowledge panel eligibility |
| Author Box | E-E-A-T signals (Experience, Expertise, Authority, Trust) |
| Related Posts | Reduced bounce rate, increased session duration, internal linking |

---

**Document Version:** 1.0
**Prepared for:** AI Essentials (https://aiessentials.us/)
