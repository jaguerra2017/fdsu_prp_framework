# Create PRP

## Feature file: $ARGUMENTS

Generate a complete PRP for general feature implementation with thorough research. Ensure context is passed to the AI agent to enable self-validation and iterative refinement. 

## 🔴 PRE-FLIGHT CHECKLIST (EXECUTE IN ORDER)
1. ☐ Read the feature file FIRST
2. ☐ Check for MCP URLs (Jira/Figma) in the PRD
3. ☐ If MCPs exist → GATHER DATA via MCP tools IMMEDIATELY
4. ☐ Only proceed to codebase research AFTER MCP data is gathered

The AI agent only gets the context you are appending to the PRP and training data. Assuma the AI agent has access to the codebase and the same knowledge cutoff as you, so its important that your research findings are included or referenced in the PRP. The Agent has Websearch capabilities, so pass urls to documentation and examples.

**CRITICAL:** Using `$CODEBASE_PATH` environment variable as the referenced code path

## Research Process

### 🚨 MANDATORY STEP 1: MCP GATHERING (DO NOT SKIP)
**CRITICAL: This step MUST be completed BEFORE any other research**
**CHECK THE PRD FOR MCP URLS AND EXECUTE:**

1. **MCP Gathering (REQUIRED - EXECUTE IMMEDIATELY)**
   - ✅ **JIRA TICKET**: If PRD contains Jira URL → MUST connect through Atlassian MCP
   - ✅ **FIGMA DESIGN**: If PRD contains Figma URL → MUST connect through Figma MCP  
   - ✅ **GATHER ALL INFO**: Extract requirements, acceptance criteria, design specs
   - ⚠️ **VALIDATION**: Confirm MCP data gathered before proceeding to Step 2
   
   **STOP HERE if MCPs are mentioned but not gathered - DO NOT CONTINUE**

2. **Codebase Analysis**
   - Search for similar features/patterns in the codebase
   - Identify files to reference in PRP
   - Note existing conventions to follow
   - Check test patterns for validation approach

3. **External Research**
   - Search for similar features/patterns online
   - Library documentation (include specific URLs)
   - Implementation examples (GitHub/StackOverflow/blogs)
   - Best practices and common pitfalls

4. **User Clarification** (if needed)
   - Specific patterns to mirror and where to find them?
   - Integration requirements and where to find them?
   - Clarifications because of gaps in requirenments
   - Ask for confirmation if you find any ambiguous code

## PRP Generation

Using `templates/prp_base.md` as template:

### Critical Context to Include and pass to the AI agent as part of the PRP
- **Documentation**: URLs with specific sections
- **Code Examples**: Real snippets from codebase
- **Gotchas**: Library quirks, version issues
- **Patterns**: Existing approaches to follow
- **Contexts used**: Always mention the files you've used for contexts

### Implementation Blueprint
- Start with pseudocode showing approach
- Reference real files for patterns
- Include error handling strategy
- List tasks to be completed to fullfill the PRP in the order they should be completed

*** CRITICAL AFTER YOU ARE DONE RESEARCHING AND EXPLORING THE CODEBASE BEFORE YOU START WRITING THE PRP ***

*** ULTRATHINK ABOUT THE PRP AND PLAN YOUR APPROACH THEN START WRITING THE PRP ***

## Output
Save as: `features/{feature-name}.md`

*** CRITICAL: VALIDATE CONTEXT SELECTION ***
Before writing PRP, ensure no context confusion, clash, or overload

## Output Quality (CONTEXT ENGINEERING VALIDATED)
- [ ] Context is selective and focused
- [ ] No conflicting patterns included  
- [ ] Clear context loading instructions for AI
- [ ] Research findings integrated without bloat
- [ ] PRP enables one-pass implementation

## MANDATORY
Score: Rate both implementation confidence AND context engineering quality

Remember: The goal is one-pass implementation success through comprehensive context.