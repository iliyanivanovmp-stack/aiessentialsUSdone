#!/usr/bin/env node

/**
 * Google Ads OAuth2 Token Generator
 *
 * This script helps you get a refresh token for Google Ads API.
 *
 * Prerequisites:
 * 1. Add GOOGLE_ADS_CLIENT_ID and GOOGLE_ADS_CLIENT_SECRET to your .env file
 * 2. Run: node scripts/get-google-ads-token.js
 */

require('dotenv').config();
const readline = require('readline');

const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET;
const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob'; // For desktop apps

const SCOPES = [
  'https://www.googleapis.com/auth/adwords'
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  console.log('='.repeat(60));
  console.log('Google Ads API - Refresh Token Generator');
  console.log('='.repeat(60));
  console.log();

  // Check for required environment variables
  if (!CLIENT_ID) {
    console.log('ERROR: GOOGLE_ADS_CLIENT_ID not found in .env file');
    console.log('Please add it to your .env file first.');
    rl.close();
    process.exit(1);
  }

  if (!CLIENT_SECRET) {
    console.log('ERROR: GOOGLE_ADS_CLIENT_SECRET not found in .env file');
    console.log('Please add it to your .env file first.');
    rl.close();
    process.exit(1);
  }

  // Step 1: Generate authorization URL
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${encodeURIComponent(CLIENT_ID)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(SCOPES.join(' '))}` +
    `&response_type=code` +
    `&access_type=offline` +
    `&prompt=consent`;

  console.log('Step 1: Open this URL in your browser:\n');
  console.log(authUrl);
  console.log();
  console.log('Step 2: Sign in with the Google account that has access to your Google Ads account.');
  console.log();
  console.log('Step 3: After authorizing, you will see a code on the screen.');
  console.log('        Copy that code and paste it below.\n');

  const code = await askQuestion('Enter the authorization code: ');

  if (!code.trim()) {
    console.log('Error: No code provided.');
    rl.close();
    process.exit(1);
  }

  console.log('\nExchanging code for tokens...\n');

  // Step 2: Exchange code for tokens
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        code: code.trim(),
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      })
    });

    const data = await response.json();

    if (data.error) {
      console.log('Error:', data.error);
      console.log('Description:', data.error_description);
      rl.close();
      process.exit(1);
    }

    console.log('='.repeat(60));
    console.log('SUCCESS! Here is your refresh token:');
    console.log('='.repeat(60));
    console.log();
    console.log('GOOGLE_ADS_REFRESH_TOKEN=' + data.refresh_token);
    console.log();
    console.log('='.repeat(60));
    console.log('Add this line to your .env file to complete setup.');
    console.log('='.repeat(60));
    console.log();

  } catch (error) {
    console.log('Error exchanging code:', error.message);
    rl.close();
    process.exit(1);
  }

  rl.close();
}

main();
