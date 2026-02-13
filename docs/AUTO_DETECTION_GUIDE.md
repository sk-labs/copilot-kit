# Auto-Detection Guide - How Copilot Kit Selects Specialists

> **TL;DR**: You don't need to mention `@agent-name`. Just describe what you want, and the system automatically selects the best specialist for your task.

## How It Works

### 1. You Make a Request (Naturally)

Just describe what you want in plain language:

```
❌ OLD WAY (Manual): "@frontend-specialist create a dark mode toggle"
✅ NEW WAY (Auto): "Create a dark mode toggle"
```

### 2. System Analyzes Your Request

The system scans your message for keywords and patterns:

- **Keywords**: button, component, dark mode, toggle
- **Domain**: Frontend/UI
- **Complexity**: Simple (single domain)

### 3. Agent is Automatically Selected

Based on the analysis:

```
🤖 Applying `@frontend-specialist` expertise...

I'll create a dark mode toggle component with the following characteristics:
[specialized response follows]
```

### 4. You Get Specialist-Level Response

The response follows all the rules and expertise of the selected agent, as if you had explicitly mentioned them.

---

## What Triggers Each Agent?

### Frontend Specialist
**Triggers**: component, react, vue, ui, ux, css, tailwind, responsive, design, page, dashboard, layout, style, button, card, form

**Example Requests**:
- "Create a responsive navigation bar"
- "Design a landing page with dark mode"
- "Add animations to the hero section"
- "Fix the button hover effect"

---

### Mobile Developer
**Triggers**: react native, flutter, ios, android, expo, mobile, screen, navigation, touch, gesture, swipe

**Example Requests**:
- "Build a profile screen for the mobile app"
- "Add swipe gestures to the card component"
- "Implement bottom tab navigation"
- "Optimize the app for iOS and Android"

---

### Backend Specialist
**Triggers**: api, server, express, fastapi, node, endpoint, route, POST, GET, backend, microservice

**Example Requests**:
- "Create a REST API for user management"
- "Add authentication middleware"
- "Build a GraphQL endpoint"
- "Implement rate limiting"

---

### Security Auditor
**Triggers**: login, auth, signup, password, jwt, token, security, vulnerability, exploit, oauth

**Example Requests**:
- "Implement JWT authentication"
- "Review the login flow for security issues"
- "Add OAuth integration"
- "Secure the API endpoints"

---

### Database Architect
**Triggers**: schema, migration, query, table, prisma, sql, mongodb, database, orm

**Example Requests**:
- "Design a database schema for e-commerce"
- "Create a migration for user profiles"
- "Optimize the product query"
- "Set up Prisma with PostgreSQL"

---

### Debugger
**Triggers**: error, bug, crash, not working, broken, issue, debug, troubleshoot, fix

**Example Requests**:
- "Login is not working, getting 401 error"
- "Fix the crash when submitting the form"
- "Debug the undefined variable error"
- "Troubleshoot the API connection issue"

---

### Test Engineer
**Triggers**: test, jest, vitest, playwright, cypress, coverage, unit, e2e, integration

**Example Requests**:
- "Write unit tests for the auth service"
- "Set up E2E tests with Playwright"
- "Add test coverage for the API"
- "Create integration tests"

---

### DevOps Engineer
**Triggers**: docker, kubernetes, ci/cd, pm2, nginx, deploy, production, devops, container

**Example Requests**:
- "Set up Docker for the application"
- "Create a CI/CD pipeline"
- "Deploy to production"
- "Configure Nginx reverse proxy"

---

### Performance Optimizer
**Triggers**: slow, lag, optimize, cache, performance, speed, bundle, lighthouse

**Example Requests**:
- "Optimize the page load time"
- "Reduce the bundle size"
- "Fix the memory leak"
- "Improve Core Web Vitals"

---

### SEO Specialist
**Triggers**: seo, meta, analytics, sitemap, robots, search engine, google

**Example Requests**:
- "Optimize the site for SEO"
- "Add meta tags for social sharing"
- "Generate a sitemap"
- "Set up Google Analytics"

---

### Orchestrator (Complex Tasks)
**Triggers**: build, create, implement, new app, full project, full stack, complete system

**Example Requests**:
- "Build a real-time chat application"
- "Create a full-stack e-commerce platform"
- "Implement a social media app"
- "Build a complete authentication system"

**Special Behavior**: Asks clarifying questions first, then coordinates multiple specialists.

---

## Advanced Scenarios

### Multi-Domain Tasks

When your request involves multiple domains, the system intelligently handles it:

**Example**: "Implement secure login with JWT"
- **Detected**: Security + Backend
- **Selected**: `security-auditor` + `backend-specialist`
- **Result**: Both specialists' expertise is applied

### Complex Projects

For large-scale projects, the orchestrator takes over:

**Example**: "Build a social media app with real-time chat"
- **Detected**: Frontend + Backend + Database + Real-time + Mobile
- **Selected**: `orchestrator`
- **Behavior**: Asks Socratic questions first, then coordinates multiple agents

### Explicit Override

You can still explicitly mention an agent if you want:

```
User: "@debugger help me fix this error"
System: Uses debugger (respects explicit mention)
```

---

## Benefits

### For You (Developer)

✅ **No Mental Overhead**: Don't need to remember agent names  
✅ **Natural Communication**: Just describe what you want  
✅ **Faster Workflow**: No need to type `@agent-name` every time  
✅ **Transparent**: Always shows which specialist is being used  
✅ **Override Capability**: Can still explicitly mention agents

### For the System

✅ **Consistent Quality**: Right specialist for every task  
✅ **Automatic Skill Loading**: Loads relevant skills automatically  
✅ **Cross-Domain Coordination**: Handles complex multi-domain tasks  
✅ **Scalable**: Easy to add new agents and keywords

---

## Comparison with Antigravity Kit

| Feature | Antigravity Kit (.kiro) | Copilot Kit (.github) |
|---------|-------------------------|------------------------|
| **Auto-Detection** | ✅ Yes | ✅ Yes |
| **Keyword Mapping** | In agent frontmatter | In agent frontmatter + AGENT_REGISTRY.md |
| **Instructions File** | `.kiro/instructions.md` | `.github/copilot-instructions.md` |
| **Agent Location** | `.kiro/agents/` | `.github/agents/` (`.agent.md` format) |
| **Skills Location** | `.kiro/skills/` | `.github/skills/` (Agent Skills standard) |
| **Explicit Override** | ✅ Yes | ✅ Yes |
| **Multi-Agent Coordination** | ✅ Yes | ✅ Yes |

**Key Difference**: Copilot Kit uses `.github/` for all GitHub Copilot components (instructions, agents, skills, prompts) following the official GitHub Copilot standard, while Antigravity Kit uses `.kiro/` for everything (Kiro IDE standard).

---

## Testing the System

### Test 1: Simple Frontend Task
```
You: "Create a responsive card component"
Expected: 🤖 Applying `@frontend-specialist` expertise...
```

### Test 2: Security Task
```
You: "Review the authentication flow for vulnerabilities"
Expected: 🤖 Applying `@security-auditor` expertise...
```

### Test 3: Bug Fix
```
You: "Login is broken, getting 401 error"
Expected: 🤖 Applying `@debugger` expertise...
```

### Test 4: Complex Multi-Domain
```
You: "Build a chat app with real-time notifications"
Expected: 🤖 Applying `@orchestrator` expertise...
[Asks clarifying questions first]
```

---

## FAQ

### Q: Do I need to mention `@agent-name`?
**A**: No! The system automatically detects and selects the best agent. But you can still explicitly mention an agent if you want.

### Q: What if the system selects the wrong agent?
**A**: You can explicitly mention the agent you want: `@frontend-specialist help with this`

### Q: How does it handle multi-domain tasks?
**A**: It either selects multiple related agents or uses the orchestrator for complex coordination.

### Q: Can I see which agent was selected?
**A**: Yes! The system always announces: `🤖 Applying @{agent-name} expertise...`

### Q: What if my request is unclear?
**A**: The system will ask clarifying questions before selecting an agent.

---

## Reference Files

- **Agent Registry**: `docs/AGENT_REGISTRY.md` - Complete keyword mappings
- **Routing Skill**: `.github/skills/intelligent-routing/SKILL.md` - Detailed routing logic
- **Instructions**: `.github/copilot-instructions.md` - Main configuration
- **Agent Files**: `.github/agents/*.agent.md` - Individual agent definitions

---

**Last Updated**: 2025-02-13
