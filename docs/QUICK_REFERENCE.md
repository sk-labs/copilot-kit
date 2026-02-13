# Auto-Detection Quick Reference Card

> **Print this or keep it handy for quick reference!**

## 🚀 Quick Start

**Just describe what you want - no need to mention `@agent-name`!**

```
❌ OLD: "@frontend-specialist create a button"
✅ NEW: "Create a button"
```

---

## 🎯 Agent Triggers (Top 10)

| Say This... | Gets This Agent |
|-------------|-----------------|
| "Create a **button/component/page**" | `frontend-specialist` |
| "Build a **mobile screen/app**" | `mobile-developer` |
| "Create an **API/endpoint**" | `backend-specialist` |
| "Implement **JWT/auth/login**" | `security-auditor` |
| "Design a **database schema**" | `database-architect` |
| "**Fix/debug** this error" | `debugger` |
| "Write **tests** for..." | `test-engineer` |
| "**Deploy/dockerize** the app" | `devops-engineer` |
| "**Optimize/speed up** the page" | `performance-optimizer` |
| "**Build/create** a full app" | `orchestrator` |

---

## 📋 Common Keywords

### Frontend
`component` `react` `vue` `ui` `ux` `css` `tailwind` `responsive` `design` `button` `card` `form` `animation`

### Mobile
`react native` `flutter` `ios` `android` `expo` `mobile` `screen` `navigation` `touch` `gesture` `swipe`

### Backend
`api` `server` `express` `fastapi` `node` `endpoint` `route` `POST` `GET` `backend` `microservice`

### Security
`login` `auth` `signup` `password` `jwt` `token` `security` `vulnerability` `oauth` `encryption`

### Database
`schema` `migration` `query` `table` `prisma` `sql` `mongodb` `database` `orm` `postgres`

### Debugging
`error` `bug` `crash` `not working` `broken` `issue` `debug` `troubleshoot` `fix` `401` `500`

### Testing
`test` `jest` `vitest` `playwright` `cypress` `coverage` `unit` `e2e` `integration` `mock`

### DevOps
`docker` `kubernetes` `ci/cd` `pm2` `nginx` `deploy` `production` `container` `pipeline`

### Performance
`slow` `lag` `optimize` `cache` `performance` `speed` `bundle` `lighthouse` `memory`

### SEO
`seo` `meta` `analytics` `sitemap` `robots` `search engine` `google` `ranking`

---

## 💡 Pro Tips

### Tip 1: Be Specific
```
❌ Vague: "Make it better"
✅ Specific: "Optimize the page load time"
```

### Tip 2: Use Domain Keywords
```
❌ Generic: "Add user stuff"
✅ Domain: "Create a user registration API endpoint"
```

### Tip 3: Combine Keywords for Multi-Domain
```
"Implement JWT authentication for the API"
→ Triggers: security-auditor + backend-specialist
```

### Tip 4: Override When Needed
```
"@debugger help me create a component"
→ Uses debugger (respects explicit mention)
```

### Tip 5: Ask Questions
```
If unclear, system will ask:
"Mobile app or web app?"
"What color palette do you prefer?"
```

---

## 🎨 Frontend Special Rules

### Purple Ban 🚫
- NO purple, violet, indigo, magenta
- System will avoid automatically

### No Templates 🚫
- NO standard layouts
- NO generic designs
- Every design is unique

### Animation Required ✅
- All UI must have motion
- Smooth transitions
- Spring physics

### Accessibility Required ✅
- Keyboard navigation
- Screen reader support
- ARIA labels

---

## 🔍 What You'll See

### Agent Announcement
```
🤖 Applying @frontend-specialist expertise...
```

### Multi-Agent
```
🤖 Applying @security-auditor + @backend-specialist expertise...
```

### Orchestrator
```
🤖 Applying @orchestrator expertise...
Let me ask a few questions first...
```

---

## 🐛 Troubleshooting

### No Agent Announcement?
1. Check `.github/copilot-instructions.md` exists
2. Restart VS Code
3. Reload GitHub Copilot

### Wrong Agent Selected?
1. Use more specific keywords
2. Or explicitly mention: `@agent-name`

### Generic Response?
1. Be more specific in your request
2. Include domain keywords
3. Mention the technology stack

---

## 📚 Full Documentation

- **User Guide**: `.github/AUTO_DETECTION_GUIDE.md`
- **Flow Diagrams**: `.github/AUTO_DETECTION_FLOW.md`
- **Keyword Map**: `.github/AGENT_REGISTRY.md`
- **Test Suite**: `.github/TESTING_AUTO_DETECTION.md`
- **Summary**: `.github/AUTO_DETECTION_SUMMARY.md`

---

## 🎯 Quick Test

Try these to verify it's working:

```
1. "Create a dark mode toggle"
   → Should trigger: frontend-specialist

2. "Fix the login error"
   → Should trigger: debugger

3. "Implement JWT auth"
   → Should trigger: security-auditor + backend-specialist

4. "Build a chat app"
   → Should trigger: orchestrator
```

---

## 🆘 Need Help?

1. **Read**: AUTO_DETECTION_GUIDE.md
2. **Test**: TESTING_AUTO_DETECTION.md
3. **Check**: AUTO_DETECTION_CHECKLIST.md
4. **Report**: GitHub Issues

---

**Version**: 1.0.0 | **Last Updated**: 2025-02-13

---

## 📌 Bookmark This!

Keep this reference handy for quick lookups. The auto-detection system is designed to be intuitive, but this card helps when you need a quick reminder of keywords or troubleshooting steps.

---

**Print-Friendly Version**: This document is formatted for easy printing. Print it and keep it near your desk for quick reference!
