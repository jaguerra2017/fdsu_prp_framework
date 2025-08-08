name: "Base PRP Template v3 - Context-Rich with Validation Loops"
description: |

## Main Concept
This is a **PRP (Product Requirement Prompt)** template. The core concept: **"PRP = PRD (Product Requirement Document) + curated codebase intelligence + agent/runbook"** - designed to enable AI agents to ship production-ready code on the first pass.

## Purpose
Template optimized for AI agents to implement features with sufficient context and self-validation capabilities to achieve working code through iterative refinement.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance
5. **Integration analysis**: Always be cautious by reviewing possible integrations with existing modules
6. **Global rules**: Always take into account First Due patterns for coding

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

### MCPs (Model Context Protocol)
- If available always check for Figma MCP to get all data of selected layer or provided mockup URLs **(Important to use both tools get_code_connect_map and get_image if available)**
- If available use mcp-atlasian to search for existing project documentations

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

### Code Patterns
- **CRITICAL to use `code_patterns` as context since contains required code patterns, standards and implementation guidance**

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

## Validation Loop
- Make sure to understand `tmp/README.md` to perform all required tests after coding using `tmp/test-automation.sh`

### ALWAYS RUN VALIDATION SCRIPT UNTIL ALL PASSED AFTER EVERY FINISHED LOOP OF CODE MODIFICATION

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
### Level 5
### IMPLEMENT AUTOMATED TESTS USING `development/qa_automated_tests-prp.md` TO VALIDATE IN WEBSITE

## Final validation Checklist
- [ ] No linting errors
- [ ] No type errors
- [ ] Manual test successful: [specific curl/command]
- [ ] Error cases handled gracefully
- [ ] Logs are informative but not verbose
- [ ] Documentation updated if needed
- [ ] Include all necessary to see the code working (url, steps, etc)

---

## Anti-Patterns to Avoid
- ❌ Don't create new patterns when existing ones work
- ❌ Don't skip validation because "it should work"  
- ❌ Don't ignore failing tests - fix them
- ❌ Don't use sync functions in async context
- ❌ Don't hardcode values that should be config
- ❌ Don't catch all exceptions - be specific