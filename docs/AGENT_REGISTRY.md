# Agent Registry - Auto-Detection Reference

> This file is used by the intelligent routing system to automatically select the best specialist agent based on user requests.

## How Auto-Detection Works

1. **User makes a request** (no need to mention `@agent-name`)
2. **System scans for keywords** from the tables below
3. **Agent is automatically selected** based on keyword matches
4. **Agent's rules and skills are loaded** from `.github/agents/{agent-name}.agent.md`
5. **Response is generated** using the agent's expertise

## Agent Keyword Map

### Frontend & UI/UX

**Agent**: `frontend-specialist`  
**Triggers**: component, react, vue, ui, ux, css, tailwind, responsive, design, page, dashboard, layout, style, button, card, form, navigation, header, footer, sidebar, modal, animation, transition, hover, click, state, props, hooks, jsx, tsx

**Skills**: clean-code, react-best-practices, web-design-guidelines, tailwind-patterns, frontend-design, lint-and-validate

**Use When**:
- Building React/Next.js/Vue components
- Designing UI layouts and styling
- Implementing responsive design
- Working with Tailwind CSS or CSS-in-JS
- Creating animations and transitions
- State management (useState, Context, Zustand)

---

### Mobile Development

**Agent**: `mobile-developer`  
**Triggers**: react native, flutter, ios, android, expo, mobile, screen, navigation, touch, gesture, swipe, native, app store, play store, xcode, android studio, mobile ui, mobile ux

**Skills**: clean-code, mobile-design, react-native-patterns, flutter-patterns

**Use When**:
- Building React Native or Flutter apps
- Designing mobile-specific UI/UX
- Implementing touch gestures and navigation
- Working with native modules
- Mobile app deployment

---

### Backend & API

**Agent**: `backend-specialist`  
**Triggers**: api, server, express, fastapi, node, endpoint, route, POST, GET, PUT, DELETE, backend, microservice, rest, graphql, websocket, middleware, controller, service, authentication, authorization

**Skills**: clean-code, api-patterns, database-design, testing-patterns

**Use When**:
- Building REST or GraphQL APIs
- Designing backend architecture
- Implementing authentication/authorization
- Creating server-side logic
- Working with Express, FastAPI, NestJS, etc.

---

### Database & Data

**Agent**: `database-architect`  
**Triggers**: schema, migration, query, table, prisma, sql, mongodb, database, orm, postgres, mysql, sqlite, nosql, index, foreign key, relationship, transaction, sequelize, typeorm

**Skills**: clean-code, database-design, schema-validation, optimization

**Use When**:
- Designing database schemas
- Writing migrations
- Optimizing queries
- Choosing database technology
- Working with ORMs (Prisma, TypeORM, Sequelize)

---

### Security & Authentication

**Agent**: `security-auditor`  
**Triggers**: login, auth, signup, password, jwt, token, security, vulnerability, exploit, penetration, oauth, session, cookie, csrf, xss, sql injection, encryption, hash, bcrypt, secure

**Skills**: clean-code, security-patterns, vulnerability-scanner, penetration-testing

**Use When**:
- Implementing authentication systems
- Security audits and reviews
- Vulnerability scanning
- Secure coding practices
- OAuth/JWT implementation

---

### Debugging & Troubleshooting

**Agent**: `debugger`  
**Triggers**: error, bug, crash, not working, broken, issue, debug, troubleshoot, fix, problem, exception, stack trace, console error, undefined, null, 404, 500

**Skills**: clean-code, debugging-strategies, error-analysis

**Use When**:
- Fixing bugs and errors
- Analyzing stack traces
- Troubleshooting issues
- Root cause analysis
- Error handling implementation

---

### Testing & QA

**Agent**: `test-engineer`  
**Triggers**: test, jest, vitest, playwright, cypress, coverage, unit, e2e, integration, testing, spec, assertion, mock, stub, tdd, bdd, test case

**Skills**: clean-code, testing-patterns, test-automation, webapp-testing

**Use When**:
- Writing unit tests
- Creating integration tests
- Setting up E2E tests
- Test automation
- Improving test coverage

---

### DevOps & Deployment

**Agent**: `devops-engineer`  
**Triggers**: docker, kubernetes, ci/cd, pm2, nginx, deploy, production, devops, container, orchestration, pipeline, github actions, gitlab ci, jenkins, aws, azure, gcp, cloud

**Skills**: clean-code, deployment-procedures, infrastructure-patterns

**Use When**:
- Setting up CI/CD pipelines
- Containerization (Docker)
- Deployment strategies
- Infrastructure as code
- Cloud deployment

---

### Performance Optimization

**Agent**: `performance-optimizer`  
**Triggers**: slow, lag, optimize, cache, performance, speed, bundle, lighthouse, core web vitals, fps, memory leak, profiling, bottleneck, lazy load, code splitting

**Skills**: clean-code, performance-profiling, optimization-strategies

**Use When**:
- Optimizing application performance
- Bundle size reduction
- Improving Core Web Vitals
- Memory leak detection
- Profiling and benchmarking

---

### SEO & Analytics

**Agent**: `seo-specialist`  
**Triggers**: seo, meta, analytics, sitemap, robots, search engine, google, ranking, keywords, meta tags, og tags, structured data, schema markup

**Skills**: clean-code, seo-fundamentals, analytics-integration

**Use When**:
- SEO optimization
- Meta tags implementation
- Analytics setup
- Sitemap generation
- Structured data markup

---

### Game Development

**Agent**: `game-developer`  
**Triggers**: unity, godot, phaser, game, multiplayer, physics, sprite, animation, collision, game loop, canvas, webgl, 2d, 3d, player, enemy, level

**Skills**: clean-code, game-patterns, physics-simulation

**Use When**:
- Building games
- Game physics implementation
- Multiplayer systems
- Game state management
- Canvas/WebGL work

---

### Product & Planning

**Agent**: `product-owner`  
**Triggers**: requirements, user story, backlog, mvp, product, roadmap, feature, epic, sprint, agile, scrum, stakeholder, business logic

**Skills**: clean-code, product-management, requirement-analysis

**Use When**:
- Defining product requirements
- Writing user stories
- Planning features
- MVP scoping
- Product roadmap

---

### Project Planning & Architecture

**Agent**: `project-planner`  
**Triggers**: plan, architecture, design, structure, organize, scaffold, setup, initialize, project structure, folder structure, tech stack

**Skills**: clean-code, architecture, project-scaffolding, plan-writing

**Use When**:
- Planning new projects
- Designing system architecture
- Creating project structure
- Technology selection
- Writing technical plans

---

### Documentation

**Agent**: `documentation-writer`  
**Triggers**: documentation, readme, docs, guide, tutorial, api docs, jsdoc, comment, explain, document

**Skills**: clean-code, documentation-templates, technical-writing

**Use When**:
- Writing documentation
- Creating README files
- API documentation
- Code comments
- Technical guides

---

### Orchestration (Complex Multi-Domain Tasks)

**Agent**: `orchestrator`  
**Triggers**: build, create, implement, new app, full project, full stack, end-to-end, complete system, entire application

**Skills**: clean-code, all-skills (coordinates multiple agents)

**Use When**:
- Complex multi-domain projects
- Full-stack applications
- Tasks requiring multiple specialists
- Large-scale implementations
- Architectural decisions affecting multiple domains

**Special Behavior**: 
- Asks Socratic questions first
- Coordinates multiple specialist agents
- Creates task breakdown plans
- Ensures cross-domain consistency

---

## Auto-Detection Algorithm

```javascript
function selectAgent(userMessage) {
    // 1. Extract keywords from user message
    const keywords = extractKeywords(userMessage.toLowerCase());
    
    // 2. Score each agent based on keyword matches
    const scores = {};
    for (const agent of agents) {
        scores[agent.name] = countMatches(keywords, agent.triggers);
    }
    
    // 3. Find highest scoring agent(s)
    const topAgents = getTopScorers(scores);
    
    // 4. Decision logic
    if (topAgents.length === 1) {
        return topAgents[0]; // Clear winner
    } else if (topAgents.length === 2 && areRelated(topAgents)) {
        return topAgents[0]; // Use primary agent
    } else if (topAgents.length > 2 || !areRelated(topAgents)) {
        return 'orchestrator'; // Complex multi-domain task
    } else {
        return askClarifyingQuestions(); // Unclear request
    }
}
```

## Priority Rules

1. **Explicit Override**: If user mentions `@agent-name`, use that agent (ignore auto-detection)
2. **Security First**: If security keywords detected + other domain → Always include `security-auditor`
3. **Mobile vs Web**: If both mobile and web keywords → Ask user to clarify
4. **Complex Detection**: If 3+ unrelated domains → Use `orchestrator`
5. **Vague Request**: If no clear keywords → Ask clarifying questions

## Examples

### Example 1: Simple Frontend Task
```
User: "Create a dark mode toggle button"
Keywords: create, button, dark mode
Agent Selected: frontend-specialist
Confidence: HIGH
```

### Example 2: Security + Backend
```
User: "Implement JWT authentication for the API"
Keywords: jwt, authentication, api
Agents Selected: security-auditor + backend-specialist
Confidence: HIGH
```

### Example 3: Complex Multi-Domain
```
User: "Build a real-time chat application"
Keywords: build, real-time, chat, application
Agent Selected: orchestrator
Reason: Requires frontend, backend, websockets, database
Confidence: COMPLEX
```

### Example 4: Bug Fix
```
User: "Login is not working, getting 401 error"
Keywords: not working, login, error, 401
Agent Selected: debugger
Confidence: HIGH
```

### Example 5: Mobile UI
```
User: "Design the profile screen for the mobile app"
Keywords: design, screen, mobile, app
Agent Selected: mobile-developer
Confidence: HIGH
```

---

## Integration with Copilot Instructions

This registry is referenced by `.github/copilot-instructions.md` in the **INTELLIGENT AGENT ROUTING** section. The auto-detection happens automatically for every user request.

**User Experience**:
- ✅ No need to mention `@agent-name`
- ✅ Automatic specialist selection
- ✅ Transparent communication (shows which agent is being used)
- ✅ Can still override with explicit `@agent-name` mention
- ✅ Seamless experience like talking to the right specialist directly

---

**Last Updated**: 2025-02-13
