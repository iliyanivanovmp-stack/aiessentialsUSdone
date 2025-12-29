#!/usr/bin/env node

/**
 * Convert existing PNG blog images to WebP format
 * Usage: node scripts/convert-images-to-webp.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(process.cwd(), 'public/images/blog');
const QUALITY = 85; // WebP quality (0-100), 85 is visually lossless

async function convertToWebP(pngPath) {
  const webpPath = pngPath.replace(/\.png$/, '.webp');
  const filename = path.basename(pngPath);

  try {
    const pngStats = fs.statSync(pngPath);
    const pngSize = pngStats.size;

    await sharp(pngPath)
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const webpStats = fs.statSync(webpPath);
    const webpSize = webpStats.size;
    const savings = ((1 - webpSize / pngSize) * 100).toFixed(1);

    console.log(`✅ ${filename}`);
    console.log(`   PNG: ${(pngSize / 1024 / 1024).toFixed(2)} MB → WebP: ${(webpSize / 1024 / 1024).toFixed(2)} MB (${savings}% smaller)`);

    return { pngSize, webpSize };
  } catch (error) {
    console.error(`❌ Error converting ${filename}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🔄 Converting PNG images to WebP...\n');

  const files = fs.readdirSync(IMAGES_DIR).filter(f => f.endsWith('.png'));

  if (files.length === 0) {
    console.log('No PNG files found to convert.');
    return;
  }

  console.log(`Found ${files.length} PNG files\n`);

  let totalPngSize = 0;
  let totalWebpSize = 0;

  for (const file of files) {
    const result = await convertToWebP(path.join(IMAGES_DIR, file));
    if (result) {
      totalPngSize += result.pngSize;
      totalWebpSize += result.webpSize;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Total PNG size:  ${(totalPngSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total WebP size: ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total savings:   ${((1 - totalWebpSize / totalPngSize) * 100).toFixed(1)}%`);
  console.log('\n✨ Conversion complete!');
  console.log('\nNext steps:');
  console.log('1. Update blog post image references from .png to .webp');
  console.log('2. Delete old PNG files if WebP looks good: rm public/images/blog/*.png');
}

main().catch(console.error);
