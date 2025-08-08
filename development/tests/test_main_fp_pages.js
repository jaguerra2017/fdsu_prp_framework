const { chromium } = require('playwright');
const fs = require('fs');

const URLS = [
  'https://sizeup.firstduesizeup.test/fire-inspection-v2/list',
  'https://sizeup.firstduesizeup.test/fire-inspection-type/list',
  'https://sizeup.firstduesizeup.test/fire-inspection-setup/manage',
  'https://sizeup.firstduesizeup.test/invoice-v2/list',
  'https://sizeup.firstduesizeup.test/fee-schedule/list',
  'https://sizeup.firstduesizeup.test/cc-user-property/list',
  'https://sizeup.firstduesizeup.test/fd-permit/list',
  'https://sizeup.firstduesizeup.test/fd-permit-type/list',
  'https://sizeup.firstduesizeup.test/plan-review/list',
  'https://sizeup.firstduesizeup.test/fd-permit-status',
  'https://sizeup.firstduesizeup.test/form-builder/fd_permit',
  'https://sizeup.firstduesizeup.test/fire-inspection-violation/list',
  'https://sizeup.firstduesizeup.test/form-builder/fire_inspection',
  'https://sizeup.firstduesizeup.test/form-builder/invoice',
  'https://sizeup.firstduesizeup.test/cc-smoke-alarm-request/list',
  'https://sizeup.firstduesizeup.test/vendor/list',
  'https://sizeup.firstduesizeup.test/itm-report-ahj/index'
];

const CREDENTIALS = {
  email: 'u28@fdsu.tld',
  password: 'sizeup'
};

async function fillLoginForm(page, email, password) {
  try {
    console.log('Starting login process...');
    await page.waitForTimeout(5000);

    try {
      console.log('Checking for Accept button...');
      await page.waitForSelector("button[title='Accept']", { timeout: 1000 });
      await page.click("button[title='Accept']");
      console.log('Clicked Accept button');
    } catch (e) {
      console.log('No Accept button found, continuing...');
    }

    let newUI = true;
    try {
      console.log('Checking for new UI...');
      await page.waitForSelector("#email", { timeout: 1000 });
      await page.click("#email");
      console.log('New UI detected');
    } catch (e) {
      console.log('Old UI detected');
      newUI = false;
    }

    if (newUI) {
      console.log('Filling new UI form...');
      await page.fill("#email", email);
      await page.click(".email-form .btn-primary");
      await page.fill("#password", password);
      await page.click("//form/div[@class='password-form']/button[@title='Sign in']");
    } else {
      console.log('Filling old UI form...');
      await page.fill("#SigninForm_email", email);
      await page.fill("#SigninForm_password", password);
      await page.press("#SigninForm_password", "Enter");
    }

    console.log('Login form submitted');
    return page;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

async function testPage(page, url) {
  try {
    console.log(`Testing ${url}...`);

    // Listen for response errors
    const responseErrors = [];
    page.on('response', response => {
      const respUrl = response.url();
      // Only track errors from our domain
      if (respUrl.includes('sizeup.firstduesizeup.test') && response.status() >= 400) {
        responseErrors.push(`HTTP ${response.status()} on ${respUrl}`);
      }
    });

    // Navigate to the page
    const response = await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Check for SSL certificate errors on this page too
    await handleSSLCertificateError(page);

    // Check HTTP status
    if (response.status() >= 400) {
      console.log(`❌ ${url} failed with HTTP ${response.status()}`);
      return {
        success: false,
        errors: [`HTTP ${response.status()} on ${url}`]
      };
    }

    // Wait for either a data table or grid to appear
    try {
      await Promise.race([
        page.waitForSelector('table', { timeout: 10000 }),
        page.waitForSelector('.grid', { timeout: 10000 }),
        page.waitForSelector('.loading', { state: 'hidden', timeout: 10000 })
      ]);

      // Wait a bit more to catch any late errors
      await page.waitForTimeout(2000);

      // Check for response errors
      if (responseErrors.length > 0) {
        console.log(`❌ ${url} had errors:`);
        responseErrors.forEach(err => console.log(`  - ${err}`));
        return {
          success: false,
          errors: responseErrors
        };
      }

      console.log(`✅ ${url} loaded successfully`);
      return {
        success: true,
        errors: []
      };
    } catch (e) {
      console.log(`❌ ${url} failed to load data: ${e.message}`);
      return {
        success: false,
        errors: [`Timeout waiting for content: ${e.message}`, ...responseErrors]
      };
    }
  } catch (e) {
    console.log(`❌ ${url} failed: ${e.message}`);
    return {
      success: false,
      errors: [`Navigation error: ${e.message}`]
    };
  }
}

async function handleSSLCertificateError(page) {
  try {
    // Wait a moment for the page to load
    await page.waitForTimeout(2000);
    
    // Check if we're on the SSL error page by looking for specific text
    const pageContent = await page.textContent('body');
    
    if (pageContent.includes('Your connection is not private') || 
        pageContent.includes('NET::ERR_CERT_AUTHORITY_INVALID') ||
        pageContent.includes('This connection is not private')) {
      
      console.log('\n🚨 SSL CERTIFICATE ERROR DETECTED! 🚨');
      console.log('The browser is showing a security warning.');
      console.log('\nACTION REQUIRED:');
      console.log('1. Click "Advanced" button in the browser');
      console.log('2. Click "Proceed to sizeup.firstduesizeup.test (unsafe)"');
      console.log('3. The test will continue automatically after 15 seconds...\n');
      
      // Show browser alert to user
      await page.evaluate(() => {
        alert('SSL Certificate Error Detected!\n\nPlease:\n1. Click "Advanced" button\n2. Click "Proceed to sizeup.firstduesizeup.test (unsafe)"\n\nTest will continue in 15 seconds...');
      });
      
      // Wait 15 seconds for user to manually fix the SSL issue
      console.log('Waiting 15 seconds for you to fix the SSL certificate issue...');
      await page.waitForTimeout(15000);
      
      // Try to navigate again, assuming user fixed the issue
      console.log('Retrying navigation...');
      await page.goto('https://sizeup.firstduesizeup.test/auth/signin-v2');
      
      // Wait a bit more to ensure page loads
      await page.waitForTimeout(3000);
      
      console.log('✅ SSL issue should now be resolved. Continuing with test...');
    }
  } catch (error) {
    console.log('Note: Could not check for SSL errors, continuing with test...');
  }
}

(async () => {
  let browser;
  try {
    console.log('Launching browser...');
    browser = await chromium.launch();
    const context = await browser.newContext({
      ignoreHTTPSErrors: true  // Ignore SSL certificate issues for local development
    });
    const page = await context.newPage();

    console.log('Navigating to login page...');
    await page.goto('https://sizeup.firstduesizeup.test/auth/signin-v2');
    
    // Check if we hit the SSL certificate error page
    await handleSSLCertificateError(page);

    console.log('Attempting login...');
    await fillLoginForm(page, CREDENTIALS.email, CREDENTIALS.password);

    console.log('Waiting for login to complete...');
    await page.waitForTimeout(5000);

    const results = [];
    for (const url of URLS) {
      const result = await testPage(page, url);
      results.push({
        url,
        success: result.success,
        errors: result.errors
      });
    }

    console.log('Writing results to file...');
    fs.writeFileSync('test-results.json', JSON.stringify(results, null, 2));
    console.log('Results written successfully');

  } catch (error) {
    console.error('Test execution failed:', error);
    fs.writeFileSync('test-results.json', JSON.stringify({
      error: error.message,
      urls: URLS.map(url => ({
        url,
        success: false,
        errors: [error.message]
      }))
    }, null, 2));
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();