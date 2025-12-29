#!/usr/bin/env node

/**
 * Generate Blog Images using KIE.ai Nano Banana Pro API
 * Outputs optimized WebP format for smaller file sizes
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const KIE_API_KEY = process.env.KIE_API_KEY;
const IMAGES_DIR = path.join(process.cwd(), 'public/images/blog');

const KIE_API_BASE = 'https://api.kie.ai';
const KIE_MODEL = 'nano-banana-pro';

const NO_TEXT_SUFFIX = ' The image must not contain any text, words, letters, numbers, labels, captions, watermarks, signatures, or any form of writing whatsoever.';

async function generateImagePrompt(sectionContent, imageNumber, blogTitle) {
  const promptText = `You are an expert at creating image generation prompts. Based on the blog section content, create a detailed image prompt.
Blog Title: "${blogTitle}"
Image Number: ${imageNumber} of 4
Section Content: ${sectionContent.substring(0, 1500)}
Requirements:
- Professional, modern illustration style
- Visually represent key concepts
- Clean, minimal design with tech/business aesthetic
- CRITICAL: NO TEXT whatsoever - no words, letters, numbers, labels
- Style: modern digital illustration, blues/purples/teals
Keep it under 200 words.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
      })
    }
  );
  const data = await response.json();
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error('Failed to generate prompt: ' + JSON.stringify(data));
  }
  return data.candidates[0].content.parts[0].text.trim();
}

async function createKieTask(prompt) {
  const response = await fetch(`${KIE_API_BASE}/api/v1/jobs/createTask`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${KIE_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: KIE_MODEL, input: { prompt: prompt + NO_TEXT_SUFFIX, image_input: [], aspect_ratio: '16:9', resolution: '2K', output_format: 'png' } })
  });
  const data = await response.json();
  if (data.code !== 200) throw new Error('KIE API error: ' + JSON.stringify(data));
  return data.data.taskId;
}

async function pollKieTask(taskId, maxAttempts = 60) {
  console.log('  Task ID:', taskId);
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const response = await fetch(`${KIE_API_BASE}/api/v1/jobs/recordInfo?taskId=${taskId}`, {
      headers: { 'Authorization': `Bearer ${KIE_API_KEY}` }
    });
    const data = await response.json();
    if (data.code !== 200) throw new Error('Polling error: ' + JSON.stringify(data));
    const state = data.data?.state;
    if (state === 'success') {
      const resultJson = JSON.parse(data.data?.resultJson || '{}'); const url = resultJson.resultUrls?.[0];
      if (!url) throw new Error('No image URL in response');
      return url;
    }
    if (state === 'failed' || state === 'error') throw new Error('Task failed: ' + data.data?.failMsg);
    if (i % 5 === 0) console.log('  Processing... attempt', i+1);
  }
  throw new Error('Timeout');
}

async function downloadImage(url, outputPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Download failed: ' + res.status);
  const buf = Buffer.from(await res.arrayBuffer());

  // Convert to WebP for smaller file size
  const webpPath = outputPath.replace(/\.png$/, '.webp');
  await sharp(buf)
    .webp({ quality: 85 })
    .toFile(webpPath);

  const webpStats = fs.statSync(webpPath);
  return webpStats.size;
}

async function generateImageWithKie(prompt, outputPath) {
  console.log('  Generating with Nano Banana Pro...');
  console.log('  Prompt:', prompt.substring(0, 80) + '...');
  const taskId = await createKieTask(prompt);
  const url = await pollKieTask(taskId);
  const size = await downloadImage(url, outputPath);
  console.log('  Saved:', outputPath, '(' + Math.round(size/1024) + 'KB)');
}

async function main() {
  const [slug, json] = process.argv.slice(2);
  if (!slug || !json) { console.error('Usage: node generate-blog-images.js <slug> <json>'); process.exit(1); }
  const sections = JSON.parse(json);
  if (!GEMINI_API_KEY) { console.error('Missing GEMINI_API_KEY'); process.exit(1); }
  if (!KIE_API_KEY) { console.error('Missing KIE_API_KEY'); process.exit(1); }
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
  
  const blogTitle = sections[0]?.blogTitle || slug.replace(/-/g, ' ');
  const results = [];
  console.log('Generating', sections.length, 'images for:', slug);
  console.log('Using KIE.ai Nano Banana Pro API\n');

  for (const s of sections) {
    const suffix = s.imageNumber === 1 ? 'hero' : String(s.imageNumber - 1);
    const outPath = path.join(IMAGES_DIR, slug + '-' + suffix + '.png');
    console.log('\nImage ' + s.imageNumber + '/4:');
    try {
      const prompt = await generateImagePrompt(s.content, s.imageNumber, blogTitle);
      console.log('  Prompt:', prompt.substring(0, 100) + '...');
      await generateImageWithKie(prompt, outPath);
      results.push({ imageNumber: s.imageNumber, path: '/images/blog/' + slug + '-' + suffix + '.webp', prompt });
      if (s.imageNumber < sections.length) await new Promise(r => setTimeout(r, 1000));
    } catch (e) { console.error('  Error:', e.message); }
  }
  console.log('\n--- Generated Images ---');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
