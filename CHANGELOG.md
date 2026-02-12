# Changelog

All notable changes to Copilot Kit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/2.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] - 2026-02-15

### Changed (Major — Copilot Migration)

- **Rebranded** from "Antigravity Kit" (Google Gemini) to "Copilot Kit" (GitHub Copilot in VS Code)
- **Folder Structure**: `.agent/` → `.github/` with Copilot-native directory layout:
  - `.github/agents/` — Custom agents as `.agent.md` files with YAML frontmatter
  - `.github/skills/` — Agent skills following agentskills.io open standard
  - `.github/prompts/` — Prompt workflows as `.prompt.md` files (slash commands)
  - `.github/instructions/` — Path-specific instructions with `applyTo` globs
  - `.github/copilot-instructions.md` — Global behavior rules
- **Agent Format**: Updated YAML frontmatter to Copilot schema (`description`, `tools`, `agents`, `handoffs`, `model`)
- **Workflow Format**: Renamed to "Prompt Workflows" using `.prompt.md` format with `agent:`, `tools:` frontmatter
- **CLI**: `ag-kit` → `copilot-kit`, npm package `@vudovn/ag-kit` → `@vudovn/copilot-kit`
- **Documentation website**: Full rebrand with purple-indigo-blue color scheme
- **README**: Rewritten for GitHub Copilot audience with VS Code setup instructions

### Added

- Support for agent handoffs and sub-agent delegation
- Model preferences per agent (`model` frontmatter field)
- Path-specific instruction files (`*.instructions.md`)
- `AGENTS.md` cross-agent compatible documentation
- Dynamic variables in prompt files (`{selectedText}`, `{currentFile}`)

## [2.0.2] - 2026-02-04
- **New Skills**:
    - `rust-pro` - Master Rust 1.75+
- **Agent Workflows**:
    - Updated `orchestrate.md` fix output turkish


## [2.0.1] - 2026-01-26

### Added

- **Agent Flow Documentation**: New comprehensive workflow documentation
    - Added `.github/AGENT_FLOW.md` - Complete agent flow architecture guide
    - Documented Agent Routing Checklist (mandatory steps before code/design work)
    - Documented Socratic Gate Protocol for requirement clarification
    - Added Cross-Skill References pattern documentation
- **New Skills**:
    - `react-best-practices` - Consolidated Next.js and React expertise
    - `web-design-guidelines` - Professional web design standards and patterns

### Changed

- **Skill Consolidation**: Merged `nextjs-best-practices` and `react-patterns` into unified `react-best-practices` skill
- **Architecture Updates**:
    - Enhanced `.github/ARCHITECTURE.md` with improved flow diagrams
    - Updated `.github/copilot-instructions.md` with Agent Routing Checklist
- **Agent Updates**:
    - Updated `frontend-specialist.md` with new skill references
    - Updated `qa-automation-engineer.md` with enhanced testing workflows
- **Frontend Design Skill**: Enhanced `frontend-design/SKILL.md` with cross-references to `web-design-guidelines`

### Removed

- Deprecated `nextjs-best-practices` skill (consolidated into `react-best-practices`)
- Deprecated `react-patterns` skill (consolidated into `react-best-practices`)

### Fixed

- **Agent Flow Accuracy**: Corrected misleading terminology in AGENT_FLOW.md
    - Changed "Parallel Execution" → "Sequential Multi-Domain Execution"
    - Changed "Integration Layer" → "Code Coherence" with accurate description
    - Added reality notes about AI's sequential processing vs. simulated multi-agent behavior
    - Clarified that scripts require user approval (not auto-executed)

## [2.0.0] - Unreleased

### Initial Release

- Initial release of Copilot Kit
- 20 specialized AI agents
- 37 domain-specific skills
- 11 workflow slash commands
- CLI tool for easy installation and updates
- Comprehensive documentation and architecture guide

[Unreleased]: https://github.com/vudovn/copilot-kit/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/vudovn/copilot-kit/compare/v2.0.2...v3.0.0
[2.0.2]: https://github.com/vudovn/copilot-kit/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/vudovn/copilot-kit/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/vudovn/copilot-kit/releases/tag/v2.0.0
