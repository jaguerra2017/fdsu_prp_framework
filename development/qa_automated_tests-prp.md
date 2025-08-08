## 🧪 QA AUTOMATION RULES (MANDATORY)
  
  ### PRIORITY 1: CORE PRINCIPLE
  ***NO FEATURE IS COMPLETE WITHOUT WORKING AUTOMATED TESTS***
  
  ### PRIORITY 2: TEST CREATION (ALWAYS DO)
  - ✅ **CREATE:** Tests for every page/component built
  - ✅ **FOLLOW:** Pattern from `test_main_fp_pages.js`
  - ✅ **VALIDATE:** All URLs load without errors.
  ```

- **Add structured test template**:
  ```markdown
  ## 📝 STANDARD TEST TEMPLATE (COPY THIS)
  ```javascript
  // ✅ CORRECT Pattern - Use this structure
  const FEATURE_URLS = [
    'feature/list',
    'feature/create',
    'feature/edit'
  ]
  
  // ✅ CORRECT Validation Steps
  async function testFeaturePage(page, url) {
    // 1. Navigate and wait for load
    // 2. Verify no HTTP errors  
    // 3. Take screenshot for validation
    // 4. Test form interactions if applicable
  }
  ```
  ```

- **Add validation framework**:
  ```markdown
  ## 🔍 TEST VALIDATION CHECKLIST (ALL REQUIRED)
  - [ ] **Page Load:** All URLs return 200 status
  - [ ] **Form Functionality:** Submit/validate works correctly
  - [ ] **Data Display:** Lists/tables populate properly
  - [ ] **Mobile Responsive:** Test at 375px width
  - [ ] **Screenshot Match:** Design validation passed
  ```

  ### PRIORITY 3: USE PLAYWRIGHT MCP TO VALIDATE TESTS (ALWAYS DO)
  - ***CRITICAL:*** Use MCP screenshot to validate design too. 