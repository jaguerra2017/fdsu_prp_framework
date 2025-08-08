# PRP Framework - Product Requirement Prompts for AI-Driven Development

[![GitHub](https://img.shields.io/badge/GitHub-jaguerra2017%2Ffdsu__prp__framework-blue)](https://github.com/jaguerra2017/fdsu_prp_framework)
[![License](https://img.shields.io/badge/License-Private-red)]()

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
└── 🔗 codebase/          # FDSU codebase (git submodule)
```

## 🚀 **Quick Start**

### Prerequisites
- Git with submodule support
- Node.js and npm (for development)
- Access to FDSU codebase (private repository)

### Installation
```bash
# Clone the repository
git clone https://github.com/jaguerra2017/fdsu_prp_framework.git
cd fdsu_prp_framework/prps

# Initialize and update submodules
git submodule init
git submodule update

# Verify setup
ls -la codebase/  # Should show FDSU codebase files
```

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

## 🔗 **Integration with FDSU Codebase**

The framework integrates with the FDSU codebase through:
- **Git Submodule**: `codebase/` contains the complete FDSU repository
- **Pattern References**: All documentation points to actual FDSU files
- **Live Examples**: Real implementations from the production codebase
- **Validation**: Tests run against actual FDSU structure

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
- **Figma MCP**: Design integration and code connect mapping
- **Atlassian MCP**: Jira ticket integration and context gathering
- **Playwright MCP**: Automated testing and validation

### Context Engineering
- Selective context loading to prevent overload
- Curated codebase intelligence
- Research-backed validation approaches

## 🔄 **Git Workflow**

### Submodule Management
```bash
# Update FDSU codebase
git submodule update --remote codebase

# Pull latest PRP framework changes
git pull origin main
git submodule update --init --recursive
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

## 🔒 **Security & Privacy**

- **Private Repository**: Contains proprietary FDSU patterns
- **Submodule Access**: Requires FDSU codebase permissions
- **Git Ignore**: `.claude/` folder excluded from version control
- **Access Control**: Team-based development workflow

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

**Built for First Due by the Development Team**  
*Enabling AI-driven development with comprehensive context and validation*
