# Create PRP

## Feature file: $ARGUMENTS

Generate a complete PRP for general feature implementation with thorough research. Ensure context is passed to the AI agent to enable self-validation and iterative refinement. Read the feature file first to understand what needs to be created, how the examples provided help, and any other considerations.

The AI agent only gets the context you are appending to the PRP and training data. Assuma the AI agent has access to the codebase and the same knowledge cutoff as you, so its important that your research findings are included or referenced in the PRP. The Agent has Websearch capabilities, so pass urls to documentation and examples.

## Research Process
1. **MCP Gathering**
   - If provided figma design URLs then connect trough available Figma MCP to get image and code connect map
   - If provided jira ticket URL then connect trough Attlassian MCP and gather all info for the task

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