#!/usr/bin/env node

/**
 * Google Ads API Diagnostic Test
 * Tests different API versions and endpoints to find what works
 */

require('dotenv').config();

const DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_ADS_REFRESH_TOKEN;
const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID;
const LOGIN_CUSTOMER_ID = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;

async function getAccessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`Token error: ${data.error} - ${data.error_description}`);
  }
  return data.access_token;
}

async function testEndpoint(accessToken, version, endpoint, method = 'GET', body = null) {
  const url = `https://googleads.googleapis.com/${version}/${endpoint}`;

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'developer-token': DEVELOPER_TOKEN,
    'Content-Type': 'application/json'
  };

  if (LOGIN_CUSTOMER_ID) {
    headers['login-customer-id'] = LOGIN_CUSTOMER_ID;
  }

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const text = await response.text();

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      result = text.substring(0, 200);
    }

    return {
      version,
      endpoint,
      status: response.status,
      ok: response.ok,
      result: response.ok ? result : (result.error || result)
    };
  } catch (err) {
    return {
      version,
      endpoint,
      status: 'ERROR',
      ok: false,
      result: err.message
    };
  }
}

async function main() {
  console.log('='.repeat(70));
  console.log('Google Ads API Diagnostic Test');
  console.log('='.repeat(70));
  console.log();

  console.log('Configuration:');
  console.log(`  Developer Token: ${DEVELOPER_TOKEN ? DEVELOPER_TOKEN.substring(0, 10) + '...' : 'NOT SET'}`);
  console.log(`  Customer ID: ${CUSTOMER_ID}`);
  console.log(`  Login Customer ID (MCC): ${LOGIN_CUSTOMER_ID}`);
  console.log();

  // Get access token
  console.log('Getting access token...');
  const accessToken = await getAccessToken();
  console.log('✅ Access token obtained\n');

  const versions = ['v18', 'v17', 'v16', 'v15', 'v14'];

  console.log('Testing API versions with listAccessibleCustomers endpoint...');
  console.log('-'.repeat(70));

  for (const version of versions) {
    const result = await testEndpoint(accessToken, version, 'customers:listAccessibleCustomers');
    const status = result.ok ? '✅' : '❌';
    console.log(`${status} ${version}: Status ${result.status}`);
    if (result.ok) {
      console.log(`   Accessible customers: ${JSON.stringify(result.result.resourceNames || [])}`);
    } else if (result.status !== 404) {
      console.log(`   Error: ${JSON.stringify(result.result).substring(0, 100)}`);
    }
  }

  console.log();
  console.log('Testing customer query endpoint...');
  console.log('-'.repeat(70));

  // Try a simple GAQL query
  const query = {
    query: 'SELECT customer.id, customer.descriptive_name FROM customer LIMIT 1'
  };

  for (const version of versions) {
    const endpoint = `customers/${CUSTOMER_ID}/googleAds:search`;
    const result = await testEndpoint(accessToken, version, endpoint, 'POST', query);
    const status = result.ok ? '✅' : '❌';
    console.log(`${status} ${version}: Status ${result.status}`);
    if (result.ok) {
      console.log(`   Result: ${JSON.stringify(result.result).substring(0, 100)}`);
    } else if (result.status !== 404) {
      console.log(`   Error: ${JSON.stringify(result.result).substring(0, 150)}`);
    }
  }

  console.log();
  console.log('Testing Keyword Planner endpoint...');
  console.log('-'.repeat(70));

  const keywordRequest = {
    urlSeed: { url: 'https://aiessentials.us' },
    geoTargetConstants: ['geoTargetConstants/2840'],
    language: 'languageConstants/1000',
    keywordPlanNetwork: 'GOOGLE_SEARCH'
  };

  for (const version of versions) {
    const endpoint = `customers/${CUSTOMER_ID}:generateKeywordIdeas`;
    const result = await testEndpoint(accessToken, version, endpoint, 'POST', keywordRequest);
    const status = result.ok ? '✅' : '❌';
    console.log(`${status} ${version}: Status ${result.status}`);
    if (result.ok) {
      const count = result.result.results?.length || 0;
      console.log(`   Keywords found: ${count}`);
    } else if (result.status !== 404) {
      console.log(`   Error: ${JSON.stringify(result.result).substring(0, 150)}`);
    }
  }

  console.log();
  console.log('='.repeat(70));
  console.log('DIAGNOSIS:');
  console.log('='.repeat(70));
  console.log();
  console.log('If ALL versions show 404:');
  console.log('  → The Google Ads API might not be properly enabled');
  console.log('  → Check: console.cloud.google.com → APIs & Services → Enabled APIs');
  console.log('  → Make sure "Google Ads API" shows as ENABLED (not just listed)');
  console.log();
  console.log('If some versions work but Keyword Planner fails with UNIMPLEMENTED:');
  console.log('  → Your account needs more ad spend history');
  console.log('  → Or the account is in Smart Mode (needs Expert Mode)');
  console.log();
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
