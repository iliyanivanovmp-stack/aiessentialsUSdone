#!/usr/bin/env node

/**
 * Google Ads Account Setup Checker
 *
 * Checks:
 * 1. OAuth authentication works
 * 2. Developer token is valid
 * 3. MCC can access linked accounts
 * 4. Account status and capabilities
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

/**
 * List accessible customers under the MCC
 */
async function listAccessibleCustomers(accessToken) {
  const url = 'https://googleads.googleapis.com/v17/customers:listAccessibleCustomers';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'developer-token': DEVELOPER_TOKEN,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`List customers error ${response.status}: ${errorText}`);
  }

  return await response.json();
}

/**
 * Get customer details
 */
async function getCustomerDetails(accessToken, customerId, loginCustomerId) {
  const url = `https://googleads.googleapis.com/v17/customers/${customerId}/googleAds:searchStream`;

  const query = `
    SELECT
      customer.id,
      customer.descriptive_name,
      customer.currency_code,
      customer.time_zone,
      customer.test_account,
      customer.manager,
      customer.status
    FROM customer
    LIMIT 1
  `;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'developer-token': DEVELOPER_TOKEN,
      'login-customer-id': loginCustomerId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    const errorText = await response.text();
    return { error: `${response.status}: ${errorText}` };
  }

  return await response.json();
}

async function main() {
  console.log('='.repeat(60));
  console.log('Google Ads Account Setup Checker');
  console.log('='.repeat(60));
  console.log();

  console.log('Configuration:');
  console.log(`  MCC Account (login-customer-id): ${LOGIN_CUSTOMER_ID}`);
  console.log(`  Target Account (customer-id): ${CUSTOMER_ID}`);
  console.log(`  Developer Token: ${DEVELOPER_TOKEN ? DEVELOPER_TOKEN.substring(0, 8) + '...' : 'NOT SET'}`);
  console.log();

  try {
    // Step 1: Test OAuth
    console.log('Step 1: Testing OAuth authentication...');
    const accessToken = await getAccessToken();
    console.log('✅ OAuth authentication successful\n');

    // Step 2: List accessible customers
    console.log('Step 2: Listing accessible customers under your credentials...');
    const customers = await listAccessibleCustomers(accessToken);

    if (customers.resourceNames && customers.resourceNames.length > 0) {
      console.log(`✅ Found ${customers.resourceNames.length} accessible customer(s):`);
      customers.resourceNames.forEach(name => {
        const id = name.replace('customers/', '');
        const isMCC = id === LOGIN_CUSTOMER_ID;
        const isTarget = id === CUSTOMER_ID;
        let label = '';
        if (isMCC) label = ' ← MCC (login-customer-id)';
        if (isTarget) label = ' ← Target account (customer-id)';
        console.log(`   - ${id}${label}`);
      });
      console.log();

      // Check if target account is accessible
      const targetAccessible = customers.resourceNames.some(
        name => name.includes(CUSTOMER_ID)
      );

      if (!targetAccessible) {
        console.log('⚠️  WARNING: Target account NOT found in accessible customers!');
        console.log('   The regular account may not be properly linked to the MCC.\n');
      }
    } else {
      console.log('⚠️  No accessible customers found\n');
    }

    // Step 3: Get MCC account details
    console.log('Step 3: Getting MCC account details...');
    const mccDetails = await getCustomerDetails(accessToken, LOGIN_CUSTOMER_ID, LOGIN_CUSTOMER_ID);

    if (mccDetails.error) {
      console.log(`⚠️  Could not fetch MCC details: ${mccDetails.error}\n`);
    } else if (mccDetails[0]?.results?.[0]?.customer) {
      const mcc = mccDetails[0].results[0].customer;
      console.log('✅ MCC Account Info:');
      console.log(`   Name: ${mcc.descriptiveName || 'N/A'}`);
      console.log(`   ID: ${mcc.id}`);
      console.log(`   Is Manager: ${mcc.manager}`);
      console.log(`   Status: ${mcc.status}`);
      console.log(`   Test Account: ${mcc.testAccount}`);
      console.log();
    }

    // Step 4: Get target account details
    console.log('Step 4: Getting target account details...');
    const targetDetails = await getCustomerDetails(accessToken, CUSTOMER_ID, LOGIN_CUSTOMER_ID);

    if (targetDetails.error) {
      console.log(`⚠️  Could not fetch target account details: ${targetDetails.error}`);
      console.log('   This may indicate the account is not properly linked to the MCC.\n');
    } else if (targetDetails[0]?.results?.[0]?.customer) {
      const target = targetDetails[0].results[0].customer;
      console.log('✅ Target Account Info:');
      console.log(`   Name: ${target.descriptiveName || 'N/A'}`);
      console.log(`   ID: ${target.id}`);
      console.log(`   Is Manager: ${target.manager}`);
      console.log(`   Status: ${target.status}`);
      console.log(`   Test Account: ${target.testAccount}`);
      console.log();

      if (target.testAccount) {
        console.log('⚠️  WARNING: This is a TEST account!');
        console.log('   Test accounts do NOT have access to Keyword Planner API.\n');
      }
    }

    // Summary
    console.log('='.repeat(60));
    console.log('SUMMARY & NEXT STEPS');
    console.log('='.repeat(60));
    console.log();
    console.log('For Keyword Planner API access, ensure:');
    console.log('1. ☐ Account is in Expert Mode (not Smart Mode)');
    console.log('2. ☐ Account has billing info added');
    console.log('3. ☐ Account has had some ad spend (even $1-5)');
    console.log('4. ☐ Account is NOT a test account');
    console.log('5. ☐ Regular account is linked to MCC');
    console.log();

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
