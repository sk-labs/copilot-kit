# Testing Auto-Detection - Verification Guide

> Use these test cases to verify that the intelligent agent routing is working correctly.

## Quick Test Suite

### Test 1: Frontend Component (Simple)

**Input**:
```
Create a responsive card component with hover effects
```

**Expected**:
- ✅ Agent Selected: `frontend-specialist`
- ✅ Announcement: `🤖 Applying @frontend-specialist expertise...`
- ✅ Response includes: Tailwind CSS, responsive design, accessibility
- ✅ Follows: Purple Ban, No standard templates, Animation guidelines

**Verification**:
- [ ] Agent was auto-selected (no need to mention `@frontend-specialist`)
- [ ] Response follows frontend-specialist rules
- [ ] No purple colors used
- [ ] Design is unique (not template-like)

---

### Test 2: Mobile UI (Simple)

**Input**:
```
Design a profile screen for the mobile app with swipe gestures
```

**Expected**:
- ✅ Agent Selected: `mobile-developer`
- ✅ Announcement: `🤖 Applying @mobile-developer expertise...`
- ✅ Response includes: React Native or Flutter code, touch gestures, mobile-specific patterns

**Verification**:
- [ ] Agent was auto-selected
- [ ] Mobile-specific considerations mentioned
- [ ] Touch/gesture handling included
- [ ] Platform-specific guidelines followed

---

### Test 3: Backend API (Simple)

**Input**:
```
Create a REST API endpoint for user registration
```

**Expected**:
- ✅ Agent Selected: `backend-specialist`
- ✅ Announcement: `🤖 Applying @backend-specialist expertise...`
- ✅ Response includes: API structure, validation, error handling

**Verification**:
- [ ] Agent was auto-selected
- [ ] RESTful principles followed
- [ ] Input validation included
- [ ] Error handling implemented

---

### Test 4: Security + Backend (Multi-Domain)

**Input**:
```
Implement JWT authentication for the API
```

**Expected**:
- ✅ Agents Selected: `security-auditor` + `backend-specialist`
- ✅ Announcement: `🤖 Applying @security-auditor + @backend-specialist expertise...`
- ✅ Response includes: Secure JWT implementation, best practices, API integration

**Verification**:
- [ ] Both agents were auto-selected
- [ ] Security best practices mentioned
- [ ] JWT implementation is secure
- [ ] API integration is correct

---

### Test 5: Bug Fix (Debugging)

**Input**:
```
Login is not working, getting 401 unauthorized error
```

**Expected**:
- ✅ Agent Selected: `debugger`
- ✅ Announcement: `🤖 Applying @debugger expertise...`
- ✅ Response includes: Systematic debugging steps, root cause analysis

**Verification**:
- [ ] Agent was auto-selected
- [ ] Systematic debugging approach used
- [ ] Multiple potential causes explored
- [ ] Step-by-step troubleshooting provided

---

### Test 6: Database Schema (Simple)

**Input**:
```
Design a database schema for an e-commerce platform
```

**Expected**:
- ✅ Agent Selected: `database-architect`
- ✅ Announcement: `🤖 Applying @database-architect expertise...`
- ✅ Response includes: Schema design, relationships, indexes

**Verification**:
- [ ] Agent was auto-selected
- [ ] Proper normalization considered
- [ ] Relationships defined
- [ ] Indexes suggested

---

### Test 7: Testing (Simple)

**Input**:
```
Write unit tests for the authentication service
```

**Expected**:
- ✅ Agent Selected: `test-engineer`
- ✅ Announcement: `🤖 Applying @test-engineer expertise...`
- ✅ Response includes: Test cases, AAA pattern, coverage

**Verification**:
- [ ] Agent was auto-selected
- [ ] AAA pattern used (Arrange, Act, Assert)
- [ ] Edge cases covered
- [ ] Mocking/stubbing included

---

### Test 8: Performance Optimization (Simple)

**Input**:
```
Optimize the page load time, it's too slow
```

**Expected**:
- ✅ Agent Selected: `performance-optimizer`
- ✅ Announcement: `🤖 Applying @performance-optimizer expertise...`
- ✅ Response includes: Profiling, optimization strategies, metrics

**Verification**:
- [ ] Agent was auto-selected
- [ ] Profiling mentioned first
- [ ] Specific optimization techniques provided
- [ ] Metrics/benchmarks included

---

### Test 9: SEO Optimization (Simple)

**Input**:
```
Optimize the landing page for search engines
```

**Expected**:
- ✅ Agent Selected: `seo-specialist`
- ✅ Announcement: `🤖 Applying @seo-specialist expertise...`
- ✅ Response includes: Meta tags, structured data, best practices

**Verification**:
- [ ] Agent was auto-selected
- [ ] Meta tags included
- [ ] Structured data mentioned
- [ ] SEO best practices followed

---

### Test 10: DevOps/Deployment (Simple)

**Input**:
```
Set up Docker for the application
```

**Expected**:
- ✅ Agent Selected: `devops-engineer`
- ✅ Announcement: `🤖 Applying @devops-engineer expertise...`
- ✅ Response includes: Dockerfile, docker-compose, best practices

**Verification**:
- [ ] Agent was auto-selected
- [ ] Multi-stage build considered
- [ ] Security best practices included
- [ ] Environment variables handled

---

### Test 11: Complex Multi-Domain (Orchestrator)

**Input**:
```
Build a real-time chat application with user authentication
```

**Expected**:
- ✅ Agent Selected: `orchestrator`
- ✅ Announcement: `🤖 Applying @orchestrator expertise...`
- ✅ Behavior: Asks Socratic questions first
- ✅ Then coordinates: frontend, backend, database, security, test engineers

**Verification**:
- [ ] Orchestrator was auto-selected
- [ ] Clarifying questions asked first
- [ ] Multiple domains identified
- [ ] Coordinated plan provided
- [ ] Task breakdown included

---

### Test 12: Vague Request (Clarification)

**Input**:
```
Make the app better
```

**Expected**:
- ✅ Behavior: Asks clarifying questions
- ✅ Questions about: What aspect? Performance? UI? Features?
- ✅ No agent selected until clarification

**Verification**:
- [ ] System asked clarifying questions
- [ ] No premature agent selection
- [ ] Questions are specific and helpful
- [ ] After clarification, correct agent is selected

---

### Test 13: Explicit Override

**Input**:
```
@debugger help me create a new component
```

**Expected**:
- ✅ Agent Selected: `debugger` (respects explicit mention)
- ✅ Announcement: `🤖 Applying @debugger expertise...`
- ✅ Note: Even though "create component" would normally trigger frontend-specialist

**Verification**:
- [ ] Explicit mention was respected
- [ ] Debugger agent was used (not frontend-specialist)
- [ ] System honored user's choice

---

## Advanced Test Cases

### Test 14: Keyword Conflict (Mobile vs Web)

**Input**:
```
Create a responsive navigation for the app
```

**Expected**:
- ✅ Behavior: Asks clarification - "Mobile app or web app?"
- ✅ After answer, selects appropriate agent

**Verification**:
- [ ] System detected ambiguity
- [ ] Asked for clarification
- [ ] Selected correct agent after answer

---

### Test 15: Security Priority Rule

**Input**:
```
Build a user profile page with password change
```

**Expected**:
- ✅ Agents Selected: `security-auditor` + `frontend-specialist`
- ✅ Security agent included due to "password" keyword
- ✅ Security best practices emphasized

**Verification**:
- [ ] Security agent was included
- [ ] Password handling is secure
- [ ] Frontend agent also applied
- [ ] Security takes priority in response

---

### Test 16: Game Development

**Input**:
```
Create a 2D platformer game with physics
```

**Expected**:
- ✅ Agent Selected: `game-developer`
- ✅ Announcement: `🤖 Applying @game-developer expertise...`
- ✅ Response includes: Game loop, physics, collision detection

**Verification**:
- [ ] Game developer agent was auto-selected
- [ ] Game-specific patterns used
- [ ] Physics implementation included
- [ ] Game loop structure provided

---

### Test 17: Product Requirements

**Input**:
```
Define the MVP features for a task management app
```

**Expected**:
- ✅ Agent Selected: `product-owner`
- ✅ Announcement: `🤖 Applying @product-owner expertise...`
- ✅ Response includes: User stories, prioritization, MVP scope

**Verification**:
- [ ] Product owner agent was auto-selected
- [ ] User stories format used
- [ ] MVP scope clearly defined
- [ ] Prioritization included

---

### Test 18: Documentation

**Input**:
```
Write API documentation for the user endpoints
```

**Expected**:
- ✅ Agent Selected: `documentation-writer`
- ✅ Announcement: `🤖 Applying @documentation-writer expertise...`
- ✅ Response includes: Clear structure, examples, parameters

**Verification**:
- [ ] Documentation writer agent was auto-selected
- [ ] Clear and structured documentation
- [ ] Examples included
- [ ] Parameters well-documented

---

## Scoring System

### Per Test Case

- ✅ **PASS**: Agent correctly auto-selected, rules followed, quality response
- ⚠️ **PARTIAL**: Agent selected but some rules not followed
- ❌ **FAIL**: Wrong agent selected or no auto-detection

### Overall Score

- **18/18 PASS**: Auto-detection working perfectly
- **15-17 PASS**: Excellent, minor tweaks needed
- **12-14 PASS**: Good, some improvements needed
- **< 12 PASS**: Needs significant debugging

## Common Issues & Solutions

### Issue 1: No Agent Announcement

**Symptom**: Response is generic, no `🤖 Applying @agent...` message

**Solution**:
1. Check `.github/copilot-instructions.md` is loaded
2. Verify `INTELLIGENT AGENT ROUTING` section exists
3. Ensure GitHub Copilot is using the instructions file

---

### Issue 2: Wrong Agent Selected

**Symptom**: Frontend task triggers backend agent

**Solution**:
1. Check keyword mappings in `.github/AGENT_REGISTRY.md`
2. Verify agent frontmatter has correct keywords
3. Test with more specific keywords

---

### Issue 3: No Auto-Detection

**Symptom**: Always requires explicit `@agent-name` mention

**Solution**:
1. Verify `.github/copilot-instructions.md` has auto-routing section
2. Check that `intelligent-routing` skill is loaded
3. Restart VS Code / Reload Copilot

---

### Issue 4: Multiple Agents Not Coordinated

**Symptom**: Only one agent used when multiple needed

**Solution**:
1. Check orchestrator triggers in `AGENT_REGISTRY.md`
2. Verify complexity detection logic
3. Test with more complex requests

---

## Debugging Commands

### Check Configuration

```bash
# Verify files exist
ls -la .github/copilot-instructions.md
ls -la docs/AGENT_REGISTRY.md
ls -la .github/skills/intelligent-routing/SKILL.md

# Check agent frontmatter
head -20 .github/agents/frontend-specialist.agent.md
```

### Test Keyword Matching

```bash
# Search for keywords in registry
grep -i "component" .github/AGENT_REGISTRY.md
grep -i "authentication" .github/AGENT_REGISTRY.md
```

### Verify Agent Loading

```bash
# Check agent files are valid
for file in .github/agents/*.agent.md; do
    echo "Checking $file"
    head -10 "$file"
done
```

---

## Reporting Issues

If auto-detection is not working:

1. **Run all test cases** and note which ones fail
2. **Check configuration** using debugging commands
3. **Collect logs**: VS Code Output > GitHub Copilot
4. **Report with**:
   - Test case that failed
   - Expected vs actual behavior
   - Configuration files (copilot-instructions.md, AGENT_REGISTRY.md)
   - VS Code version and Copilot extension version

---

## Success Criteria

Auto-detection is working correctly when:

- ✅ 90%+ of test cases pass
- ✅ Agent announcements appear consistently
- ✅ Correct agents selected for domain-specific tasks
- ✅ Multi-domain tasks trigger orchestrator
- ✅ Explicit overrides are respected
- ✅ Clarifying questions asked when needed
- ✅ Agent rules and skills are properly applied

---

**Last Updated**: 2025-02-13
