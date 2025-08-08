name: "Base PRP Template v4 - Context-Rich with Validation Loops ()"
description: |

## Main Concept
This is a **PRP (Product Requirement Prompt)** template. The core concept: **"PRP = PRD (Product Requirement Document) + curated codebase intelligence + agent/runbook"** - designed to enable AI agents to ship production-ready code on the first pass.

## Purpose
Template optimized for AI agents to implement features with sufficient context and self-validation capabilities to achieve working code through iterative refinement.

## 🎯 CORE PRINCIPLES (NEVER VIOLATE)
1. ***CONTEXT IS KING:*** Include ALL necessary documentation and examples
2. ***VALIDATION LOOPS:*** Provide executable tests AI can run and fix
3. ***INFORMATION DENSE:*** Use established codebase keywords and patterns
4. ***PROGRESSIVE SUCCESS:*** Start simple, validate, then enhance
5. **INTEGRATION ANALYSIS**: Always be cautious by reviewing possible integrations with existing modules
6. **GLOBAL RULES**: Always take into account First Due patterns for coding

---

## Goal
[What needs to be built - be specific about the end state and desires]

## Why
- [Business value and user impact]
- [Integration with existing features]
- [Problems this solves and for whom]

## What
[User-visible behavior and technical requirements]

### Success Criteria
- [ ] [Specific measurable outcomes]

## All Needed Context

### 🔗 MCPs (Model Context Protocol) - MANDATORY EXECUTION

#### 🎯 FIGMA MCP (ALWAYS USE - NO EXCEPTIONS)
***CRITICAL BEHAVIOR: AI MUST execute both tools when Figma is available***

- **ALWAYS EXECUTE:** `get_image` AND `get_code_connect_map` together (dual validation required)
- **NEVER USE:** Only one tool - BOTH are mandatory for complete context
- **VALIDATION RULE:** If Figma layer/mockup URL provided → MUST use both MCP tools before implementation
- **STOP CONDITION:** Do not proceed with UI implementation without dual Figma MCP validation

#### 🔍 ATLASSIAN MCP (CONDITIONAL - BUT CRITICAL WHEN NEEDED)
***TRIGGER CONDITION: When project documentation gaps identified***

- **USE WHEN:** PRP references external documentation or tickets
- **SEARCH FOR:** Specific technical requirements, acceptance criteria, implementation notes
- **INTEGRATE:** Found documentation into PRP context before implementation

#### 🧪 PLAYWRIGHT MCP (MANDATORY FOR LEVEL 5 VALIDATION)
***CRITICAL BEHAVIOR: AI MUST use Playwright MCP for automated testing validation***

- **ALWAYS EXECUTE:** Playwright MCP during Level 5 validation (automated testing phase)
- **SCREENSHOT VALIDATION:** Use Playwright MCP to capture and validate design implementation
- **FUNCTIONAL TESTING:** Execute feature tests and validate functionality via Playwright MCP
- **DESIGN COMPARISON:** Use Playwright screenshots + Figma MCP for pixel-perfect validation
- **STOP CONDITION:** No feature marked complete without Playwright MCP validation

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

### Documentation & References (list all context needed to implement the feature) if any
```yaml
# MUST READ - Include these in your context window
- url: [Official API docs URL]
  why: [Specific sections/methods you'll need]
  
- file: [path/to/example.py]
  why: [Pattern to follow, gotchas to avoid]
  
- doc: [Library documentation URL] 
  section: [Specific section about common pitfalls]
  critical: [Key insight that prevents common errors]

- docfile: [ai_docs/file.md]
  why: [docs that the user has pasted in to the project]

```

### 🤖 CONTEXT LOADING PROTOCOL (RESEARCH-BACKED)
***PREVENT CONTEXT FAILURES: Load ONLY what PRP specifies***

**MANDATORY LOADING (ALWAYS):**
- `code_patterns/` - Only sections relevant to current task

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

### Data models and structure

Create the core data models, we ensure type safety and consistency.

### list of tasks to be completed to fullfill the PRP in the order they should be completed

```yaml
Task 1:
MODIFY [file 1]:
  - FIND pattern: "class OldImplementation"
  - ADD action "newAction" or "newFunction"
  - PRESERVE existing method signatures

CREATE [file 2]:
  - MIRROR pattern from: site/models/SomeClass.php
  - MODIFY class name and core logic
  - KEEP error handling pattern identical

...(...)

Task N:
...

```

### Per task pseudocode as needed added to each task
- Make sure to provide each file creation content

### Integration Points
```yaml
DATABASE:
  - migration: "Add column 'feature_enabled' to users table"
  - index: "CREATE INDEX idx_feature_lookup ON users(feature_id)"
  
CONFIG:
  - add to: config/common.php or config/main.php
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
# AI MUST read: development/qa_automated_tests-prp.md
# Expected: All feature tests pass, design screenshots match Figma
```
**STOP CONDITION:** No feature marked complete without automated test validation

## ✅ FINAL VALIDATION CHECKLIST (COMPREHENSIVE)

### Context Management Validation:
- [ ] **Context Loaded Correctly:** Only relevant PRP modules loaded (no context confusion)
- [ ] **Patterns Followed:** Implementation matches `code_patterns/` standards exactly
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