# Implementation Plan: Copilot Kit (formerly Antigravity Kit)

> Transforming the "Antigravity Kit" (Google Gemini) into "Copilot Kit" for GitHub Copilot in VS Code.
> **Research Date**: Feb 12, 2026 — based on latest VS Code & GitHub Copilot documentation.

---

## 1. Research Findings — Copilot Now Supports Native Agents, Skills & Prompts

The previous plan assumed Copilot had no file-based agent system. **This was wrong.** As of VS Code 1.106+, Copilot natively supports ALL the same concepts as Antigravity Kit, with nearly 1:1 feature parity:

### 1.1 Feature Mapping (Antigravity → Copilot)

| Antigravity Kit (Gemini) | Copilot Native Feature | File Format | Location |
| :--- | :--- | :--- | :--- |
| **Agents** (20 specialist personas in `.agent/agents/`) | **Custom Agents** | `*.agent.md` with YAML frontmatter | `.github/agents/` |
| **Skills** (37 domain modules in `.agent/skills/`) | **Agent Skills** (open standard via [agentskills.io](https://agentskills.io)) | `SKILL.md` per folder | `.github/skills/<skill-name>/` |
| **Workflows** (11 slash commands in `.agent/workflows/`) | **Prompt Files** (slash commands) | `*.prompt.md` with YAML frontmatter | `.github/prompts/` |
| **Global rules** (`GEMINI.md`) | **Custom Instructions** (always-on) | `copilot-instructions.md` | `.github/` |
| **Per-domain rules** | **Path-specific Instructions** | `*.instructions.md` with `applyTo` glob | `.github/instructions/` |

### 1.2 Key Copilot Features to Leverage

#### Custom Agents (`.agent.md`)
- YAML frontmatter supports: `description`, `tools`, `agents` (subagents), `model`, `handoffs`
- **Handoffs**: Sequential agent-to-agent workflows with auto-submit (e.g., Plan → Implement → Review)
- **Subagents**: An orchestrator agent can delegate to specialist agents
- **Tool restrictions**: Each agent can specify its own allowed tools (read-only for planners, full for implementers)
- **Model selection**: Per-agent model preference (e.g., use GPT-5 for planning, Claude for code review)
- Detected from `.github/agents/` folder or configured via `chat.agentFilesLocations`

#### Agent Skills (`SKILL.md`)
- **Open standard** (agentskills.io) — portable across VS Code, Copilot CLI, and Copilot coding agent
- **Progressive disclosure**: Level 1 (metadata only) → Level 2 (instructions) → Level 3 (resources)
- Can include scripts, templates, examples alongside instructions
- Auto-activated based on prompt relevance — no manual selection needed
- Stored in `.github/skills/<skill-name>/SKILL.md`

#### Prompt Files (`.prompt.md`)
- Invoked as `/command` in chat (exactly like Antigravity's slash commands)
- Can reference a specific agent via `agent:` frontmatter field
- Supports variables: `${selection}`, `${file}`, `${input:varName}`
- Can specify `tools:` to restrict available capabilities
- Stored in `.github/prompts/`

#### Custom Instructions
- `.github/copilot-instructions.md` — always-on, project-wide
- `*.instructions.md` — path-specific with `applyTo` glob patterns
- `AGENTS.md` — cross-agent compatible (works with Copilot, Claude, etc.)
- Priority: Personal > Repository > Organization

### 1.3 What This Means for the Kit

**The migration is much simpler than initially planned.** Instead of cramming everything into one `copilot-instructions.md` file, we can use Copilot's native multi-file architecture:

```
.github/
├── copilot-instructions.md          # Global rules (replaces GEMINI.md)
├── instructions/
│   ├── frontend.instructions.md     # applyTo: "**/*.tsx,**/*.jsx"
│   ├── backend.instructions.md      # applyTo: "**/*.ts" (server paths)
│   └── testing.instructions.md      # applyTo: "**/*.test.*,**/*.spec.*"
├── agents/
│   ├── orchestrator.agent.md        # Multi-agent coordinator with handoffs
│   ├── project-planner.agent.md     # Read-only tools, planning focus
│   ├── frontend-specialist.agent.md # UI/UX agent with design tools
│   ├── backend-specialist.agent.md  # API/DB agent
│   ├── debugger.agent.md            # Debugging specialist
│   ├── test-engineer.agent.md       # Testing specialist
│   ├── security-auditor.agent.md    # Security review agent
│   └── ... (20 agents total)
├── skills/
│   ├── react-best-practices/
│   │   └── SKILL.md
│   ├── tailwind-patterns/
│   │   └── SKILL.md
│   ├── api-patterns/
│   │   └── SKILL.md
│   └── ... (37 skills total)
└── prompts/
    ├── plan.prompt.md               # /plan → uses project-planner agent
    ├── create.prompt.md             # /create → uses relevant specialist
    ├── debug.prompt.md              # /debug → uses debugger agent
    ├── test.prompt.md               # /test → uses test-engineer agent
    ├── brainstorm.prompt.md         # /brainstorm → socratic discovery
    └── ... (11 prompts total)
```

---

## 2. Branding & Identity Overhaul

| Property | Old (Antigravity) | New (Copilot Kit) |
| :--- | :--- | :--- |
| **Name** | Antigravity Kit / AG Kit | **Copilot Kit** / **CK** |
| **Tagline** | "AI Agent Capability Expansion Toolkit" | "Custom Agents, Skills & Workflows for GitHub Copilot" |
| **Target** | Google Gemini / Antigravity | **VS Code GitHub Copilot** |
| **Logo** | "Google Antigravity" SVG (Google RGBY colors) | New Copilot-themed wordmark (purple/blue gradient) |
| **Colors** | `#3186FF` blue, `#FFE432` yellow, `#FC413D` red, `#00B95C` green | `#6e40c9` purple, `#2188ff` blue, `#0d1117` dark, `#f0f6fc` light |
| **Gradient** | `blue → cyan → orange` | `purple → blue → indigo` |
| **Keywords** | `antigravity`, `gemini` | `copilot`, `github-copilot`, `vscode`, `agent-skills` |
| **Links** | `antigravity.google/t`, Discord | GitHub Copilot docs, VS Code Marketplace |

---

## 3. Documentation Content Rewrite

| Page | Key Changes |
| :--- | :--- |
| **Home (`/`)** | Replace "Google Antigravity" SVG + hero. New tagline, CTAs to GitHub & VS Code docs |
| **Docs Overview** | Reframe around Copilot's 4-pillar architecture: Agents + Skills + Prompts + Instructions |
| **Installation** | `npx @sk-labs/copilot-kit init` → installs `.github/` structure. Explain `copilot-instructions.md`, agents, skills, prompts folders |
| **Agents** | Update to explain `.agent.md` format, `tools:` restrictions, `handoffs:`, subagent delegation. Show VS Code agents dropdown |
| **Skills** | Update to explain `SKILL.md` format, progressive disclosure, agentskills.io standard. Include script/resource bundling |
| **Workflows** | Rename to "Prompts / Slash Commands". Explain `.prompt.md` format, `agent:` reference, `${variables}` |
| **CLI** | `ag-kit init` → `copilot-kit init`. Targets `.github/` instead of `.agent/`. New folders: `agents/`, `skills/`, `prompts/`, `instructions/` |
| **Guide Examples** | Update all 11 examples to show Copilot-native syntax (prompt files, agent selection, handoffs) |
| **Agent Flow** | Rewrite around Copilot's native routing: agent picker → handoffs → subagents → skill loading |

---

## 4. Work Items & Checklist

### Phase 1: Core Structure & CLI (Agent Template Conversion)
- [ ] Convert 20 agent `.md` files → `.agent.md` format with YAML frontmatter (`description`, `tools`, `agents`, `handoffs`)
- [ ] Convert 37 skill `.md` files → `SKILL.md` format inside named folders with YAML frontmatter (`name`, `description`)
- [ ] Convert 11 workflow `.md` files → `.prompt.md` format with YAML frontmatter (`agent`, `tools`, `description`)
- [ ] Create `.github/copilot-instructions.md` template (replaces `GEMINI.md` global rules)
- [ ] Create path-specific `.instructions.md` files for frontend, backend, testing contexts
- [ ] Update CLI to install `.github/` folder structure instead of `.agent/`

### Phase 2: Branding & Design
- [ ] Rename `antigravity-kit` → `copilot-kit` in all `package.json` files
- [ ] Update metadata in `layout.tsx` (title, description, OG tags)
- [ ] Replace `AntigravityGoogle` SVG component with new `CopilotKitHero` logo
- [ ] Update `globals.css` color palette (Google RGBY → Copilot purple/blue)
- [ ] Update `Header` component (name, gradient, links)
- [ ] Update `Footer` component (links, repo URLs)
- [ ] Replace `public/images/logo.png`

### Phase 3: Documentation Website Content
- [ ] Rewrite homepage (`page.tsx`) — new hero, tagline, CTAs
- [ ] Rewrite docs overview (`docs/page.tsx`) — 4-pillar architecture overview
- [ ] Rewrite installation page — `.github/` folder structure, `copilot-kit init`
- [ ] Rewrite agents page — `.agent.md` format, handoffs, subagents, tool restrictions
- [ ] Rewrite skills page — `SKILL.md` format, progressive disclosure, agentskills.io standard
- [ ] Rewrite workflows page → "Prompts" page — `.prompt.md` format, variables, agent references
- [ ] Rewrite CLI page — new commands, new folder targets
- [ ] Update all 11 guide examples for Copilot syntax
- [ ] Update `AGENT_FLOW.md` → new `COPILOT_FLOW.md` for Copilot's native routing
- [ ] Update `README.md` with new identity & install instructions
- [ ] Update `CHANGELOG.md` with v3.0.0 entry for the Copilot migration

### Phase 4: Data & Config
- [ ] Update `agents.json` — add Copilot-specific fields (`tools`, `handoffs`, `model`)
- [ ] Update `skills.json` — ensure `name` and `description` fields match SKILL.md standard
- [ ] Update `workflows.json` → `prompts.json` — add `agent`, `tools`, `variables` fields
- [ ] Update `docs-config.ts` sidebar — rename sections, update labels
- [ ] Update search index / search dialog content

### Phase 5: Testing & Deployment
- [ ] Build and test the documentation site locally
- [ ] Test CLI init command outputs correct `.github/` structure
- [ ] Verify all internal links work after rename
- [ ] Push to `copilot-kit` branch
- [ ] Create PR and publish to GitHub

---

## 5. Copilot-Specific Enhancements (New Features)

These are features that Copilot supports but the original Gemini kit didn't have:

| Feature | Implementation |
| :--- | :--- |
| **Agent Handoffs** | Add `handoffs:` to agents (e.g., Plan → Implement → Review chain) |
| **Tool Restrictions** | Planning agents get `tools: ['search', 'fetch']` only. Implementation agents get full tool access |
| **Subagent Orchestration** | Orchestrator agent uses `agents: ['*']` to delegate to any specialist |
| **Model Preferences** | Security auditor uses most capable model, quick tasks use fast model |
| **Path-Specific Instructions** | Frontend rules auto-apply to `**/*.tsx`, backend to server paths |
| **Progressive Skill Loading** | Skills only load into context when relevant to the prompt |
| **Cross-Agent Compatibility** | `AGENTS.md` file works with Copilot, Claude, and other agents |
| **Organization Sharing** | Document how teams can share agents/skills at org level |

---

## 6. Deployment & Publishing

- **Branch**: `copilot-kit` (created)
- **Repository**: Push to `vudovn/antigravity-kit` on the `copilot-kit` branch, then optionally fork/rename
- **npm package**: Update `@vudovn/ag-kit` → `@sk-labs/copilot-kit` (or add Copilot as a target flag)
- **Documentation site**: Deploy updated site to Vercel
- **Version**: Bump to `3.0.0` — this is a major platform migration
