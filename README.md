# Copilot Kit

> Custom Agents, Skills & Prompt Workflows for GitHub Copilot in VS Code

## Quick Install

```bash
npx @sk-labs/copilot-kit init
```

Or install globally:

```bash
npm install -g @sk-labs/copilot-kit
copilot-kit init
```

This installs agents, skills, and prompt files into your `.github/` directory — ready for GitHub Copilot in VS Code.

### Prerequisites
- **VS Code** with [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension
- **Node.js** 16.0 or later

## What's Included

| Component           | Count | Description                                                        |
| ------------------- | ----- | ------------------------------------------------------------------ |
| **Agents**          | 20    | Custom agent personas (`.agent.md` in `.github/agents/`)           |
| **Skills**          | 37    | Domain-specific knowledge modules (`SKILL.md` in `.github/skills/`) |
| **Prompt Workflows**| 11    | Slash command prompts (`.prompt.md` in `.github/prompts/`)         |

### Folder Structure

```
.github/
├── agents/                    # Custom Agents (.agent.md)
├── skills/                    # Agent Skills (SKILL.md per domain)
├── prompts/                   # Prompt Workflows (.prompt.md)
├── instructions/              # Path-specific instructions
├── copilot-instructions.md    # Global behavior rules
└── AGENTS.md                  # Cross-agent documentation
```

## Usage

### Using Agents

Invoke agents by name in Copilot Chat's agent mode:

```
@frontend-specialist Add JWT authentication
@debugger Fix the dark mode button
@security-auditor Review the auth flow
```

Each agent file supports YAML frontmatter with:
- `description` — Shown in Copilot Chat
- `tools` — Allowed VS Code tools (editFiles, codebase, terminal, fetch)
- `agents` — Sub-agents for delegation
- `handoffs` — Agents this agent can hand off to
- `model` — Preferred LLM model

### Using Prompt Workflows

Prompt files become slash commands in Copilot Chat:

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `/brainstorm`    | Explore options before implementation |
| `/create`        | Create new features or apps           |
| `/debug`         | Systematic debugging                  |
| `/deploy`        | Deploy application                    |
| `/enhance`       | Improve existing code                 |
| `/orchestrate`   | Multi-agent coordination              |
| `/plan`          | Create task breakdown                 |
| `/preview`       | Preview changes locally               |
| `/status`        | Check project status                  |
| `/test`          | Generate and run tests                |
| `/ui-ux-pro-max` | Design with 50 styles                 |

Example:

```
/brainstorm authentication system
/create landing page with hero section
/debug why login fails
```

### Using Skills

Skills are loaded progressively by agents based on task context. They follow the [agentskills.io](https://agentskills.io) open standard.

## CLI Tool

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `copilot-kit init`   | Install `.github/` structure into your project   |
| `copilot-kit update` | Update to the latest version                     |
| `copilot-kit status` | Check installation status                        |

### Options

```bash
copilot-kit init --force        # Overwrite existing .github folder
copilot-kit init --path ./myapp # Install in specific directory
copilot-kit init --branch dev   # Use specific branch
copilot-kit init --quiet        # Suppress output (for CI/CD)
copilot-kit init --dry-run      # Preview actions without executing
```

## Documentation

- **[Online Docs](https://copilot-kit.vercel.app/docs)** — Browse all documentation
- **[GitHub Copilot Custom Agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents)** — VS Code docs
- **[Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)** — VS Code docs

## Credits

Built on [@vudovn](https://github.com/vudovn)'s excellent [Antigravity Kit](https://github.com/vudovn/antigravity-kit), originally designed for Google Gemini AI. This project adapts and extends that work for GitHub Copilot in VS Code.


## License

MIT © SK-Labs
