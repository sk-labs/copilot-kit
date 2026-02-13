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
| **Auto-Detection**  | ✨    | Intelligent agent routing (no need to mention `@agent-name`)       |

### Folder Structure

```
.github/
├── copilot-instructions.md    # Global behavior rules + Auto-routing
├── agents/                    # Custom Agents (*.agent.md format)
├── skills/                    # Agent Skills (SKILL.md per domain)
│   └── intelligent-routing/   # Auto-detection logic
├── prompts/                   # Prompt Workflows (*.prompt.md)
└── scripts/                   # Automation scripts

docs/
├── AGENT_REGISTRY.md          # Keyword mappings for auto-detection
├── AUTO_DETECTION_GUIDE.md    # Complete user guide
├── AUTO_DETECTION_FLOW.md     # Visual flow diagrams
├── TESTING_AUTO_DETECTION.md  # Test suite (18 cases)
├── AUTO_DETECTION_SUMMARY.md  # High-level overview
├── QUICK_REFERENCE.md         # Print-friendly cheat sheet
├── AUTO_DETECTION_CHECKLIST.md # Setup verification
├── MIGRATION_FROM_ANTIGRAVITY.md # Migration guide
├── AUTO_DETECTION_IMPLEMENTATION.md # Implementation details
└── AUTO_DETECTION_INDEX.md    # Documentation navigation
```

## Usage

### Intelligent Auto-Detection (No Need to Mention Agents!)

**NEW**: Copilot Kit automatically detects and selects the best specialist agent based on your request. No need to mention `@agent-name`!

```
❌ OLD WAY: "@frontend-specialist create a dark mode toggle"
✅ NEW WAY: "Create a dark mode toggle"
```

**How it works**:
1. You describe what you want in natural language
2. System analyzes keywords and domains
3. Best specialist is automatically selected
4. You get expert-level response

**Example**:
```
You: "Create a responsive navigation bar"
Copilot: 🤖 Applying @frontend-specialist expertise...
[Specialized response follows]
```

**See**: 
- [Auto-Detection Guide](docs/AUTO_DETECTION_GUIDE.md) for complete details and examples
- [Documentation Index](docs/AUTO_DETECTION_INDEX.md) for all auto-detection docs
- [Quick Reference](docs/QUICK_REFERENCE.md) for print-friendly keyword cheat sheet

### Using Agents (Explicit Override)

You can still explicitly invoke agents by name if you prefer:

```
@frontend-specialist Add JWT authentication
@debugger Fix the dark mode button
@security-auditor Review the auth flow
```

Each agent file supports YAML frontmatter with:
- `description` — Shown in Copilot Chat (includes trigger keywords)
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

### Key Differences from Antigravity Kit

| Feature | Antigravity Kit (Kiro IDE) | Copilot Kit (GitHub Copilot) |
|---------|----------------------------|-------------------------------|
| **IDE** | Kiro IDE | VS Code with GitHub Copilot |
| **Instructions File** | `.kiro/instructions.md` | `.github/copilot-instructions.md` |
| **Agent Location** | `.kiro/agents/` | `.github/agents/` (`.agent.md` format) |
| **Skills Location** | `.kiro/skills/` | `.github/skills/` (Agent Skills standard) |
| **Prompts** | N/A | `.github/prompts/` (`.prompt.md` format) |
| **Auto-Detection** | ✅ Yes | ✅ Yes (Enhanced) |
| **Keyword Registry** | In agent frontmatter | Frontmatter + `AGENT_REGISTRY.md` |
| **Visual Guides** | Basic | Enhanced with flow diagrams |
| **Explicit Override** | ✅ Yes | ✅ Yes |
| **Multi-Agent Coordination** | ✅ Yes | ✅ Yes |

**Enhanced Auto-Detection**: Copilot Kit includes comprehensive documentation (AGENT_REGISTRY.md, AUTO_DETECTION_GUIDE.md, AUTO_DETECTION_FLOW.md) and visual flow diagrams to help users understand how the intelligent routing works.


## License

MIT © SK-Labs
