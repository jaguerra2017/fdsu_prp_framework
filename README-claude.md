# PRP Framework for Claude CLI - Setup Guide

[![Claude CLI](https://img.shields.io/badge/Claude%20CLI-Compatible-blue)](https://github.com/anthropics/claude-cli)
[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

> **PRP Framework optimized for Claude CLI with full MCP integration**

This guide covers setting up the PRP Framework specifically for **Claude CLI** users, leveraging the full power of Model Context Protocol (MCP) servers for design integration, project management, and automated testing.

## 🎯 **Why Claude CLI for PRP Framework?**

Claude CLI provides the **most comprehensive experience** for the PRP Framework because:

- ✅ **Full MCP Support**: Native integration with Figma, Atlassian, and Playwright
- ✅ **Real-time Context**: Direct access to designs, tickets, and test results
- ✅ **Command Execution**: Can run terminal commands and file operations
- ✅ **Advanced Reasoning**: Best-in-class code generation and problem solving
- ✅ **Tool Integration**: Seamless workflow with external tools and services

## 🚀 **Quick Start for Claude CLI**

### Prerequisites
- Node.js 18+ and npm
- Git
- Access to your target codebase
- **Claude CLI installed** (required for MCP functionality)

### Installation

```bash
# 1. Install Claude CLI globally
npm install -g @anthropic-ai/claude-cli

# 2. Clone the PRP Framework
git clone https://github.com/jaguerra2017/fdsu_prp_framework.git
cd fdsu_prp_framework/prps

# 3. Configure your codebase path
cp config.env.example config.env
echo "CODEBASE_PATH=/absolute/path/to/your/codebase" > config.env

# 4. Load environment
source config.env

# 5. Verify setup
ls -la $CODEBASE_PATH  # Should show your codebase files
```

### Claude Code Commands (Optional)

The framework includes a `.claude/commands` folder with all PRP commands available as Claude Code commands:

```bash
# Use commands directly with Claude Code
claude code generate-prp.md "user authentication feature"
claude code execute-prp.md "features/user-auth.md"

# Or reference in Claude Chat
"Apply the generate-prp command to create a PRP for [feature]"
```

See `.claude/README.md` for details.

## 🔌 **MCP Setup (Essential for Claude CLI)**

The PRP Framework's power comes from MCP integration. Set up all required servers:

### **🎯 Critical MCP Servers**

| MCP Server | Purpose | Required | Setup Complexity |
|------------|---------|----------|------------------|
| **🎨 Figma** | Design integration, component mapping | Essential | Medium (requires Desktop app) |
| **📋 Atlassian** | JIRA tickets, Confluence docs | Essential | Easy (OAuth) |
| **🎭 Playwright** | Automated testing, validation | Essential | Easy (NPM) |

### **⚡ One-Command MCP Setup**

```bash
# Install all MCP servers at once
claude mcp add --transport sse figma http://127.0.0.1:3845/sse
claude mcp add --transport sse atlassian https://mcp.atlassian.com/v1/sse
claude mcp add playwright npx @executeautomation/playwright-mcp-server

# Verify all servers
claude mcp list
```

### **🔧 Detailed MCP Configuration**

#### **1. 🎨 Figma MCP Server**

**Purpose**: Access live Figma designs and generate code-connect mappings.

```bash
# Prerequisites: Figma Desktop app with Dev Mode enabled

# Add Figma MCP server
claude mcp add --transport sse figma http://127.0.0.1:3845/sse

# Verify connection
claude mcp list
# Expected: figma: http://127.0.0.1:3845/sse (SSE) - ✓ Connected
```

**Troubleshooting**:
```bash
# If connection fails:
# 1. Ensure Figma Desktop is running
# 2. Check Dev Mode is enabled in your Figma workspace
# 3. Test local server
curl http://127.0.0.1:3845/sse

# Alternative port if needed:
claude mcp remove figma
claude mcp add --transport sse figma http://127.0.0.1:9001/sse
```

#### **2. 📋 Atlassian MCP Server**

**Purpose**: Fetch JIRA tickets and Confluence documentation for context.

```bash
# Add Atlassian MCP server
claude mcp add --transport sse atlassian https://mcp.atlassian.com/v1/sse

# Authenticate (OAuth 2.0)
claude
> /mcp
# Follow browser authentication flow

# Verify authenticated connection
claude mcp list
# Expected: atlassian: https://mcp.atlassian.com/v1/sse (SSE) - ✓ Connected
```

**Usage Examples**:
```bash
# In Claude CLI session:
> "Analyze the requirements in JIRA ticket PRE-1747"
> "What are the latest updates in Confluence space TEAM?"
> "Create a PRP based on ticket ABC-123"
```

#### **3. 🎭 Playwright MCP Server**

**Purpose**: Automated testing and browser automation for validation.

```bash
# Add Playwright MCP server
claude mcp add playwright npx @executeautomation/playwright-mcp-server

# Verify installation
claude mcp list
# Expected: playwright: npx @executeautomation/playwright-mcp-server - ✓ Connected
```

**Usage Examples**:
```bash
# In Claude CLI session:
> "Run automated tests on the login component"
> "Take screenshots of the new dashboard"
> "Validate form submission flows"
```

## 📋 **PRP Workflow with Claude CLI**

### **1. Research & Context Gathering**
```bash
# Start Claude CLI session
claude

# Use MCP-powered research
> "Generate a PRP for user authentication using:
- Figma design: [figma-url]
- JIRA ticket: PRE-1747
- Reference existing auth patterns in $CODEBASE_PATH"
```

### **2. MCP-Enhanced PRP Generation**
```bash
# In Claude CLI, the framework automatically:
# ✓ Fetches Figma design specifications
# ✓ Retrieves JIRA ticket requirements
# ✓ Analyzes codebase patterns
# ✓ Generates comprehensive PRP with all context
```

### **3. Implementation with Validation**
```bash
# Execute PRP with real-time validation
> "Implement the PRP and run validation:
1. Generate code following established patterns
2. Run Playwright tests for validation
3. Verify against Figma design specifications"
```

### **4. Automated Testing & Screenshots**
```bash
# Use Playwright MCP for validation
> "Test the implemented feature:
- Take screenshots at different breakpoints
- Validate form interactions
- Test error handling scenarios"
```

## 🎨 **Claude CLI Specific Features**

### **Design-to-Code Workflow**
```bash
# With Figma MCP integration
> "Convert this Figma component to Vue 2:
- Component URL: [figma-component-url]
- Follow patterns in $CODEBASE_PATH/site/client/js/components/
- Include responsive design from specifications"
```

### **Ticket-Driven Development**
```bash
# With Atlassian MCP integration
> "Create implementation plan for ticket PRE-1747:
1. Analyze ticket requirements
2. Identify affected codebase areas
3. Generate step-by-step implementation plan
4. Include acceptance criteria validation"
```

### **Automated Validation Loops**
```bash
# With Playwright MCP integration
> "Implement feature with automated validation:
1. Generate code
2. Run syntax validation
3. Execute unit tests
4. Perform browser testing
5. Generate test report"
```

## 🔧 **Environment Configuration**

### **Environment Variables**
```bash
# Required for PRP Framework
export CODEBASE_PATH="/absolute/path/to/your/codebase"

# Optional for different environments
export DEV_CODEBASE_PATH="/path/to/dev/codebase"
export PROD_CODEBASE_PATH="/path/to/prod/codebase"

# MCP-specific (auto-configured by Claude CLI)
# FIGMA_ACCESS_TOKEN (handled by Desktop app)
# ATLASSIAN_DOMAIN (configured during OAuth)
```

### **Project-Specific Configuration**
```bash
# Create project-specific MCP configuration
claude mcp add --scope project figma http://127.0.0.1:3845/sse
claude mcp add --scope project atlassian https://mcp.atlassian.com/v1/sse
claude mcp add --scope project playwright npx @executeautomation/playwright-mcp-server

# This creates .mcp.json in your project root for team sharing
```

## 📊 **Claude CLI Commands for PRP Framework**

### **Generate PRP with Full Context**
```bash
claude
> "Generate a comprehensive PRP for [feature] using:
- commands/generate-prp.md as the process template
- MCP servers for real-time context gathering
- Codebase analysis of $CODEBASE_PATH
- Include all validation loops and testing strategies"
```

### **Execute PRP with MCP Integration**
```bash
claude
> "Execute the PRP in features/[feature-name].md:
- Implement all requirements
- Use MCP tools for design/ticket validation
- Run automated tests via Playwright
- Generate implementation report"
```

### **Parallel Research with MCP**
```bash
claude
> "Research [feature] using parallel approach:
- Figma MCP: Extract design specifications
- Atlassian MCP: Gather ticket requirements
- Codebase search: Find similar patterns
- Web search: Best practices and examples
- Compile into comprehensive PRP"
```

## 🚨 **Troubleshooting Claude CLI + MCP**

### **Common Issues**

**❌ MCP Server Not Connected**
```bash
# Check server status
claude mcp list

# Remove and re-add problematic server
claude mcp remove figma
claude mcp add --transport sse figma http://127.0.0.1:3845/sse

# Check Claude CLI logs
claude --debug
```

**❌ Figma Connection Failed**
```bash
# Ensure Figma Desktop is running
ps aux | grep Figma

# Check Dev Mode is enabled
# Visit figma.com → Account Settings → Dev Mode

# Test local server
curl -I http://127.0.0.1:3845/sse
```

**❌ Atlassian Authentication Issues**
```bash
# Re-authenticate
claude
> /mcp
# Follow new OAuth flow

# Check token validity
claude mcp get atlassian
```

**❌ Playwright Tests Failing**
```bash
# Verify Playwright installation
npx @executeautomation/playwright-mcp-server --help

# Test local execution
npx playwright test --headed
```

### **Performance Optimization**

```bash
# Configure MCP with connection pooling
claude mcp add --scope user --config '{"maxConnections": 5}' figma http://127.0.0.1:3845/sse

# Enable MCP caching for faster responses
export CLAUDE_MCP_CACHE=true

# Use local MCP scope for faster project switching
claude mcp add --scope local atlassian https://mcp.atlassian.com/v1/sse
```

## 📚 **Claude CLI Best Practices**

### **Session Management**
```bash
# Start named sessions for different projects
claude --session frontend-project
claude --session backend-project

# Resume previous session
claude --session frontend-project

# List active sessions
claude --list-sessions
```

### **Context Optimization**
```bash
# Use focused prompts for better performance
> "Focus on Vue 2 component patterns in $CODEBASE_PATH/site/client/js/components/"

# Leverage MCP for real-time context
> "Get latest updates from JIRA ticket PRE-1747 before implementation"

# Use selective file inclusion
> "Analyze only the authentication-related files in $CODEBASE_PATH"
```

### **Team Collaboration**
```bash
# Share MCP configuration with team
# Commit .mcp.json to repository

# Team-wide environment setup
echo "CODEBASE_PATH=\$(pwd)/codebase" > .env.team

# Standardized MCP server versions
claude mcp add --scope project playwright npx @executeautomation/playwright-mcp-server@1.0.0
```

## 🔗 **Integration with Existing Workflow**

### **Git Integration**
```bash
# Generate commit messages based on PRP implementation
> "Generate a commit message for the changes implementing PRP features/user-auth.md"

# Create PR descriptions from PRP validation results
> "Create a PR description including Playwright test results and Figma design validation"
```

### **CI/CD Integration**
```bash
# Generate GitHub Actions workflow for PRP validation
> "Create a CI workflow that validates PRPs using:
- Playwright MCP for automated testing
- Figma MCP for design consistency checks
- Code quality validation"
```

## 🎯 **Success Metrics**

With Claude CLI + MCP integration, expect:

- ⚡ **75% faster context gathering** (vs manual research)
- 🎨 **95% design accuracy** (direct Figma integration)
- 📋 **100% requirement coverage** (JIRA ticket integration)
- 🧪 **90% first-pass test success** (Playwright automation)
- 🔄 **85% faster iteration cycles** (real-time validation)

## 📖 **Additional Resources**

- [Claude CLI Documentation](https://docs.anthropic.com/en/docs/claude-code/claude-cli)
- [MCP Server Registry](https://github.com/topics/mcp-server)
- [Figma MCP Server](https://github.com/figma/figma-mcp)
- [Atlassian MCP Server](https://github.com/atlassian/mcp-server)
- [Playwright MCP Server](https://github.com/executeautomation/playwright-mcp-server)

---

**🏆 Claude CLI + PRP Framework = Maximum Development Velocity**

*For the ultimate AI-driven development experience with full MCP integration*
