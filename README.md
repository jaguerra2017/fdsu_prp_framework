# PRP Framework - Product Requirement Prompts for AI-Driven Development

[![GitHub](https://img.shields.io/badge/GitHub-jaguerra2017%2Ffdsu__prp__framework-blue)](https://github.com/jaguerra2017/fdsu_prp_framework)
[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)
[![Inspired by](https://img.shields.io/badge/Inspired%20by-Wirasm%2FPRPs--agentic--eng-orange)](https://github.com/Wirasm/PRPs-agentic-eng)

> **PRP = PRD (Product Requirement Document) + Curated Codebase Intelligence + Agent Runbook**

A comprehensive framework designed to enable AI agents to ship production-ready code on the first pass through context-rich prompts and validation loops.

## 🤖 **Choose Your AI Tool**

The PRP Framework works with AI coding tools that can understand context and execute commands. Choose your preferred setup:

| AI Tool | Best For | Setup Guide | Key Features |
|---------|----------|-------------|--------------|
| **🔮 Claude CLI** | Maximum features & MCP integration | **[📖 README-claude.md](README-claude.md)** | Real-time design/ticket access, automated testing |
| **🎯 Cursor IDE** | Integrated development experience | **[📖 README-cursor.md](README-cursor.md)** | Built-in Claude, file editing, MCP support |

> **💡 Quick Start**: Click on your preferred AI tool's setup guide above to get started immediately!

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
├── 📖 README-claude.md    # Claude CLI setup guide
├── 📖 README-cursor.md    # Cursor IDE setup guide
├── .claude/               # Claude Code commands (git-ignored)
└── config.env.example    # Environment configuration template
```

## 🚀 **Quick Start**

### Choose Your Setup Path

**For the fastest setup**, choose your preferred AI tool and follow its specific guide:

- **🔮 Claude CLI Users**: Follow **[README-claude.md](README-claude.md)** for full MCP integration
- **🎯 Cursor IDE Users**: Follow **[README-cursor.md](README-cursor.md)** for integrated development with MCP support

### Universal Setup (All Tools)

```bash
# 1. Clone the repository
git clone https://github.com/jaguerra2017/fdsu_prp_framework.git
cd fdsu_prp_framework/prps

# 2. Configure your codebase path
cp config.env.example config.env
# Edit config.env and set CODEBASE_PATH=/path/to/your/codebase

# 3. Load environment and verify setup
source config.env
ls -la $CODEBASE_PATH  # Should show your codebase files

# 4. Follow your AI tool's specific setup guide for advanced features
```

## 📝 **How Each Tool Works**

### **Claude CLI**
```bash
claude
> "Apply commands/generate-prp.md to create a PRP for [feature]"
```

### **Cursor IDE** 
```
In Cursor Chat (Cmd/Ctrl + K):
"Apply @commands/generate-prp.md to create a PRP for [feature] using $CODEBASE_PATH"
```

That's it! For advanced features like Figma/JIRA integration, see **[README-claude.md](README-claude.md)**.

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

## 🤖 **AI Tool Comparison**

### **Feature Matrix**

| Feature | Claude CLI | Cursor IDE |
|---------|------------|------------|
| **Setup Complexity** | Medium | Easy |
| **MCP Integration** | ✅ Full | ✅ Available |
| **File Editing** | ✅ Yes | ✅ Native |
| **Command Execution** | ✅ Yes | ✅ Terminal |
| **Real-time Design Access** | ✅ Figma MCP | ✅ Figma MCP |
| **JIRA Integration** | ✅ Atlassian MCP | ✅ Atlassian MCP |
| **Automated Testing** | ✅ Playwright MCP | ✅ Playwright MCP |
| **Context Awareness** | ✅ Excellent | ✅ Excellent |
| **IDE Integration** | ❌ CLI only | ✅ Native |

### **Recommended Use Cases**

- **🔮 Choose Claude CLI if**: You want maximum automation and don't mind CLI workflows
- **🎯 Choose Cursor IDE if**: You prefer integrated development environments with native IDE features

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

### **Setup Guides by AI Tool**
| Guide | Target Tool | Purpose | 
|-------|-------------|---------|
| `README-claude.md` | Claude CLI | Full MCP integration setup |
| `README-cursor.md` | Cursor IDE | Integrated development with MCP support |

### **Core Framework Documentation**
| Document | Purpose | Lines | 
|----------|---------|-------|
| `templates/prp_base.md` | Main PRP template | 203 |
| `code_patterns/ui-module-patterns.md` | Vue 2 UI patterns | 717 |
| `commands/create-base-prp-parallel.md` | Parallel research | 206 |
| `development/onboarding.md` | Developer onboarding | 93 |

---

## 📄 **License**

MIT License - see [LICENSE](LICENSE) file for details.

**Attribution**: This framework is inspired by [@Wirasm's PRPs-agentic-eng](https://github.com/Wirasm/PRPs-agentic-eng) and builds upon their foundational PRP methodology.

---

**Built for First Due by the Development Team**  
*Enabling AI-driven development with comprehensive context and validation*

**Original PRP Methodology**: [@Wirasm](https://github.com/Wirasm) - [PRPs-agentic-eng](https://github.com/Wirasm/PRPs-agentic-eng)
