# Migration Guide: Antigravity Kit → Copilot Kit

> **For users familiar with Antigravity Kit who want to use Copilot Kit with GitHub Copilot**

## Overview

Copilot Kit is inspired by and adapted from [Antigravity Kit](https://github.com/vudovn/antigravity-kit) by [@vudovn](https://github.com/vudovn). This guide helps you understand the differences and migrate smoothly.

## Key Differences

### Platform & IDE

| Aspect | Antigravity Kit | Copilot Kit |
|--------|-----------------|-------------|
| **IDE** | Kiro IDE | VS Code |
| **AI Provider** | Google Gemini | GitHub Copilot |
| **Extension** | Built-in | GitHub Copilot extension |

### File Structure

| Component | Antigravity Kit | Copilot Kit |
|-----------|-----------------|-------------|
| **Instructions** | `.kiro/instructions.md` | `.github/copilot-instructions.md` |
| **Agents** | `.kiro/agents/*.md` | `.github/agents/*.agent.md` |
| **Skills** | `.kiro/skills/*/SKILL.md` | `.github/skills/*/SKILL.md` |
| **Scripts** | `.kiro/scripts/*.py` | `.github/scripts/*.py` |
| **Prompts** | N/A | `.github/prompts/*.prompt.md` |

### Auto-Detection

| Feature | Antigravity Kit | Copilot Kit |
|---------|-----------------|-------------|
| **Auto-Detection** | ✅ Yes | ✅ Yes (Enhanced) |
| **Keyword Source** | Agent frontmatter | Frontmatter + AGENT_REGISTRY.md |
| **Documentation** | Basic | Comprehensive (6 guides) |
| **Visual Guides** | No | Yes (flow diagrams) |
| **Test Suite** | No | Yes (18 test cases) |
| **Quick Reference** | No | Yes (print-friendly) |

## Migration Steps

### Step 1: Understand the Structure

**Antigravity Kit Structure**:
```
.kiro/
├── instructions.md
├── agents/
├── skills/
└── scripts/
```

**Copilot Kit Structure**:
```
.github/
├── copilot-instructions.md
├── agents/                    # Custom agents (*.agent.md)
├── skills/                    # Agent Skills (SKILL.md)
├── prompts/                   # Slash commands (*.prompt.md)
└── scripts/                   # Helper scripts

docs/
└── *.md                       # Documentation
```

### Step 2: Install Copilot Kit

```bash
# Install via npm
npx @sk-labs/copilot-kit init

# Or install globally
npm install -g @sk-labs/copilot-kit
copilot-kit init
```

### Step 3: Understand Agent Invocation

**Antigravity Kit (Kiro IDE)**:
```
# Auto-detection (no mention needed)
"Create a button component"
→ Automatically uses frontend-specialist

# Explicit mention
"@frontend-specialist create a button"
→ Uses frontend-specialist
```

**Copilot Kit (GitHub Copilot)**:
```
# Auto-detection (no mention needed)
"Create a button component"
→ Automatically uses frontend-specialist

# Explicit mention
"@frontend-specialist create a button"
→ Uses frontend-specialist
```

**Result**: Same behavior! Auto-detection works the same way.

### Step 4: Understand Keyword Mapping

**Antigravity Kit**:
- Keywords in agent frontmatter only
- System reads frontmatter for triggers

**Copilot Kit**:
- Keywords in agent frontmatter (same as Antigravity)
- PLUS: Centralized AGENT_REGISTRY.md for reference
- PLUS: Comprehensive documentation

**Example Agent Frontmatter** (Same in both):
```yaml
---
name: frontend-specialist
description: Senior Frontend Architect. Triggers on: component, react, vue, ui, ux, css, tailwind, responsive.
tools: Read, Grep, Glob, Bash, Edit, Write
skills: clean-code, react-best-practices, frontend-design
---
```

### Step 5: Learn New Features

**Copilot Kit Enhancements**:

1. **AGENT_REGISTRY.md**: Centralized keyword reference
2. **AUTO_DETECTION_GUIDE.md**: Complete user guide
3. **AUTO_DETECTION_FLOW.md**: Visual flow diagrams
4. **TESTING_AUTO_DETECTION.md**: 18 test cases
5. **QUICK_REFERENCE.md**: Print-friendly cheat sheet
6. **Prompt Workflows**: Slash commands (`.github/prompts/`)

### Step 6: Test Auto-Detection

Run the same tests in both systems:

```
Test: "Create a dark mode toggle"
Antigravity: Uses frontend-specialist ✅
Copilot Kit: Uses frontend-specialist ✅

Test: "Implement JWT auth"
Antigravity: Uses security-auditor + backend-specialist ✅
Copilot Kit: Uses security-auditor + backend-specialist ✅

Test: "Build a chat app"
Antigravity: Uses orchestrator ✅
Copilot Kit: Uses orchestrator ✅
```

**Result**: Same intelligent routing!

## Feature Comparison

### Core Features (Same)

✅ **Auto-Detection**: Both systems automatically select agents  
✅ **Keyword Matching**: Both use keywords from agent frontmatter  
✅ **Multi-Agent**: Both support multiple agents for complex tasks  
✅ **Orchestrator**: Both use orchestrator for complex projects  
✅ **Explicit Override**: Both respect `@agent-name` mentions  
✅ **Socratic Questions**: Both ask clarifying questions when unclear  
✅ **Skills System**: Both use modular skills (agentskills.io standard)  

### Enhanced Features (Copilot Kit)

✨ **Centralized Registry**: AGENT_REGISTRY.md for easy reference  
✨ **Comprehensive Docs**: 6 documentation files vs 1  
✨ **Visual Guides**: Flow diagrams and decision trees  
✨ **Test Suite**: 18 test cases for verification  
✨ **Quick Reference**: Print-friendly keyword cheat sheet  
✨ **Prompt Workflows**: Slash commands for common tasks  
✨ **Checklist**: 150+ item setup verification  

### Platform-Specific Features

**Antigravity Kit (Kiro IDE)**:
- Integrated with Kiro IDE features
- Kiro-specific tools and commands
- Kiro UI integration

**Copilot Kit (GitHub Copilot)**:
- VS Code integration
- GitHub Copilot Chat interface
- VS Code tools (editFiles, codebase, terminal, fetch)
- Prompt files (slash commands)

## Conceptual Mapping

### Instructions File

**Antigravity**: `.kiro/instructions.md`
```markdown
## INTELLIGENT AGENT ROUTING

Auto-detect and select best agent...
```

**Copilot Kit**: `.github/copilot-instructions.md`
```markdown
## INTELLIGENT AGENT ROUTING (STEP 2 - AUTO)

Auto-detect and select best agent...
```

**Mapping**: Same concept, different location

### Agent Files

**Antigravity**: `.kiro/agents/frontend-specialist.md`
```yaml
---
name: frontend-specialist
description: Triggers on: component, react, ui...
---
```

**Copilot Kit**: `.github/agents/frontend-specialist.agent.md`
```yaml
---
name: frontend-specialist
description: Triggers on: component, react, ui...
---
```

**Mapping**: Same format, different location

### Skills

**Antigravity**: `.kiro/skills/frontend-design/SKILL.md`
```yaml
---
name: frontend-design
description: UI/UX design patterns
---
```

**Copilot Kit**: `.github/skills/frontend-design/SKILL.md`
```yaml
---
name: frontend-design
description: UI/UX design patterns
---
```

**Mapping**: Same format, different location

## Usage Comparison

### Scenario 1: Simple Frontend Task

**Antigravity Kit (Kiro IDE)**:
```
You: "Create a responsive card component"
Kiro: 🤖 Applying @frontend-specialist...
[Response follows]
```

**Copilot Kit (GitHub Copilot)**:
```
You: "Create a responsive card component"
Copilot: 🤖 Applying @frontend-specialist expertise...
[Response follows]
```

**Result**: Same behavior, slightly different announcement format

### Scenario 2: Multi-Domain Task

**Antigravity Kit**:
```
You: "Implement JWT authentication"
Kiro: 🤖 Applying @security-auditor + @backend-specialist...
[Response follows]
```

**Copilot Kit**:
```
You: "Implement JWT authentication"
Copilot: 🤖 Applying @security-auditor + @backend-specialist expertise...
[Response follows]
```

**Result**: Same multi-agent coordination

### Scenario 3: Complex Project

**Antigravity Kit**:
```
You: "Build a real-time chat app"
Kiro: 🤖 Applying @orchestrator...
Kiro: Let me ask a few questions first...
[Questions follow]
```

**Copilot Kit**:
```
You: "Build a real-time chat app"
Copilot: 🤖 Applying @orchestrator expertise...
Copilot: Let me ask a few questions first...
[Questions follow]
```

**Result**: Same orchestration behavior

## What's Different?

### 1. Documentation Depth

**Antigravity Kit**: Basic documentation in instructions.md

**Copilot Kit**: Comprehensive documentation suite:
- AGENT_REGISTRY.md (keyword reference)
- AUTO_DETECTION_GUIDE.md (user guide)
- AUTO_DETECTION_FLOW.md (visual diagrams)
- TESTING_AUTO_DETECTION.md (test suite)
- QUICK_REFERENCE.md (cheat sheet)
- AUTO_DETECTION_SUMMARY.md (overview)

### 2. Testing Infrastructure

**Antigravity Kit**: Manual testing

**Copilot Kit**: 
- 18 documented test cases
- Expected results for each test
- Scoring system (PASS/PARTIAL/FAIL)
- Debugging commands
- Issue reporting template

### 3. Visual Guides

**Antigravity Kit**: Text-based documentation

**Copilot Kit**:
- Mermaid flow diagrams
- Decision trees
- Sequence diagrams
- Architecture diagrams

### 4. Quick Reference

**Antigravity Kit**: No quick reference

**Copilot Kit**:
- Print-friendly cheat sheet
- Top 10 agent triggers
- Common keywords by domain
- Pro tips
- Troubleshooting quick fixes

### 5. Prompt Workflows

**Antigravity Kit**: No prompt files

**Copilot Kit**:
- 11 slash commands
- `/brainstorm`, `/create`, `/debug`, etc.
- Structured workflows
- VS Code integration

## What's the Same?

### Core Philosophy
✅ Automatic agent selection based on keywords  
✅ No need to mention `@agent-name` explicitly  
✅ Transparent communication (shows which agent is used)  
✅ Multi-agent coordination for complex tasks  
✅ Socratic questioning for unclear requests  

### Agent System
✅ 20 specialist agents  
✅ Modular skills system  
✅ Agent frontmatter with keywords  
✅ Skills follow agentskills.io standard  
✅ Clean code principles  

### Intelligent Routing
✅ Keyword-based matching  
✅ Domain detection  
✅ Complexity assessment  
✅ Priority rules (security first, etc.)  
✅ Explicit override capability  

## Migration Checklist

### For Antigravity Kit Users

- [ ] Understand file structure differences
- [ ] Install Copilot Kit in VS Code
- [ ] Install GitHub Copilot extension
- [ ] Read AUTO_DETECTION_GUIDE.md
- [ ] Review AGENT_REGISTRY.md
- [ ] Run test suite (TESTING_AUTO_DETECTION.md)
- [ ] Print QUICK_REFERENCE.md
- [ ] Test auto-detection with familiar requests
- [ ] Verify same agents are selected
- [ ] Explore new prompt workflows
- [ ] Bookmark documentation files

### For New Users

- [ ] Read AUTO_DETECTION_SUMMARY.md first
- [ ] Follow AUTO_DETECTION_GUIDE.md
- [ ] Review AGENT_REGISTRY.md
- [ ] Print QUICK_REFERENCE.md
- [ ] Run test suite
- [ ] Explore prompt workflows
- [ ] Join community discussions

## FAQ

### Q: Will my Antigravity Kit knowledge transfer?

**A**: Yes! The core concepts are identical. You just need to learn the new file locations and enhanced documentation.

### Q: Can I use both systems?

**A**: Yes! Use Antigravity Kit in Kiro IDE and Copilot Kit in VS Code. They're compatible in concept.

### Q: Is auto-detection the same?

**A**: Yes! The keyword matching and agent selection logic is the same. Copilot Kit just adds more documentation.

### Q: Do I need to relearn agents?

**A**: No! The agents are the same. Same names, same expertise, same rules.

### Q: What about skills?

**A**: Skills are the same! Both follow the agentskills.io standard. Same format, same structure.

### Q: Are keywords different?

**A**: No! Keywords are the same. Copilot Kit just documents them better in AGENT_REGISTRY.md.

### Q: Is the orchestrator the same?

**A**: Yes! Same orchestration logic, same Socratic questions, same multi-agent coordination.

### Q: What's the learning curve?

**A**: Minimal! If you know Antigravity Kit, you already know 90% of Copilot Kit. Just learn the new file locations.

## Resources

### Antigravity Kit
- [GitHub Repo](https://github.com/vudovn/antigravity-kit)
- [Documentation](https://github.com/vudovn/antigravity-kit#readme)
- [Kiro IDE](https://kiro.ai)

### Copilot Kit
- [AUTO_DETECTION_GUIDE.md](.github/AUTO_DETECTION_GUIDE.md)
- [AGENT_REGISTRY.md](.github/AGENT_REGISTRY.md)
- [QUICK_REFERENCE.md](.github/QUICK_REFERENCE.md)
- [GitHub Copilot Docs](https://code.visualstudio.com/docs/copilot/customization/custom-agents)

## Credits

Copilot Kit is built on the excellent foundation of Antigravity Kit by [@vudovn](https://github.com/vudovn). We're grateful for the inspiration and the open-source contribution to the AI coding assistant community.

## Contributing

Both projects welcome contributions! If you improve auto-detection logic, consider contributing back to both:

- **Antigravity Kit**: [GitHub Issues](https://github.com/vudovn/antigravity-kit/issues)
- **Copilot Kit**: [GitHub Issues](https://github.com/sk-labs/copilot-kit/issues)

---

**Last Updated**: 2025-02-13

**Version**: 1.0.0

**Maintained By**: SK-Labs

**Original Inspiration**: Antigravity Kit by @vudovn
