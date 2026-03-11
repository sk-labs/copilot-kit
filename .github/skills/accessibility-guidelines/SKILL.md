---
name: accessibility-guidelines
description: Strict Universal Accessibility guidelines (Web, iOS, Android, React Native) for ensuring that UI code meets ADA and WCAG 2.2 AA standards. Prevents keyboard traps, enforces specific touch target rules, and mandates visual contrast compliance.
---

# Universal Accessibility Guidelines (WCAG, ADA, iOS, Android, RN)

> **Core Philosophy:** If a user interface cannot be navigated by a visually-impaired user with a screen reader or a motor-impaired user with a keyboard/switch control, it is fundamentally broken code.

## 1. Web Core Concepts (Semantic UI & ARIA)

Web UIs must be built using native HTML5 semantic elements whenever possible. Do not resort to WAI-ARIA (Accessible Rich Internet Applications) unless you are building a custom, highly interactive widget.

### The "No Div Buttons" Rule
❌ *Unacceptable:*
```jsx
<div className="btn" onClick={openModal}>Open Details</div>
```

✅ *Requirement:* Native elements provide free keyboard focus and screen reader announcements.
```jsx
<button className="btn" onClick={openModal} type="button">Open Details</button>
```

### Form Controls
Every input must have an explicitly linked label. Placeholders are unacceptable substitutes.
❌ `<input type="text" placeholder="Email Address" />`
✅ `<label htmlFor="email">Email Address</label><input type="email" id="email" />`

### Keyboard Traps & Focus Management
- Modals, popups, and dialogs must trap focus inside them. A user pressing `Tab` should cycle through the modal's buttons, not the background page.
- Focus must be restored to the triggering button when the modal closes.
- Ensure `outline: none` is NEVER used unless a visually distinct `:focus-visible` ring replaces it.

## 2. iOS (SwiftUI & UIKit Guidelines)

Apple expects apps to natively support Dynamic Type (rescaling text) and VoiceOver.

### Dynamic Type
❌ `.font(.system(size: 16))` (Does not scale when user increases font size in Settings)
✅ `.font(.body)` or `.font(.custom("YourFont", size: 16, relativeTo: .body))`

### VoiceOver Modifiers
If you build a custom toggle or button stack, you must tell VoiceOver what it is.
✅ `accessibilityAddTraits(.isButton)`
✅ `accessibilityLabel("Increase volume")`
✅ `accessibilityValue(volumeLevel)`

## 3. Android (Jetpack Compose Guidelines)

Google prioritizes strict touch target sizes and TalkBack descriptions.

### Touch Targets
❌ `Icon(modifier = Modifier.size(24.dp))` (Fails the min 48dp rule, creating fat-finger errors)
✅ `Icon(modifier = Modifier.padding(12.dp).size(24.dp))` (Pads the touchable area) or use `IconButton` natively.

### Content Descriptions
TalkBack needs a `contentDescription` for every meaningful icon, but decorative icons should be explicitly hidden.
✅ `Icon(imageVector = Icons.Default.Add, contentDescription = "Add new contact")`
✅ `Icon(imageVector = Icons.Default.Star, contentDescription = null)` // Decorative only

## 4. React Native Guidelines

React Native bridges the gap, but you must map the props correctly to native iOS/Android traits.

### Accessible Props
❌ `<TouchableOpacity onPress={submit}><Text>Submit</Text></TouchableOpacity>`
✅
```jsx
<TouchableOpacity 
  accessible={true} 
  accessibilityRole="button" 
  accessibilityLabel="Submit form" 
  accessibilityState={{ disabled: isSubmitting }}
  onPress={submit}
>
  <Text>Submit</Text>
</TouchableOpacity>
```

## 5. Universal Visual Requirements

### Contrast Ratios
- **Normal Text (under 18pt):** Must have a WCAG AA contrast ratio of at least `4.5:1` against its background.
- **Large Text (over 18pt) & UI Components (Icons/Borders):** Must have a ratio of at least `3.0:1`.
- **Bad Combos:** Gray-on-white (`#9CA3AF` on `#FFFFFF`) or light-blue-on-white are automatic failures. Darken the foreground hex.

### Color as Information
Never convey information solely through color.
❌ Setting a text box border to red when it errors.
✅ Setting the border to red AND rendering a text `<span className="error-text">Password is too short</span>` below it.
