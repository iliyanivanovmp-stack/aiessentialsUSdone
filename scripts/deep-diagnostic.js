#!/usr/bin/env node

/**
 * Deep diagnostic for Google Ads API - checks everything
 */

require('dotenv').config();

const DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_ADS_REFRESH_TOKEN;
const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID;
const LOGIN_CUSTOMER_ID = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;

async function main() {
  console.log('='.repeat(70));
  console.log('DEEP GOOGLE ADS API DIAGNOSTIC');
  console.log('='.repeat(70));
  console.log();

  // 1. Show all config
  console.log('STEP 1: Configuration Check');
  console.log('-'.repeat(70));
  console.log(`Developer Token: ${DEVELOPER_TOKEN || 'NOT SET'}`);
  console.log(`Client ID: ${CLIENT_ID ? CLIENT_ID.substring(0, 30) + '...' : 'NOT SET'}`);
  console.log(`Client Secret: ${CLIENT_SECRET ? '***SET***' : 'NOT SET'}`);
  console.log(`Refresh Token: ${REFRESH_TOKEN ? REFRESH_TOKEN.substring(0, 20) + '...' : 'NOT SET'}`);
  console.log(`Customer ID: ${CUSTOMER_ID}`);
  console.log(`Login Customer ID (MCC): ${LOGIN_CUSTOMER_ID}`);
  console.log();

  // 2. Get access token and check its info
  console.log('STEP 2: OAuth Token Test');
  console.log('-'.repeat(70));

  let accessToken;
  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
        grant_type: 'refresh_token'
      })
    });

    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      console.log(`❌ Token Error: ${tokenData.error}`);
      console.log(`   Description: ${tokenData.error_description}`);
      return;
    }

    accessToken = tokenData.access_token;
    console.log('✅ Access token obtained');
    console.log(`   Token type: ${tokenData.token_type}`);
    console.log(`   Expires in: ${tokenData.expires_in} seconds`);
    console.log(`   Scope: ${tokenData.scope || 'not returned'}`);
  } catch (err) {
    console.log(`❌ Failed to get token: ${err.message}`);
    return;
  }

  // 3. Check token info
  console.log();
  console.log('STEP 3: Token Info Check');
  console.log('-'.repeat(70));

  try {
    const tokenInfoResponse = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`
    );
    const tokenInfo = await tokenInfoResponse.json();

    if (tokenInfo.error) {
      console.log(`❌ Token info error: ${tokenInfo.error}`);
    } else {
      console.log('✅ Token is valid');
      console.log(`   Scope: ${tokenInfo.scope}`);
      console.log(`   Expires in: ${tokenInfo.expires_in} seconds`);
      console.log(`   Access type: ${tokenInfo.access_type || 'N/A'}`);

      if (!tokenInfo.scope?.includes('adwords')) {
        console.log('⚠️  WARNING: Token does NOT have Google Ads scope!');
        console.log('   You need to regenerate the refresh token with the correct scope.');
      }
    }
  } catch (err) {
    console.log(`❌ Token info check failed: ${err.message}`);
  }

  // 4. Test basic API connectivity with curl-like output
  console.log();
  console.log('STEP 4: API Connectivity Test');
  console.log('-'.repeat(70));

  const testUrl = 'https://googleads.googleapis.com/v17/customers:listAccessibleCustomers';

  console.log(`Testing: GET ${testUrl}`);
  console.log(`Headers:`);
  console.log(`  Authorization: Bearer ${accessToken.substring(0, 20)}...`);
  console.log(`  developer-token: ${DEVELOPER_TOKEN}`);
  console.log();

  try {
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': DEVELOPER_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Response Status: ${response.status} ${response.statusText}`);
    console.log(`Response Headers:`);
    for (const [key, value] of response.headers.entries()) {
      if (['content-type', 'x-request-id', 'date', 'server'].includes(key.toLowerCase())) {
        console.log(`  ${key}: ${value}`);
      }
    }

    const text = await response.text();
    console.log();
    console.log('Response Body (first 500 chars):');
    console.log(text.substring(0, 500));

    if (response.status === 404) {
      console.log();
      console.log('='.repeat(70));
      console.log('DIAGNOSIS: 404 NOT FOUND');
      console.log('='.repeat(70));
      console.log();
      console.log('Possible causes:');
      console.log('1. Developer token is from a TEST account (not approved for real API)');
      console.log('2. Google Ads API is not enabled in the correct Google Cloud project');
      console.log('3. The OAuth credentials are from a different project than the API');
      console.log();
      console.log('To fix:');
      console.log('1. Go to Google Ads > Tools & Settings > API Center');
      console.log('2. Check the "Access level" - must be "Basic" or "Standard"');
      console.log('3. Note which Google Cloud project is linked');
      console.log('4. Go to that Google Cloud project and enable Google Ads API');
      console.log('5. Regenerate OAuth credentials from THAT project');
    }

  } catch (err) {
    console.log(`❌ Request failed: ${err.message}`);
  }

  // 5. Try with MCC ID as the customer
  console.log();
  console.log('STEP 5: Testing with MCC ID');
  console.log('-'.repeat(70));

  const mccUrl = `https://googleads.googleapis.com/v17/customers/${LOGIN_CUSTOMER_ID}/googleAds:search`;
  const query = { query: 'SELECT customer.id FROM customer LIMIT 1' };

  console.log(`Testing: POST ${mccUrl}`);

  try {
    const response = await fetch(mccUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': DEVELOPER_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    });

    console.log(`Response Status: ${response.status}`);
    const text = await response.text();
    console.log('Response (first 300 chars):');
    console.log(text.substring(0, 300));

  } catch (err) {
    console.log(`❌ Request failed: ${err.message}`);
  }

  console.log();
  console.log('='.repeat(70));
  console.log('END OF DIAGNOSTIC');
  console.log('='.repeat(70));
}

main().catch(console.error);
