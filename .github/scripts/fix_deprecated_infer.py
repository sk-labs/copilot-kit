#!/usr/bin/env python3
"""
Fix deprecated 'infer' property in agent files.
Replace with 'disable-model-invocation: false' for auto-detection.
"""

import os
import re
from pathlib import Path

def fix_agent_file(filepath):
    """Fix a single agent file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file has frontmatter
    if not content.startswith('---'):
        print(f"⚠️  Skipping {filepath.name} - no frontmatter")
        return False
    
    # Split frontmatter and body
    parts = content.split('---', 2)
    if len(parts) < 3:
        print(f"⚠️  Skipping {filepath.name} - invalid frontmatter")
        return False
    
    frontmatter = parts[1]
    body = parts[2]
    
    # Remove 'infer' line
    frontmatter = re.sub(r'\ninfer:\s*(true|false)\s*\n', '\n', frontmatter)
    
    # Add 'disable-model-invocation: false' if not present
    if 'disable-model-invocation' not in frontmatter:
        # Add after user-invokable line
        if 'user-invokable' in frontmatter:
            frontmatter = re.sub(
                r'(user-invokable:\s*true)',
                r'\1\ndisable-model-invocation: false',
                frontmatter
            )
        else:
            # Add at the end of frontmatter
            frontmatter = frontmatter.rstrip() + '\ndisable-model-invocation: false\n'
    
    # Reconstruct file
    new_content = f"---{frontmatter}---{body}"
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

def main():
    """Fix all agent files"""
    agents_dir = Path('.github/agents')
    
    if not agents_dir.exists():
        print(f"❌ Error: {agents_dir} not found")
        return 1
    
    print("🔧 Fixing deprecated 'infer' property in agent files...\n")
    
    agent_files = list(agents_dir.glob('*.agent.md'))
    fixed_count = 0
    
    for filepath in sorted(agent_files):
        if fix_agent_file(filepath):
            print(f"✅ Fixed: {filepath.name}")
            fixed_count += 1
    
    print(f"\n✨ Fixed {fixed_count}/{len(agent_files)} agent files")
    print(f"\nChanges:")
    print(f"  - Removed: infer: true")
    print(f"  - Added: disable-model-invocation: false")
    print(f"\nResult: Auto-detection still works, no deprecation warnings!")
    
    return 0

if __name__ == '__main__':
    exit(main())
