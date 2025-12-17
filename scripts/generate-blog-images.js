#!/usr/bin/env node

/**
 * Generate Blog Images using Google Imagen 3 via Gemini API
 *
 * This script generates contextual images for blog posts based on
 * the content of each section.
 *
 * Usage: node scripts/generate-blog-images.js <slug> <image-prompts-json>
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const IMAGES_DIR = path.join(process.cwd(), 'public/images/blog');

async function generateImagePrompt(sectionContent, imageNumber, blogTitle) {
  // Use Gemini to create an optimal image prompt based on section content
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an expert at creating image generation prompts. Based on the following blog section content, create a single, detailed image prompt for an AI image generator.

Blog Title: "${blogTitle}"
Image Number: ${imageNumber} of 4
Section Content:
---
${sectionContent.substring(0, 1500)}
---

Requirements:
- Create a professional, modern illustration style prompt
- The image should visually represent the key concepts in the section
- Use clean, minimal design with tech/business aesthetic
- Include specific visual elements that relate to the content
- Avoid text in the image
- Style: modern digital illustration, clean lines, professional color palette (blues, purples, teals)

Respond with ONLY the image prompt, nothing else. Keep it under 200 words.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300
        }
      })
    }
  );

  const data = await response.json();
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error('Failed to generate image prompt: ' + JSON.stringify(data));
  }
  return data.candidates[0].content.parts[0].text.trim();
}

async function generateImage(prompt, outputPath) {
  console.log(`  Generating image with prompt: "${prompt.substring(0, 100)}..."`);

  // Use Imagen 3 via Gemini API
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: '16:9',
          safetyFilterLevel: 'block_few',
          personGeneration: 'dont_allow'
        }
      })
    }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(`Imagen API error: ${JSON.stringify(data.error)}`);
  }

  if (!data.predictions?.[0]?.bytesBase64Encoded) {
    throw new Error('No image data in response: ' + JSON.stringify(data));
  }

  // Save the image
  const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
  fs.writeFileSync(outputPath, imageBuffer);
  console.log(`  Saved: ${outputPath}`);

  return outputPath;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: node generate-blog-images.js <slug> <sections-json>');
    console.error('  sections-json: JSON array of {content, imageNumber} objects');
    process.exit(1);
  }

  const slug = args[0];
  const sectionsJson = args[1];

  let sections;
  try {
    sections = JSON.parse(sectionsJson);
  } catch (e) {
    console.error('Invalid JSON for sections:', e.message);
    process.exit(1);
  }

  if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY not found in environment');
    process.exit(1);
  }

  // Ensure images directory exists
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const blogTitle = sections[0]?.blogTitle || slug.replace(/-/g, ' ');
  const generatedImages = [];

  console.log(`\nGenerating ${sections.length} images for: ${slug}\n`);

  for (const section of sections) {
    const imageNum = section.imageNumber;
    const suffix = imageNum === 1 ? 'hero' : String(imageNum - 1);
    const outputPath = path.join(IMAGES_DIR, `${slug}-${suffix}.png`);

    console.log(`\nImage ${imageNum}/4:`);

    try {
      // Generate contextual prompt
      const imagePrompt = await generateImagePrompt(section.content, imageNum, blogTitle);
      console.log(`  Prompt: ${imagePrompt.substring(0, 100)}...`);

      // Generate image
      await generateImage(imagePrompt, outputPath);

      generatedImages.push({
        imageNumber: imageNum,
        path: `/images/blog/${slug}-${suffix}.png`,
        prompt: imagePrompt
      });
    } catch (error) {
      console.error(`  Error generating image ${imageNum}: ${error.message}`);
      // Continue with other images
    }
  }

  console.log('\n--- Generated Images ---');
  console.log(JSON.stringify(generatedImages, null, 2));

  return generatedImages;
}

main().catch(console.error);
