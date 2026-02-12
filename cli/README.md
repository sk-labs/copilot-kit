# @sk-labs/copilot-kit

CLI tool to install Custom Agents, Skills & Prompt Workflows for GitHub Copilot in VS Code.

## Installation

### Quick Use (npx)

```bash
npx @sk-labs/copilot-kit init
```

### Global Install

```bash
npm install -g @sk-labs/copilot-kit
copilot-kit init
```

## Commands

### `copilot-kit init`

Install .github structure into your project.

**Options:**
- `-f, --force` - Overwrite existing .github folder
- `-p, --path <path>` - Install in specific directory (default: current directory)
- `-b, --branch <branch>` - Use specific branch (default: main)
- `-q, --quiet` - Suppress output (for CI/CD)
- `--dry-run` - Preview actions without executing

**Examples:**
```bash
copilot-kit init
copilot-kit init --force
copilot-kit init --path ./my-project
copilot-kit init --branch dev
copilot-kit init --dry-run
```

### `copilot-kit update`

Update to the latest version.

**Options:**
- `-p, --path <path>` - Project directory (default: current directory)
- `-q, --quiet` - Suppress output

**Examples:**
```bash
copilot-kit update
copilot-kit update --path ./my-project
```

### `copilot-kit status`

Check installation status and verify structure.

**Options:**
- `-p, --path <path>` - Project directory (default: current directory)

**Example:**
```bash
copilot-kit status
```

## What Gets Installed

```
.github/
├── agents/              # 20 custom agents (.agent.md)
├── skills/              # 37 domain skills (SKILL.md)
├── prompts/             # 11 slash commands (.prompt.md)
├── instructions/        # Path-specific rules
├── copilot-instructions.md  # Global behavior
└── AGENTS.md           # Architecture docs
```

## Requirements

- Node.js 16.0 or later
- VS Code with GitHub Copilot extension

## Repository

https://github.com/sk-labs/copilot-kit

## License

MIT © sk-labs
