# Auto-Detection Flow - Visual Guide

## Complete Request Processing Flow

```mermaid
graph TD
    A[User Request] --> B{Request Classifier}
    
    B -->|Question| C[TIER 0: Direct Answer]
    B -->|Survey/Intel| D[TIER 0 + Explorer]
    B -->|Simple Code| E[TIER 0 + TIER 1 lite]
    B -->|Complex Code| F[TIER 0 + TIER 1 + Agent]
    B -->|Design/UI| G[TIER 0 + TIER 1 + Agent]
    
    F --> H[Intelligent Agent Routing]
    G --> H
    
    H --> I[Keyword Analysis]
    I --> J{Domain Detection}
    
    J -->|Single Domain| K[Select Specialist Agent]
    J -->|2 Related Domains| L[Select Primary + Secondary]
    J -->|3+ Unrelated Domains| M[Select Orchestrator]
    J -->|Unclear| N[Ask Clarifying Questions]
    
    K --> O[Load Agent File]
    L --> O
    M --> O
    
    O --> P[Load Required Skills]
    P --> Q[Apply Agent Rules]
    Q --> R[Generate Specialized Response]
    
    R --> S[Announce Agent Selection]
    S --> T[Deliver Response to User]
```

## Keyword Matching Process

```mermaid
graph LR
    A[User Message] --> B[Extract Keywords]
    B --> C[Scan Agent Registry]
    C --> D{Match Found?}
    
    D -->|Yes - Single Match| E[Select Agent]
    D -->|Yes - Multiple Matches| F{Related Domains?}
    D -->|No Clear Match| G[Ask Questions]
    
    F -->|Yes| H[Select Primary Agent]
    F -->|No| I[Select Orchestrator]
    
    E --> J[Load Agent Context]
    H --> J
    I --> J
    
    J --> K[Apply Expertise]
```

## Agent Selection Decision Tree

```mermaid
graph TD
    A[Analyze Request] --> B{Keyword Count}
    
    B -->|0-2 keywords| C{Domain Clear?}
    B -->|3-5 keywords| D{Single Domain?}
    B -->|6+ keywords| E{Multiple Domains?}
    
    C -->|Yes| F[Select Specialist]
    C -->|No| G[Ask Questions]
    
    D -->|Yes| F
    D -->|No| H{Related?}
    
    E -->|Yes - Related| I[Select Primary + Secondary]
    E -->|Yes - Unrelated| J[Select Orchestrator]
    E -->|No| F
    
    H -->|Yes| I
    H -->|No| J
    
    F --> K[Single Agent Response]
    I --> L[Multi-Agent Response]
    J --> M[Orchestrated Response]
    G --> N[Clarification Dialog]
```

## Example Flows

### Example 1: Simple Frontend Request

```mermaid
sequenceDiagram
    participant U as User
    participant S as System
    participant R as Router
    participant A as frontend-specialist
    
    U->>S: "Create a dark mode toggle"
    S->>R: Analyze request
    R->>R: Keywords: create, dark mode, toggle
    R->>R: Domain: Frontend/UI
    R->>R: Complexity: Simple
    R->>A: Select frontend-specialist
    A->>A: Load agent rules
    A->>A: Load frontend-design skill
    A->>S: Generate response
    S->>U: 🤖 Applying @frontend-specialist...<br/>[Specialized response]
```

### Example 2: Security + Backend Request

```mermaid
sequenceDiagram
    participant U as User
    participant S as System
    participant R as Router
    participant SA as security-auditor
    participant BA as backend-specialist
    
    U->>S: "Implement JWT authentication"
    S->>R: Analyze request
    R->>R: Keywords: jwt, authentication
    R->>R: Domains: Security + Backend
    R->>R: Complexity: Moderate
    R->>SA: Select security-auditor
    R->>BA: Select backend-specialist
    SA->>SA: Load security rules
    BA->>BA: Load API patterns
    SA->>S: Security expertise
    BA->>S: Backend expertise
    S->>U: 🤖 Applying @security-auditor + @backend-specialist...<br/>[Combined response]
```

### Example 3: Complex Multi-Domain Request

```mermaid
sequenceDiagram
    participant U as User
    participant S as System
    participant R as Router
    participant O as orchestrator
    participant A1 as Agent 1
    participant A2 as Agent 2
    participant A3 as Agent 3
    
    U->>S: "Build a real-time chat app"
    S->>R: Analyze request
    R->>R: Keywords: build, real-time, chat, app
    R->>R: Domains: Frontend + Backend + Database + WebSocket
    R->>R: Complexity: Complex
    R->>O: Select orchestrator
    O->>U: 🤖 Applying @orchestrator...<br/>Let me ask a few questions first...
    U->>O: [Answers questions]
    O->>A1: Coordinate frontend-specialist
    O->>A2: Coordinate backend-specialist
    O->>A3: Coordinate database-architect
    A1->>O: Frontend plan
    A2->>O: Backend plan
    A3->>O: Database plan
    O->>S: Integrated plan
    S->>U: [Complete coordinated response]
```

### Example 4: Bug Fix Request

```mermaid
sequenceDiagram
    participant U as User
    participant S as System
    participant R as Router
    participant D as debugger
    
    U->>S: "Login not working, 401 error"
    S->>R: Analyze request
    R->>R: Keywords: not working, login, error, 401
    R->>R: Domain: Debugging
    R->>R: Complexity: Simple
    R->>D: Select debugger
    D->>D: Load debugging strategies
    D->>D: Load error analysis skill
    D->>S: Generate systematic debug plan
    S->>U: 🤖 Applying @debugger...<br/>[Systematic debugging approach]
```

## Priority Rules Flowchart

```mermaid
graph TD
    A[Request Received] --> B{Explicit @agent?}
    
    B -->|Yes| C[Use Mentioned Agent]
    B -->|No| D{Security Keywords?}
    
    D -->|Yes| E{Other Domain?}
    D -->|No| F{Mobile + Web?}
    
    E -->|Yes| G[Include security-auditor + Other]
    E -->|No| H[Use security-auditor Only]
    
    F -->|Yes| I[Ask: Mobile or Web?]
    F -->|No| J{3+ Domains?}
    
    J -->|Yes| K[Use Orchestrator]
    J -->|No| L{Clear Keywords?}
    
    L -->|Yes| M[Use Matched Agent]
    L -->|No| N[Ask Clarifying Questions]
    
    C --> O[Load Agent]
    G --> O
    H --> O
    K --> O
    M --> O
    
    I --> P[Wait for Answer]
    N --> P
    P --> A
```

## Confidence Scoring System

```mermaid
graph LR
    A[Keyword Matches] --> B{Score Calculation}
    
    B --> C[High: 5+ matches]
    B --> D[Medium: 3-4 matches]
    B --> E[Low: 1-2 matches]
    B --> F[None: 0 matches]
    
    C --> G[Direct Selection]
    D --> H{Context Check}
    E --> I[Ask Questions]
    F --> I
    
    H -->|Clear| G
    H -->|Unclear| I
    
    G --> J[Apply Agent]
    I --> K[Clarification Dialog]
    K --> A
```

## Multi-Agent Coordination

```mermaid
graph TD
    A[Orchestrator Activated] --> B[Analyze Requirements]
    B --> C[Identify Required Agents]
    
    C --> D[frontend-specialist]
    C --> E[backend-specialist]
    C --> F[database-architect]
    C --> G[test-engineer]
    
    D --> H[Frontend Plan]
    E --> I[Backend Plan]
    F --> J[Database Plan]
    G --> K[Testing Plan]
    
    H --> L[Integration Layer]
    I --> L
    J --> L
    K --> L
    
    L --> M[Unified Response]
    M --> N[User Receives Complete Solution]
```

## Error Handling Flow

```mermaid
graph TD
    A[Request Analysis] --> B{Keywords Found?}
    
    B -->|No| C[Fallback Strategy]
    B -->|Yes| D{Confidence Level?}
    
    C --> E[Ask Generic Questions]
    E --> F[Re-analyze with Answers]
    F --> A
    
    D -->|High| G[Select Agent]
    D -->|Medium| H[Ask Specific Questions]
    D -->|Low| E
    
    H --> I[Confirm Selection]
    I --> G
    
    G --> J{Agent Available?}
    
    J -->|Yes| K[Load Agent]
    J -->|No| L[Use General Agent]
    
    K --> M[Generate Response]
    L --> M
```

## Performance Optimization

```mermaid
graph LR
    A[Request] --> B[Quick Keyword Scan]
    B --> C{Obvious Match?}
    
    C -->|Yes| D[Fast Path: Direct Selection]
    C -->|No| E[Deep Analysis Path]
    
    D --> F[Load Agent]
    E --> G[Score All Agents]
    G --> H[Select Top Scorer]
    H --> F
    
    F --> I[Cache Agent Context]
    I --> J[Generate Response]
    
    J --> K{Response Time}
    K -->|< 2s| L[Optimal]
    K -->|2-5s| M[Acceptable]
    K -->|> 5s| N[Needs Optimization]
```

## Integration Points

```mermaid
graph TD
    A[copilot-instructions.md] --> B[TIER 0: Request Classifier]
    A --> C[TIER 1: Intelligent Routing]
    
    C --> D[AGENT_REGISTRY.md]
    C --> E[intelligent-routing skill]
    
    D --> F[Keyword Mappings]
    E --> G[Selection Logic]
    
    F --> H[Agent Selection]
    G --> H
    
    H --> I[.github/agents/*.agent.md]
    I --> J[Load Agent Rules]
    
    J --> K[.github/skills/*/SKILL.md]
    K --> L[Load Required Skills]
    
    L --> M[Generate Response]
```

---

## Key Takeaways

1. **Automatic**: No need to mention `@agent-name`
2. **Intelligent**: Analyzes keywords, domains, and complexity
3. **Transparent**: Always announces which agent is being used
4. **Flexible**: Can handle single-domain, multi-domain, and complex tasks
5. **Override-able**: User can still explicitly mention agents
6. **Efficient**: Fast keyword matching with fallback to deep analysis

---

**Reference**: See `.github/AGENT_REGISTRY.md` for complete keyword mappings and `.github/AUTO_DETECTION_GUIDE.md` for usage examples.

**Last Updated**: 2025-02-13
