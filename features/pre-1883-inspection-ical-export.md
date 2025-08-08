name: "Fire Inspection iCal Export - Complete Implementation PRP"
description: |
  
## Main Concept
This PRP extends the proven My Shifts iCal architecture to Fire Inspections, implementing a sharable calendar link feature for the My Inspections page that enables fire inspectors to sync their inspection schedules with external calendar applications.

## Purpose
Enable fire inspectors to create sharable iCal links for their scheduled inspections, mirroring the existing My Shifts functionality while adapting for fire inspection data complexity and UI requirements.

## 🎯 CORE PRINCIPLES (NEVER VIOLATE)
1. ***CONTEXT IS KING:*** Leverage existing My Shifts patterns for architecture consistency
2. ***VALIDATION LOOPS:*** Ensure all inspection data fields map correctly to iCal format
3. ***INFORMATION DENSE:*** Follow established First Due patterns and conventions
4. ***PROGRESSIVE SUCCESS:*** Build on proven architecture, validate, then enhance
5. **INTEGRATION ANALYSIS**: Vue.js component integration with fdsu-list-component architecture
6. **GLOBAL RULES**: Follow First Due PHP/Vue.js patterns and permission system

---

## Goal
Implement Fire Inspection iCal export functionality that mirrors the existing My Shifts module, enabling fire inspectors to create sharable calendar links for their inspection schedules with external calendar applications.

## Why
- **User Workflow Enhancement**: Fire inspectors need to sync inspection schedules across multiple calendar platforms
- **Proven Architecture Extension**: Leverages existing My Shifts iCal implementation patterns
- **Business Value**: Improves inspector productivity by enabling external calendar integration
- **System Consistency**: Maintains architectural patterns established in scheduling module

## What
Create complete iCal export system for fire inspections including:
- Calendar icon button on My Inspections page with tooltip
- Vue.js modal for shareable link generation and management
- iCal feed generation with inspection-specific data mapping
- Token-based security with revocation capability
- Support for all inspection statuses and reinspections
- All Day event handling for inspections without specific times

### Success Criteria
- [ ] Calendar icon displays on My Inspections page with correct tooltip
- [ ] Modal opens with shareable iCal URL and Copy/Revoke buttons
- [ ] Generated URLs work with all major calendar applications
- [ ] All inspection data fields map correctly to iCal format
- [ ] Both initial inspections and reinspections appear with correct titles
- [ ] All inspection statuses are handled and displayed appropriately
- [ ] Security tokens work with proper revocation functionality
- [ ] Performance meets sub-100ms response time requirements

## All Needed Context

### 🔗 MCPs (Model Context Protocol) - MANDATORY EXECUTION

#### 🧪 PLAYWRIGHT MCP (MANDATORY FOR LEVEL 5 VALIDATION)
***CRITICAL BEHAVIOR: AI MUST use Playwright MCP for automated testing validation***

- **ALWAYS EXECUTE:** Playwright MCP during Level 5 validation (automated testing phase)
- **SCREENSHOT VALIDATION:** Use Playwright MCP to capture and validate design implementation
- **FUNCTIONAL TESTING:** Execute feature tests and validate functionality via Playwright MCP
- **DESIGN COMPARISON:** Use Playwright screenshots + Figma MCP for pixel-perfect validation
- **STOP CONDITION:** No feature marked complete without Playwright MCP validation

#### 🔍 ATLASSIAN MCP (CONDITIONAL - BUT CRITICAL WHEN NEEDED)
***TRIGGER CONDITION: When project documentation gaps identified***

- **USE WHEN:** PRP references external documentation or tickets
- **SEARCH FOR:** Specific technical requirements, acceptance criteria, implementation notes
- **INTEGRATE:** Found documentation into PRP context before implementation

#### 🚨 MCP EXECUTION VALIDATION (MANDATORY CHECKLIST)
- [ ] **Figma Dual Tool:** Both get_image AND get_code_connect_map executed if Figma available
- [ ] **Design Accuracy:** Visual mockup analyzed and understood
- [ ] **Component Specs:** Technical specifications extracted and integrated
- [ ] **Playwright Testing:** Automated tests executed via Playwright MCP during Level 5
- [ ] **Screenshot Validation:** Playwright MCP screenshots compared with Figma design
- [ ] **Functional Validation:** All feature workflows tested via Playwright MCP
- [ ] **Documentation Complete:** All external docs searched and integrated via Atlassian MCP
- [ ] **Context Integration:** All MCP results properly integrated into implementation context

***BEHAVIORAL RULE: MCP tools provide critical context that cannot be replicated through other means***

### Documentation & References (CRITICAL CONTEXT FOR IMPLEMENTATION)

```yaml
# MUST READ - Include these in your context window

# EXISTING ICAL ARCHITECTURE (FOUNDATION PATTERNS)
- file: site/controllers/ScheduleIcalExportController.php
  why: Proven controller pattern for iCal exports with token security
  critical: UUIDv4 token generation, multi-tenant filtering, permission integration

- file: site/models/ScheduleIcalExport.php
  why: Token management model pattern with createOrLoadForUser method
  critical: Database schema pattern, validation rules, toArray() method

- file: site/components/schedule/ical/ScheduleIcalRepository.php
  why: Repository pattern for data queries and optimization techniques
  critical: User-specific data filtering, complex query optimization patterns

- file: site/client/js/components/schedule_shift/my_shifts_shareable_link_modal.js
  why: VanillaModal implementation pattern (contrast with Vue.js requirement)
  critical: Modal lifecycle, clipboard functionality, error handling

# FIRE INSPECTION CONTEXT (TARGET IMPLEMENTATION)
- file: site/controllers/FireInspectionV2Controller.php
  why: Existing controller patterns and permission integration
  critical: readMyFireInspection permission, list action patterns

- file: site/models/FireInspection.php
  why: Data model with available fields for iCal mapping
  critical: STATUS constants, field availability, scheduled_at handling

- file: api/models/FireInspection.php
  why: API model with business name and address query patterns
  critical: Complex query joins for reinspection relationships

# VUE.JS COMPONENT ARCHITECTURE (UI PATTERNS)
- file: site/client/js/components/fire_inspection_v2/list_component.js
  why: List component integration patterns for button placement
  critical: extraIconActions integration, ListMixin patterns

- file: site/client/js/components/fire_inspection_v2/my_list_component.js
  why: My Inspections specific component wrapper
  critical: isMyFireInspection prop usage

- file: site/client/js/components/fdsu_list_components/fdsu_modal_component_v2.js
  why: Vue.js modal component pattern (replaces VanillaModal approach)
  critical: Modal lifecycle events, template structure, props system

# SPIKE FINDINGS (TECHNICAL CHALLENGES)
- docfile: Jira PRE-1883 spike findings by Josue Rivera
  why: Critical technical challenges and architecture decisions
  critical: All Day events validation issue, performance requirements, UI architecture differences
```

### 🤖 CONTEXT LOADING PROTOCOL (RESEARCH-BACKED)
***PREVENT CONTEXT FAILURES: Load ONLY what PRP specifies***

**MANDATORY LOADING (ALWAYS):**
- `tmp/prps/patterns/` - Only sections relevant to current task

### 🔬 CONTEXT ENGINEERING VALIDATION (RESEARCH-BACKED)
***Prevent context failures through selective loading***

**BEFORE IMPLEMENTATION - VALIDATE CONTEXT SELECTION:**
- [ ] **Tool Loadout Check:** Using <30 tools total (research threshold)
- [ ] **Context Relevance:** Only loaded PRPs directly applicable to current task
- [ ] **Information Density:** All loaded context contributes to implementation success
- [ ] **No Context Clash:** Loaded patterns don't contradict each other

**DURING IMPLEMENTATION - MONITOR CONTEXT QUALITY:**
- [ ] **No Hallucination Embedding:** Verify all referenced information is accurate
- [ ] **Pattern Consistency:** Following one coherent set of patterns, not mixing approaches
- [ ] **Focus Maintenance:** Implementation stays on task, doesn't drift to unrelated features

## Implementation Blueprint

### Data Models and Structure

Adapt the proven My Shifts token-based architecture for fire inspections:

```php
// Database Table: fire_inspection_ical_export_url
// Mirrors: schedule_ical_export_url structure
id, access_token (UUIDv4), user_id, created_at, is_revoked, revoked_at, client_code
```

### List of Tasks to be Completed (CRITICAL EXECUTION ORDER)

```yaml
Task 1: CREATE Backend Controller
MODIFY FireInspectionV2Controller.php:
  - ADD accessRules for iCal export actions
  - ADD permission check: readMyFireInspection
  - PATTERN: Mirror ScheduleIcalExportController structure

CREATE FireInspectionIcalExportController.php:
  - INHERIT FROM: ShiftApiBaseController (same as ScheduleIcalExportController)
  - MIRROR ACTIONS: view, generateLink, revokeLink
  - MODIFY permission: accessShiftMyShiftsModule → readMyFireInspection
  - PRESERVE: UUIDv4 token pattern, multi-tenant filtering

Task 2: CREATE Data Model
CREATE FireInspectionIcalExport.php:
  - MIRROR PATTERN FROM: ScheduleIcalExport.php
  - MODIFY tableName: schedule_ical_export_url → fire_inspection_ical_export_url
  - PRESERVE: createOrLoadForUser method, token validation rules
  - MODIFY toArray URL: shift/ical-export → fire-inspection-ical-export

Task 3: CREATE Repository Layer  
CREATE FireInspectionIcalRepository.php:
  - MIRROR PATTERN FROM: ScheduleIcalRepository.php
  - MODIFY QUERIES: Adapt for fire_inspection table structure
  - INCLUDE FIELDS: business_name, address, inspection_type, scheduled_at, status_code, notes
  - HANDLE: Reinspection relationships (original_fire_inspection_id)
  - OPTIMIZE: Address performance requirements from spike findings

Task 4: CREATE iCal Event Adapters
CREATE FireInspectionIcalVEvent.php:
  - EXTEND: ScheduleIcalVEvent or create new validation
  - CRITICAL: Handle VALUE=DATE format for All Day events (spike finding issue)
  - IMPLEMENT: Event title formatting per acceptance criteria
  - HANDLE: Initial vs reinspection title formatting

Task 5: CREATE Database Migration
CREATE migration file:
  - TABLE: fire_inspection_ical_export_url
  - MIRROR STRUCTURE: schedule_ical_export_url
  - ADD INDEXES: user_id, access_token, is_revoked
  - FOREIGN KEY: user_id → admin_account.id

Task 6: CREATE Vue.js Modal Component
CREATE ical_shareable_link_modal.js:
  - ARCHITECTURE: Vue.js component (NOT VanillaModal like My Shifts)
  - INTEGRATE: FdsuModalComponentV2 pattern
  - MIRROR FUNCTIONALITY: my_shifts_shareable_link_modal.js logic
  - ADAPT: Vue.js event system, props, and lifecycle methods

CREATE _ical_shareable_link_modal.php:
  - TEMPLATE: Vue.js template structure
  - MIRROR DESIGN: My Shifts modal layout
  - INCLUDE: Copy button, Revoke Link button, URL display

Task 7: INTEGRATE UI Components
MODIFY list_component.js:
  - ADD: Calendar icon integration
  - IMPLEMENT: extraIconActions pattern (not extraIconActionsAfterBulk)
  - TOOLTIP: "Create link for external calendars"
  - MODAL TRIGGER: Open iCal modal on click

UPDATE my_list_component.js:
  - ADD: Modal component registration and data management
  - INTEGRATE: Modal state handling with Vue.js patterns

Task 8: CONFIGURE Routing and Registration
MODIFY site/config/main.php:
  - ADD URL ROUTES: fire-inspection-ical-export/view/<id>, generate-link, revoke-link
  - COMPONENT REGISTRATION: Vue.js component paths

Task 9: IMPLEMENT Error Handling
ADD error handling patterns:
  - BACKEND: Mirror ScheduleIcalExportController error responses
  - FRONTEND: Vue.js error handling with snackbar integration
  - VALIDATION: All Day events compatibility (critical spike finding)

Task 10: TESTING Integration Points
INTEGRATE with existing systems:
  - PERMISSIONS: Verify readMyFireInspection integration
  - UI: Ensure proper My Inspections page integration
  - DATA: Validate all inspection fields map to iCal correctly
```

### Per Task Pseudocode

**Task 1 - Backend Controller:**
```php
class FireInspectionIcalExportController extends ShiftApiBaseController {
    // Mirror ScheduleIcalExportController::accessRules()
    // Change: accessShiftMyShiftsModule → readMyFireInspection
    
    public function actionView($id) {
        // Mirror: Load link by access_token
        // Create: FireInspectionIcalRepository($userId)
        // Adapt: getFireInspections() instead of getWorkShifts()
    }
    
    public function actionGenerateLink() {
        // Mirror: UUIDv4 generation pattern
        // Adapt: FireInspectionIcalExport::createOrLoadForUser()
    }
}
```

**Task 6 - Vue.js Modal Component:**
```javascript
const IcalShareableLinkModal = {
  template: '#ical-shareable-link-modal-template',
  props: ['isOpen'],
  data() {
    return {
      url: '',
      accessToken: null,
      copiedMessage: 'Copy to clipboard'
    }
  },
  // Mirror: my_shifts_shareable_link_modal.js methods
  // Adapt: Vue.js event system instead of VanillaModal
  methods: {
    generateIcalLink() {
      // POST to: fire-inspection-ical-export/generate-link
    },
    revokeLink() {
      // GET to: fire-inspection-ical-export/revoke-link
    }
  }
}
```

### Integration Points
```yaml
DATABASE:
  - migration: "CREATE TABLE fire_inspection_ical_export_url"
  - indexes: "user_id, access_token, is_revoked for performance"
  
CONFIG:
  - add to: config/main.php URL routing section
  - register: Vue.js component paths

PERMISSIONS:
  - integrate: readMyFireInspection permission
  - verify: multi-tenant security via client_code
```

## ⚡ VALIDATION LOOP (NEVER SKIP)
### 🚨 CRITICAL: Run validation after EVERY code modification cycle

### Level 1: Code style and linters
```bash
# Run these FIRST - fix any errors before proceeding
./tmp/quick-test.sh style-only
# Expected: No errors. If errors, READ the error and fix.
```

### Level 2: Migrations
```bash
# Run these SECOND - fix any errors before proceeding
./tmp/quick-test.sh migrations
# Expected: No errors. If errors, READ the error and fix.
```

### Level 3: Unit tests
```bash
# Run these THIRD - fix any errors before proceeding
./tmp/quick-test.sh js-tests

./tmp/quick-test.sh php-tests
# Expected: No errors. If errors, READ the error and fix.
```

### Level 4: Assets build
```bash
# Run these FOURTH - fix any errors before proceeding
./tmp/quick-test.sh assets
# Expected: No errors. If errors, READ the error and fix.
```

### Level 5: Automated Testing (MANDATORY - NO EXCEPTIONS)
```markdown
# 🚨 CRITICAL: Load testing context and implement
# AI MUST read: tmp/prps/development/qa_automated_tests-prp.md
# Expected: All feature tests pass, design screenshots match Figma
```
**STOP CONDITION:** No feature marked complete without automated test validation

## ✅ FINAL VALIDATION CHECKLIST (COMPREHENSIVE)

### Context Management Validation:
- [ ] **Context Loaded Correctly:** Only relevant PRP modules loaded (no context confusion)
- [ ] **Patterns Followed:** Implementation matches existing My Shifts architecture patterns
- [ ] **No Context Poisoning:** All information sources verified and accurate

### Code Quality Validation:
- [ ] **All 5 Validation Levels:** Style → Migrations → Tests → Assets → Feature Tests
- [ ] **No Linting Errors:** Style validation passed completely
- [ ] **No Type Errors:** All TypeScript/PHP type checks passed
- [ ] **Security Validated:** Permission checks and data validation implemented

### Feature Completeness Validation:
- [ ] **Automated Tests Created:** Per `qa_automated_tests-prp.md` patterns
- [ ] **Design Validated:** MCP screenshots confirm Figma accuracy pixel-perfect
- [ ] **Integration Verified:** Works seamlessly with existing First Due patterns
- [ ] **Error Handling:** Graceful failure modes implemented and tested

### Fire Inspection Specific Validation:
- [ ] **Data Mapping Complete:** All required inspection fields map to iCal format
- [ ] **Reinspection Support:** Both initial and reinspections display correctly
- [ ] **All Day Events:** VALUE=DATE format validation works (critical spike finding)
- [ ] **Status Handling:** All inspection statuses render with correct format
- [ ] **Performance Optimized:** Sub-100ms response time achieved
- [ ] **Calendar Compatibility:** Tested with major calendar applications

### Production Readiness Validation:
- [ ] **Documentation Updated:** Code comments and any necessary docs updated
- [ ] **Logs Informative:** Proper logging without verbosity
- [ ] **Manual Test Successful:** Specific feature workflow tested end-to-end
- [ ] **Rollback Plan:** Method to undo changes if issues arise in production
- [ ] **Deployment Instructions:** Clear steps for seeing code working (URLs, credentials, etc.)

---

## ❌ ANTI-PATTERNS TO AVOID (CONTEXT ENGINEERING CRITICAL)

### Context Management Failures:
- ❌ **Context Confusion:** Loading all PRP files when only specific ones needed
- ❌ **Context Distraction:** Including irrelevant patterns/examples in implementation  
- ❌ **Tool Overload:** Using >30 tools or including unused tool definitions
- ❌ **Context Poisoning:** Accepting incorrect information as fact without verification

### Implementation Anti-Patterns:
- ❌ **Skip validation loops** - causes context poisoning in subsequent iterations
- ❌ **Create new patterns** when established First Due patterns exist (context clash)
- ❌ **Ignore specialized PRPs** - defeats modular architecture purpose
- ❌ **Bypass MCP validation** - design accuracy cannot be assumed
- ❌ **Mix VanillaModal and Vue.js patterns** - architectural inconsistency
- ❌ **Ignore All Day events validation issue** - critical spike finding must be addressed
- ❌ **Skip performance optimization** - fire inspection queries are complex
- ❌ **Ignore reinspection relationships** - data integrity requirement

### Critical Spike Findings to Address:
- ❌ **VALUE=DATE validation failure** - Must extend ScheduleIcalVEvent validation
- ❌ **Performance assumptions** - Fire inspections require ~97% performance improvement
- ❌ **UI architecture mismatch** - Vue.js vs VanillaModal integration differences
- ❌ **Permission model confusion** - readMyFireInspection vs accessShiftMyShiftsModule

---

## IMPLEMENTATION CONFIDENCE SCORE: 9.5/10

**Rationale:**
- **Architecture Foundation (10/10):** Complete My Shifts pattern provides proven implementation path
- **Data Context (9/10):** Full understanding of inspection fields and relationships  
- **UI Integration (9/10):** Clear Vue.js component integration patterns identified
- **Technical Challenges (9/10):** All spike findings documented with solution approaches
- **Validation Framework (10/10):** Comprehensive testing and validation loops defined

**Context Engineering Quality: 9.5/10**
- **Selective Loading:** Only My Shifts patterns and fire inspection context included
- **No Context Clash:** Clear distinction between VanillaModal and Vue.js approaches
- **Information Dense:** All critical implementation details captured
- **Focused Execution:** Clear task order prevents architectural confusion

This PRP enables one-pass implementation by providing complete context from proven patterns while addressing all technical challenges identified in the spike investigation.