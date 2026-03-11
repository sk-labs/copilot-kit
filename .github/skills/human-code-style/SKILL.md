---
name: human-code-style
description: Strict guidelines for refactoring AI-generated code to appear hand-crafted, maintainable, and free of typical "AI smells" required for marketplace acceptance.
---

# Human Code Style Standards

> **Goal:** Eradicate robotic patterns. Make the codebase look like a Senior Staff Engineer wrote it by hand.

## 1. Commenting Guidelines

AI tools over-comment because they narrate what they just generated. Human engineers assume the reader understands the language syntax.

**Rule: Delete the "What", Explain the "Why"**

❌ *AI Smell:*
```typescript
// Fetch the user data from the database
const user = await db.collection('users').findOne({ id: userId });
// Return the user
return user;
```

✅ *Human Standard:*
```typescript
// (No comments needed here. The code is obvious.)
const user = await db.collection('users').findOne({ id: userId });
return user;
```

**Rule: Commenting Business Logic**
If there's a weird calculation or regex, explain *why* it exists.

✅ *Human Standard:*
```typescript
// Retry 3 times because the legacy auth server occasionally drops connections on the first handshake.
const maxRetries = 3; 
```

## 2. Abstraction & Over-Engineering

AI often hallucinates enterprise Java patterns into simple React or Python scripts.

**Rule: YAGNI (You Aren't Gonna Need It)**
- Do not create an `IUserRepository` interface if there is only one implementation and no immediate plans for another.
- Export simple functions instead of wrapping everything in Classes (unless using an OOP-heavy framework).

## 3. The "Perfect Code" Illusion

AI often writes "perfectly aligned" code with zero breathing room, or massive blocks without spacing.

**Rule: Semantic Spacing**
- Group related lines of code with empty lines.
- Separate setup, execution, and return phases (Arrange, Act, Assert).

❌ *AI Smell:*
```python
def process_order(id):
    order = db.get(id)
    if not order: return None
    user = api.get_user(order.user_id)
    payment = calc_payment(order, user)
    db.save(payment)
    return payment
```

✅ *Human Standard:*
```python
def process_order(id):
    order = db.get(id)
    if not order: 
        return None
        
    user = api.get_user(order.user_id)
    payment = calc_payment(order, user)
    
    db.save(payment)
    return payment
```

## 4. Modern Dependency Enforcement

AI will happily use React `componentDidMount`, `request` (deprecated in 2020), or `moment.js` (legacy mode).

**Rule: Zero Deprecations**
Before submitting code, you must actively verify if the library or pattern used is the *current* standard for the given year (2025/2026).
- If you see `React.FC`, replace it (it's frequently discouraged in modern React).
- If you see `moment()`, swap to `date-fns` or native `Intl`.
- If you see `require()` in a modern TS/ES6 setup, switch to `import`.

## 5. Security & Error Handling

AI often "swallows" errors to make the code look smaller.

❌ *AI Smell:*
```javascript
try {
  await riskyCall();
} catch (e) {
  console.log(e); // Marketplace reject!
}
```

✅ *Human Standard:*
```javascript
try {
  await riskyCall();
} catch (error) {
  logger.error('Failed to communicate with Risk API', { 
    originalError: error,
    context: 'riskyCall'
  });
  throw new CommunicationError('Service momentarily unavailable');
}
```
