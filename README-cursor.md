# PRP Framework for Cursor IDE

## Setup

```bash
# 1. Clone and open in Cursor
git clone https://github.com/jaguerra2017/fdsu_prp_framework.git
# Open fdsu_prp_framework/prps in Cursor

# 2. Set your codebase path
cp config.env.example config.env
# Edit config.env: CODEBASE_PATH=/path/to/your/codebase
source config.env
```

## How to Use

### Generate a PRP
**In Cursor Chat (Cmd/Ctrl + K):**
```
Apply @commands/generate-prp.md to create a PRP for [feature name] 
using codebase at $CODEBASE_PATH
```

### Execute a PRP  
**In Cursor Chat:**
```
Execute @features/[your-prp-file].md:
- Implement all requirements 
- Create files in $CODEBASE_PATH
- Follow patterns from @code_patterns/
```

### Research Patterns
**In Cursor Chat:**
```
Research [feature] patterns using:
- @code_patterns/ui-module-patterns.md 
- Files in $CODEBASE_PATH matching *[feature]*
Create analysis for new [feature] component.
```

### Implementation
**In Cursor Chat:**
```
Implement @features/[feature].md:
- Create files in $CODEBASE_PATH
- Follow @code_patterns/ 
- Include validation
```

That's it. Use Cursor's @ symbol to reference files and $CODEBASE_PATH for your code.

## MCP Integration (Optional)

Cursor has native MCP support with its own configuration:

### Setup MCP in Cursor
Create `~/.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "Figma": {
      "url": "http://127.0.0.1:3845/mcp"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    },
    "mcp-atlassian": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "CONFLUENCE_URL",
        "-e", "CONFLUENCE_USERNAME", 
        "-e", "CONFLUENCE_API_TOKEN",
        "-e", "JIRA_URL",
        "-e", "JIRA_USERNAME",
        "-e", "JIRA_API_TOKEN",
        "ghcr.io/sooperset/mcp-atlassian:latest"
      ],
      "env": {
        "CONFLUENCE_URL": "https://yourcompany.atlassian.net/wiki",
        "CONFLUENCE_USERNAME": "your.email@company.com",
        "CONFLUENCE_API_TOKEN": "your-api-token",
        "JIRA_URL": "https://yourcompany.atlassian.net/",
        "JIRA_USERNAME": "your.email@company.com",
        "JIRA_API_TOKEN": "your-api-token"
      }
    }
  }
}
```

### Use MCP in Cursor Chat
```
"Using Figma MCP, get design specs from [figma-url] and create PRP for [feature]"

"Using Atlassian MCP, analyze JIRA ticket PRE-1747 and generate implementation plan"

"Using Playwright MCP, test the implemented feature and generate validation report"
```

Restart Cursor after adding MCP configuration.
