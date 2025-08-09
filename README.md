# PRP Framework - Product Requirement Prompts for AI-Driven Development

[![GitHub](https://img.shields.io/badge/GitHub-jaguerra2017%2Ffdsu__prp__framework-blue)](https://github.com/jaguerra2017/fdsu_prp_framework)
[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)
[![Inspired by](https://img.shields.io/badge/Inspired%20by-Wirasm%2FPRPs--agentic--eng-orange)](https://github.com/Wirasm/PRPs-agentic-eng)

> **PRP = PRD (Product Requirement Document) + Curated Codebase Intelligence + Agent Runbook**

A comprehensive framework designed to enable AI agents to ship production-ready code on the first pass through context-rich prompts and validation loops.

## 🎯 **Core Concept**

The PRP Framework transforms traditional development workflows by providing AI agents with:
- **Complete Context**: All necessary documentation, patterns, and examples
- **Validation Loops**: Executable tests and quality gates
- **Codebase Intelligence**: Curated patterns and established conventions
- **Progressive Success**: Start simple, validate, then enhance

## 📁 **Project Structure**

```
prps/
├── 📋 commands/           # PRP generation and execution commands
├── 🎨 code_patterns/      # Development standards and UI patterns
├── 🔧 development/        # Development tools and onboarding
├── 📚 examples/           # Real-world PRP examples
├── ⭐ features/           # Feature implementation PRPs
├── 📝 prds/              # Product Requirement Documents
├── 📄 templates/          # Base PRP templates
└── config.env.example    # Environment configuration template
```

## 🚀 **Quick Start**

### Prerequisites
- Git
- Node.js and npm (for development)
- **Claude CLI** installed (`npm install -g @anthropic-ai/claude-cli`)
- Access to target codebase (any repository you want to analyze)
- **Required MCP Servers** (see MCP Setup below)

### Installation
```bash
# Clone the repository
git clone https://github.com/jaguerra2017/fdsu_prp_framework.git
cd fdsu_prp_framework/prps

# Configure your codebase path
cp config.env.example config.env
# Edit config.env and set CODEBASE_PATH=/path/to/your/codebase

# Load environment and verify setup
source config.env
ls -la $CODEBASE_PATH  # Should show your codebase files
```

## 🔌 **MCP Setup (Required)**

The PRP Framework relies on **Model Context Protocol (MCP)** servers for critical functionality. These servers enable Claude to interact with external tools and services directly.

### **🎯 Critical MCP Servers**

The following MCP servers are **essential** for the PRP Framework:

| MCP Server | Purpose | Status Check | Authentication |
|------------|---------|--------------|----------------|
| **🎨 Figma** | Design integration, component mapping | Local server required | Desktop app + Dev Mode |
| **📋 Atlassian** | JIRA tickets, Confluence docs | Cloud service | OAuth 2.0 |
| **🎭 Playwright** | Automated testing, validation | NPM package | None required |

### **⚡ Quick MCP Setup**

Run these commands in your terminal to set up all required MCP servers:

```bash
# 1. Install Claude CLI (if not already installed)
npm install -g @anthropic-ai/claude-cli

# 2. Add Figma MCP Server (requires Figma Desktop with Dev Mode)
claude mcp add --transport sse figma http://127.0.0.1:3845/sse

# 3. Add Atlassian MCP Server (for JIRA/Confluence integration)
claude mcp add --transport sse atlassian https://mcp.atlassian.com/v1/sse

# 4. Add Playwright MCP Server (for automated testing)
claude mcp add playwright npx @executeautomation/playwright-mcp-server

# 5. Verify all servers are configured
claude mcp list
```

### **🔧 Detailed Setup Instructions**

#### **1. 🎨 Figma MCP Server**

**Purpose**: Access Figma designs, extract components, and generate code-connect mappings.

**Prerequisites**:
- Figma Desktop app installed
- Dev Mode enabled in your Figma account
- Local Figma MCP server running

**Setup Steps**:
```bash
# Add Figma MCP server
claude mcp add --transport sse figma http://127.0.0.1:3845/sse

# Verify connection (should show ✓ Connected)
claude mcp list
```

**Expected Status**: `✓ Connected` (if Figma Desktop is running with Dev Mode)

**Troubleshooting**:
- Ensure Figma Desktop app is running
- Check that Dev Mode is enabled in your Figma workspace
- Verify the local server is accessible at port 3845

#### **2. 📋 Atlassian MCP Server**

**Purpose**: Access JIRA tickets, Confluence documentation for context gathering.

**Prerequisites**:
- Atlassian Cloud account (firstduedev.atlassian.net)
- Valid Atlassian credentials

**Setup Steps**:
```bash
# Add Atlassian MCP server using official SSE transport
claude mcp add --transport sse atlassian https://mcp.atlassian.com/v1/sse

# Check status (should show ⚠ Needs authentication)
claude mcp list
```

**Authentication** (OAuth 2.0):
```bash
# Start Claude CLI and authenticate
claude

# In Claude CLI, run the MCP authentication command
> /mcp

# Follow the browser prompts to login to your Atlassian account
# After successful authentication, server status will show ✓ Connected
```

**Expected Status**: `✓ Connected` (after OAuth authentication)

**Usage Examples**:
```bash
# In Claude CLI, you can now ask:
> "Analyze the requirements in JIRA ticket PRE-1747"
> "What are the latest updates in Confluence page XYZ?"
> "Create a summary of all open tickets assigned to me"
```

#### **3. 🎭 Playwright MCP Server**

**Purpose**: Automated testing, browser automation, validation scripts.

**Prerequisites**:
- Node.js and npm installed

**Setup Steps**:
```bash
# Add Playwright MCP server
claude mcp add playwright npx @executeautomation/playwright-mcp-server

# Verify installation
claude mcp list
```

**Expected Status**: `✓ Connected`

**Usage Examples**:
```bash
# In Claude CLI, you can now ask:
> "Run automated tests on the login flow"
> "Take screenshots of the dashboard for different screen sizes"
> "Validate form submissions and error handling"
```

### **📊 Verification Commands**

After setup, verify your MCP configuration:

```bash
# List all configured MCP servers
claude mcp list

# Expected output:
# playwright: npx @executeautomation/playwright-mcp-server - ✓ Connected
# figma: http://127.0.0.1:3845/sse (SSE) - ✓ Connected  
# atlassian: https://mcp.atlassian.com/v1/sse (SSE) - ✓ Connected

# Get details for a specific server
claude mcp get atlassian

# Test MCP functionality in Claude CLI
claude
> /mcp  # Shows MCP server status and authentication options
```

### **🚨 Troubleshooting MCP Issues**

#### **Common Issues and Solutions**

**❌ Figma: "Failed to connect"**
```bash
# Solution: Ensure Figma Desktop is running and Dev Mode is enabled
# Check if the local server is accessible:
curl http://127.0.0.1:3845/sse

# If port is wrong, update the URL:
claude mcp remove figma
claude mcp add --transport sse figma http://127.0.0.1:3845/sse
```

**❌ Atlassian: "Needs authentication"**
```bash
# Solution: Complete OAuth authentication
claude
> /mcp
# Follow browser authentication flow
```

**❌ Playwright: "Failed to connect"**
```bash
# Solution: Reinstall the MCP server
claude mcp remove playwright
claude mcp add playwright npx @executeautomation/playwright-mcp-server

# Verify npm can access the package
npx @executeautomation/playwright-mcp-server --help
```

#### **MCP Server Management**

```bash
# Remove a problematic server
claude mcp remove <server-name>

# Add server with different scope (user/local/project)
claude mcp add --scope user <server-name> <command>

# Import from existing Claude Desktop configuration
claude mcp add-from-claude-desktop

# Add server with environment variables
claude mcp add myserver --env API_KEY=your-key -- npx some-package
```

### **🔧 Configuration Scopes**

MCP servers can be configured at different scopes:

| Scope | Description | Configuration File | Use Case |
|-------|-------------|-------------------|----------|
| **local** | Project-specific (default) | `.claude.json` | Personal dev environment |
| **project** | Team-shared | `.mcp.json` | Shared project configuration |
| **user** | Global for all projects | `~/.claude.json` | Personal tools across projects |

**Example with scopes**:
```bash
# Add to current project only (default)
claude mcp add --scope local figma http://127.0.0.1:3845/sse

# Add for entire team (committed to repo)
claude mcp add --scope project atlassian https://mcp.atlassian.com/v1/sse

# Add for personal use across all projects
claude mcp add --scope user playwright npx @executeautomation/playwright-mcp-server
```

### **📚 MCP Integration with PRP Commands**

Once MCP servers are configured, they integrate seamlessly with PRP commands:

**🎯 Figma Integration**:
- `/generate-prp` automatically connects to Figma designs
- Extracts component specifications and design tokens
- Generates code-connect mappings for Vue components

**📋 Atlassian Integration**:
- Fetches JIRA ticket details for context
- Accesses Confluence documentation
- Includes requirements and acceptance criteria in PRPs

**🎭 Playwright Integration**:
- Validates implemented features automatically
- Runs end-to-end tests as part of validation loops
- Generates test reports and screenshots

### **🔐 Security Considerations**

- **Authentication tokens** are stored securely by Claude CLI
- **Local servers** (Figma) only accessible on localhost
- **OAuth flows** use official provider authentication
- **Environment variables** keep sensitive data out of repositories

### **📖 Further Reading**

- [Official Claude MCP Documentation](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [MCP Server Directory](https://github.com/topics/mcp-server)
- [Building Custom MCP Servers](https://github.com/anthropics/mcp)

---

### Environment Configuration

The PRP Framework uses environment variables to specify the codebase path, making it flexible to work with any codebase.

#### Quick Setup

1. **Copy the configuration template:**
   ```bash
   cp config.env.example config.env
   ```

2. **Set your codebase path:**
   Edit `config.env` and set the `CODEBASE_PATH` variable:
   ```bash
   CODEBASE_PATH=/path/to/your/project/root
   ```

3. **Load environment variables:**
   ```bash
   # Option 1: Source the file before using PRP commands
   source config.env
   
   # Option 2: Export directly
   export CODEBASE_PATH="/path/to/your/project/root"
   
   # Option 3: Set for single command
   CODEBASE_PATH="/path/to/your/project/root" cursor apply commands/generate-prp.md
   ```

#### Environment Variables

- **`CODEBASE_PATH`** (required): Absolute path to the root of the codebase you want to analyze
- **`DEV_CODEBASE_PATH`** (optional): Alternative path for development environment
- **`PROD_CODEBASE_PATH`** (optional): Alternative path for production environment

#### Configuration Examples

```bash
# For a local project
export CODEBASE_PATH="/Users/username/projects/my-app"

# For a team shared codebase
export CODEBASE_PATH="/opt/shared/codebase"

# For different environments
export DEV_CODEBASE_PATH="/Users/username/projects/my-app-dev"
export PROD_CODEBASE_PATH="/opt/production/my-app"
```

#### Validation

To verify your setup:

```bash
# Check if environment variable is set
echo $CODEBASE_PATH

# Verify the path exists and contains expected files
ls -la $CODEBASE_PATH
```

#### Integration with Commands

All PRP commands will automatically use the `CODEBASE_PATH` environment variable:

- `commands/generate-prp.md` will search `$CODEBASE_PATH` instead of `codebase/`
- `commands/execute-prp.md` will write code to `$CODEBASE_PATH`
- Pattern analysis will reference files in `$CODEBASE_PATH`

#### Security Notes

- The `config.env` file is git-ignored to prevent accidentally committing sensitive paths
- Always use absolute paths for better reliability
- Ensure the path has appropriate read/write permissions for your use case

## 📋 **Core Components**

### 🎯 **Templates** (`templates/`)
Base templates for creating different types of PRPs:
- **`prp_base.md`** - Main PRP template with validation loops
- **`prp_base v1.md`** - Advanced template with MCP integration
- **`prp_planning.md`** - Planning and PRD template
- **`prp_base_original.md`** - Original template version

### ⚡ **Commands** (`commands/`)
Executable commands for PRP lifecycle management:
- **`generate-prp.md`** - Generate comprehensive PRPs with research
- **`create-base-prp-parallel.md`** - Parallel research for maximum context
- **`execute-prp.md`** - Execute and implement PRP features
- **`prp-planning-create.md`** - Transform ideas into comprehensive PRDs

### 🎨 **Code Patterns** (`code_patterns/`)
Established development standards and patterns:
- **`ui-module-patterns.md`** - Vue 2 UI development patterns (717 lines)
- **`frontend-code-standars.md`** - Frontend development standards
- **`php-code-standards.md`** - PHP development standards
- **`sql-code-standards.md`** - Database development standards

### 🔧 **Development** (`development/`)
Development tools and processes:
- **`onboarding.md`** - Comprehensive developer onboarding guide
- **`qa_automated_tests-prp.md`** - QA and testing strategies
- **`tests/`** - Test implementations and examples

### 📚 **Examples** (`examples/`)
Real-world PRP implementations:
- **`new-ui-structure-itm-report-prp.md`** - UI module development example
- **`rbac-migration-example.md`** - Permission system migration patterns

## 🔄 **PRP Workflow**

### 1. **Research & Context Gathering**
```bash
# Use parallel research for comprehensive context
# See: commands/create-base-prp-parallel.md
```

### 2. **PRP Generation**
```bash
# Generate feature PRP with full context
# See: commands/generate-prp.md
```

### 3. **Implementation**
```bash
# Execute PRP with validation loops
# See: commands/execute-prp.md
```

### 4. **Validation**
- **Level 1**: Syntax & Style validation
- **Level 2**: Unit tests execution
- **Level 3**: Integration tests
- **Level 4**: Asset optimization
- **Level 5**: Automated testing (Playwright MCP)

## 🎯 **Core Principles**

1. **🔑 CONTEXT IS KING**: Include ALL necessary documentation and examples
2. **🔄 VALIDATION LOOPS**: Provide executable tests AI can run and fix
3. **📊 INFORMATION DENSE**: Use established codebase keywords and patterns
4. **📈 PROGRESSIVE SUCCESS**: Start simple, validate, then enhance
5. **🔗 INTEGRATION ANALYSIS**: Review possible integrations with existing modules
6. **🌐 GLOBAL RULES**: Follow First Due coding patterns

## 🛠 **Technology Stack**

- **Frontend**: Vue 2, JavaScript ES6+, SCSS
- **Backend**: PHP (Yii Framework), MySQL
- **Testing**: Playwright, PHPUnit, Vitest
- **Build Tools**: Webpack, Babel
- **Version Control**: Git with submodules
- **AI Integration**: Claude, MCP tools (Figma, Atlassian)

## 📖 **Usage Examples**

### Creating a New Feature PRP
```bash
# 1. Use the generate-prp command
# Input: Feature requirements from PRD
# Output: Comprehensive PRP in features/

# 2. The PRP includes:
# - Complete context and documentation links
# - Codebase patterns to follow
# - Validation commands
# - Implementation blueprint
```

### Implementing UI Modules
```bash
# 1. Reference: code_patterns/ui-module-patterns.md
# 2. Follow Vue 2 patterns and conventions
# 3. Use established FDSU component library
# 4. Implement validation loops
```

## 🔗 **Integration with Target Codebase**

The framework integrates with any target codebase through:
- **Environment Variables**: `$CODEBASE_PATH` points to your codebase
- **Pattern References**: All documentation references actual project files
- **Live Examples**: Real implementations from the production codebase
- **Validation**: Tests run against actual project structure

## 🧪 **Quality Assurance**

### Validation Levels
- ✅ **Syntax & Style**: ESLint, PHP CodeSniffer
- ✅ **Unit Tests**: PHPUnit, Vitest
- ✅ **Integration Tests**: End-to-end testing
- ✅ **Asset Optimization**: Build validation
- ✅ **Automated Testing**: Playwright MCP integration

### Success Metrics
Each PRP is scored on:
- **Context Richness** (1-10)
- **Implementation Clarity** (1-10)
- **Validation Completeness** (1-10)
- **One-Pass Success Probability** (1-10)

Target: 8+ on all metrics

## 🤖 **AI Agent Integration**

### Supported MCPs (Model Context Protocol)
The PRP Framework requires the following MCP servers to be configured (see **[MCP Setup](#-mcp-setup-required)** section above):

- **🎨 Figma MCP**: Design integration and code connect mapping
- **📋 Atlassian MCP**: JIRA ticket integration and context gathering  
- **🎭 Playwright MCP**: Automated testing and validation

### Context Engineering
- **MCP-powered context**: Direct access to Figma designs, JIRA tickets, and test results
- **Selective context loading**: Prevents information overload while maintaining completeness
- **Curated codebase intelligence**: Leverages established patterns and conventions
- **Research-backed validation**: Uses MCP tools for automated verification loops

### Integration Benefits
- **Real-time design access**: Fetch latest Figma components and specifications
- **Ticket-driven development**: Automatically include JIRA requirements and acceptance criteria
- **Automated validation**: Run Playwright tests as part of the PRP validation process
- **Context synchronization**: Keep PRPs in sync with external tools and documentation

## 🔄 **Git Workflow**

### Environment Management
```bash
# Update codebase path
export CODEBASE_PATH=/path/to/your/updated/codebase

# Verify new path
echo $CODEBASE_PATH
ls -la $CODEBASE_PATH

# Update config file
echo "CODEBASE_PATH=$CODEBASE_PATH" > config.env

# Pull latest PRP framework changes
git pull origin main
```

### Development Workflow
1. Create feature PRPs in `features/`
2. Reference patterns from `code_patterns/`
3. Use templates from `templates/`
4. Execute with commands from `commands/`
5. Follow validation loops

## 📊 **Project Stats**

- **Templates**: 4 comprehensive templates
- **Commands**: 5 executable commands
- **Code Patterns**: 4 detailed pattern guides
- **Examples**: 2 real-world implementations
- **Features**: Active feature development
- **PRDs**: Product requirement documents

## 🙏 **Acknowledgments**

This PRP Framework is inspired by and builds upon the excellent work by **[@Wirasm](https://github.com/Wirasm)** in the [PRPs-agentic-eng](https://github.com/Wirasm/PRPs-agentic-eng) repository. The core PRP methodology and many foundational concepts originated from Wirasm's pioneering work in agentic engineering.

### Key Inspirations:
- **PRP Methodology**: Core concept of Product Requirement Prompts
- **Context Engineering**: Comprehensive context loading strategies  
- **Validation Loops**: Multi-level validation approach
- **Claude Integration**: Command structure and workflow patterns

**Original Creator**: [@Wirasm](https://github.com/Wirasm) - [PRPs-agentic-eng](https://github.com/Wirasm/PRPs-agentic-eng)  
**Support Original Work**: [Buy Wirasm a coffee](https://coff.ee/wirasm) ☕

## 🔒 **Security & Privacy**

- **Public Repository**: Open source with MIT license
- **Codebase Access**: Requires appropriate permissions to target codebase
- **Git Ignore**: `.claude/` folder excluded from version control  
- **Access Control**: Team-based development workflow for proprietary components

## 📞 **Support & Contributing**

### Getting Help
1. Check `development/onboarding.md` for setup issues
2. Review `examples/` for implementation patterns
3. Reference `code_patterns/` for development standards

### Contributing
1. Follow established PRP patterns
2. Update relevant documentation
3. Test with validation loops
4. Maintain codebase integration

## 📚 **Documentation Index**

| Document | Purpose | Lines | Last Updated |
|----------|---------|-------|--------------|
| `templates/prp_base.md` | Main PRP template | 203 | Latest |
| `code_patterns/ui-module-patterns.md` | Vue 2 UI patterns | 717 | Latest |
| `commands/create-base-prp-parallel.md` | Parallel research | 206 | Latest |
| `development/onboarding.md` | Developer onboarding | 93 | Latest |

---

## 📄 **License**

MIT License - see [LICENSE](LICENSE) file for details.

**Attribution**: This framework is inspired by [@Wirasm's PRPs-agentic-eng](https://github.com/Wirasm/PRPs-agentic-eng) and builds upon their foundational PRP methodology.

---

**Built for First Due by the Development Team**  
*Enabling AI-driven development with comprehensive context and validation*

**Original PRP Methodology**: [@Wirasm](https://github.com/Wirasm) - [PRPs-agentic-eng](https://github.com/Wirasm/PRPs-agentic-eng)
