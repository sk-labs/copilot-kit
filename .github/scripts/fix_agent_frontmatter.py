#!/usr/bin/env python3
"""
Fix agent frontmatter to include proper infer and tool properties
"""

import os
import re
from pathlib import Path

# Tool mapping from old format to new aliases
TOOL_ALIASES = {
    "edit/editFiles": "edit",
    "edit/createFile": "edit",
    "search/codebase": "search",
    "search/textSearch": "search",
    "search/fileSearch": "search",
    "read/readFile": "read",
    "read/problems": "read",
    "execute/runInTerminal": "execute",
    "web/fetch": "web",
}

def fix_agent_file(filepath):
    """Fix a single agent file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract frontmatter
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if not match:
        print(f"⚠️  No frontmatter found in {filepath}")
        return False
    
    frontmatter = match.group(1)
    body = match.group(2)
    
    # Parse frontmatter
    lines = frontmatter.split('\n')
    new_lines = []
    has_name = False
    has_user_invocable = False
    has_disable_model_invocation = False
    tools_fixed = False
    
    for line in lines:
        # Add name if missing (use filename)
        if line.startswith('name:'):
            has_name = True
            new_lines.append(line)
        elif line.startswith('description:'):
            if not has_name:
                # Add name before description
                agent_name = Path(filepath).stem.replace('.agent', '')
                new_lines.append(f'name: {agent_name}')
                has_name = True
            new_lines.append(line)
        elif line.startswith('tools:'):
            # Fix tool names
            tools_match = re.search(r'tools:\s*\[(.*?)\]', line)
            if tools_match:
                tools_str = tools_match.group(1)
                # Extract tool names
                old_tools = [t.strip().strip('"\'') for t in tools_str.split(',')]
                # Map to new aliases
                new_tools = set()
                for tool in old_tools:
                    if tool in TOOL_ALIASES:
                        new_tools.add(TOOL_ALIASES[tool])
                    elif tool in ['read', 'edit', 'search', 'execute', 'web', 'agent', 'todo']:
                        new_tools.add(tool)
                
                # Create new tools line
                tools_list = ', '.join(f'"{t}"' for t in sorted(new_tools))
                new_lines.append(f'tools: [{tools_list}]')
                tools_fixed = True
            else:
                new_lines.append(line)
        elif line.startswith('infer:'):
            # Skip infer, as it's deprecated
            tools_fixed = True # Trigger a write to remove it
            continue
        elif line.startswith('user-invokable:'):
            # Replace with correct spelling
            has_user_invocable = True
            new_lines.append(line.replace('user-invokable', 'user-invocable'))
            tools_fixed = True # Trigger a write to fix it
        elif line.startswith('user-invocable:'):
            has_user_invocable = True
            new_lines.append(line)
        elif line.startswith('disable-model-invocation:'):
            has_disable_model_invocation = True
            new_lines.append(line)
        else:
            new_lines.append(line)
    
    # Add missing properties
    if not has_user_invocable:
        new_lines.append('user-invocable: true')
        tools_fixed = True
    if not has_disable_model_invocation:
        new_lines.append('disable-model-invocation: false')
        tools_fixed = True
    
    # Reconstruct file
    new_frontmatter = '\n'.join(new_lines)
    new_content = f'---\n{new_frontmatter}\n---\n{body}'
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return tools_fixed

def main():
    """Fix all agent files"""
    agents_dir = Path('.github/agents')
    
    if not agents_dir.exists():
        print(f"❌ Agents directory not found: {agents_dir}")
        return
    
    agent_files = list(agents_dir.glob('*.agent.md'))
    
    if not agent_files:
        print(f"❌ No agent files found in {agents_dir}")
        return
    
    print(f"🔧 Fixing {len(agent_files)} agent files...\n")
    
    fixed_count = 0
    for filepath in sorted(agent_files):
        print(f"Processing: {filepath.name}")
        if fix_agent_file(filepath):
            fixed_count += 1
            print(f"  ✅ Fixed tools")
        else:
            print(f"  ℹ️  No changes needed")
    
    print(f"\n✅ Done! Fixed {fixed_count} agent files")
    print(f"\nAll agents now have:")
    print(f"  - name property")
    print(f"  - user-invocable: true (shows in dropdown)")
    print(f"  - disable-model-invocation: false (replaces deprecated infer)")
    print(f"  - Correct tool aliases (read, edit, search, execute, web)")

if __name__ == '__main__':
    main()
