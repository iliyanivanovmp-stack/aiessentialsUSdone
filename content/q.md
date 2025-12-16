# SEO Publishing Queue (q.md)

This file is the source of truth for what gets written next.
Only the YAML block between QUEUE_START and QUEUE_END is edited by automation.

<!--QUEUE_START-->
```yaml
version: 1
generatedAt: "2025-12-16T19:13:06.027Z"

defaults:
  country: "US"
  language: "en"
  blogBasePath: "content/blog-posts"
  statusOrder: ["queued", "in_progress", "published", "failed"]

items:

```
<!--QUEUE_END-->

## How to Use This File

1. **Run the blog-post-from-queue command** to write the next queued post
2. Posts are processed in order from top to bottom
3. Status changes: queued -> in_progress -> published (or failed)
4. The postPath field is filled in when the post is published

## Statistics

- **Total items:** 0
- **Queued:** 0
- **In Progress:** 0
- **Published:** 0
- **Failed:** 0
