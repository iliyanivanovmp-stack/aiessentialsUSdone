const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Paths
const postsDirectory = path.join(process.cwd(), 'content/blog-posts');
const publicDirectory = path.join(process.cwd(), 'public');

// Get all blog post slugs
function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

// Get all posts with metadata
function getAllPosts() {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => {
      const fullPath = path.join(postsDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || '',
      };
    })
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));

  return posts;
}

// Generate sitemap.xml
function generateSitemap() {
  const posts = getAllPosts();
  const baseUrl = 'https://aiessentials.us';

  const blogUrls = posts
    .map(
      (post) => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${blogUrls}
</urlset>`;

  fs.writeFileSync(path.join(publicDirectory, 'sitemap.xml'), sitemap);
  console.log('✅ Generated sitemap.xml');
}

// Generate llms.txt
function generateLlmsTxt() {
  const posts = getAllPosts();

  const blogPosts = posts
    .map((post) => `- [${post.title}](https://aiessentials.us/blog/${post.slug}) - ${post.excerpt}`)
    .join('\n');

  const content = `# AI Essentials - Company Information

> AI Essentials helps small and medium businesses in the United States automate their operations using AI, saving them 20+ hours per week and enabling growth without hiring.

## About Us
AI Essentials is an AI automation consulting firm based in the United States. We specialize in helping overwhelmed business owners reclaim their time by implementing smart AI solutions that handle repetitive tasks, streamline workflows, and boost productivity.

## Our Mission
To make AI automation accessible and practical for every business owner, regardless of their technical background.

## Services

### 1. AI Automation Audit
- Comprehensive review of your current processes
- Identify automation opportunities
- ROI projections and priority recommendations

### 2. Custom AI Solutions
- Tailored automation workflows
- Integration with existing tools
- Hands-on implementation and training

### 3. Ongoing Support & Optimization
- Continuous monitoring and improvements
- Regular strategy sessions
- Priority support access

## Target Industries
- Professional Services (Consulting, Legal, Accounting)
- E-commerce & Retail
- Healthcare & Wellness
- Real Estate
- Marketing Agencies
- Local Service Businesses

## Key Benefits We Deliver
- Save 20+ hours per week on repetitive tasks
- Reduce operational costs by 30-50%
- Scale without proportionally increasing headcount
- Improve response times and customer satisfaction
- Make data-driven decisions with AI insights

## Contact Information
- Website: https://aiessentials.us
- Booking: https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials
- Location: United States (Remote-first)

## Recent Blog Posts
${blogPosts}

---

*Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}*
`;

  fs.writeFileSync(path.join(publicDirectory, 'llms.txt'), content);
  console.log('✅ Generated llms.txt');
}

// Run generation
try {
  console.log('🚀 Generating SEO files...');
  generateSitemap();
  generateLlmsTxt();
  console.log('✨ All SEO files generated successfully!');
} catch (error) {
  console.error('❌ Error generating SEO files:', error);
  process.exit(1);
}
