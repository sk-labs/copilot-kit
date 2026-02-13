#!/usr/bin/env python3
"""
Assign appropriate tools to each agent based on their role.

Available VS Code GitHub Copilot Tools (Correct Names):
- search/codebase: Search and understand codebase
- edit/editFiles: Edit/create/delete files
- web/fetch: Fetch content from URLs
- search/fileSearch: Search for files
- web/githubRepo: Access GitHub repository info
- read/listDirectory: List directory contents
- read/readFile: Read file contents
- search: Search in files (grep) - NOT search/search!
- shell/terminalLastCommand: Run terminal commands
- search/usages: Find symbol usages
- agent: Invoke other agents as subagents
"""

import os
import re
from pathlib import Path

# Tool assignments based on agent roles (CORRECTED)
AGENT_TOOLS = {
    'backend-specialist': ['search/codebase', 'edit/editFiles', 'search/fileSearch', 'read/readFile', 'search', 'shell/terminalLastCommand', 'search/usages'],
    'code-archaeologist': ['search/codebase', 'read/readFile', 'search', 'search/usages', 'web/githubRepo', 'search/fileSearch'],
    'database-architect': ['search/codebase', 'edit/editFiles', 'search/fileSearch', 'read/readFile', 'search', 'search/usages'],
    'debugger': ['search/codebase', 'read/readFile', 'search', 'shell/terminalLastCommand', 'search/usages', 'search/fileSearch'],
    'devops-engineer': ['edit/editFiles', 'search/fileSearch', 'read/readFile', 'shell/terminalLastCommand', 'web/fetch'],
    'documentation-writer': ['search/codebase', 'edit/editFiles', 'read/readFile', 'search', 'search/usages', 'web/fetch'],
    'explorer-agent': ['search/codebase', 'search/fileSearch', 'read/listDirectory', 'read/readFile', 'search', 'search/usages'],
    'frontend-specialist': ['search/codebase', 'edit/editFiles', 'search/fileSearch', 'read/readFile', 'search', 'search/usages'],
    'game-developer': ['search/codebase', 'edit/editFiles', 'search/fileSearch', 'read/readFile', 'search', 'shell/terminalLastCommand'],
    'mobile-developer': ['search/codebase', 'edit/editFiles', 'search/fileSearch', 'read/readFile', 'search', 'shell/terminalLastCommand'],
    'orchestrator': ['agent', 'search/codebase', 'search/fileSearch', 'read/readFile', 'search'],
    'penetration-tester': ['search/codebase', 'read/readFile', 'search', 'shell/terminalLastCommand', 'web/fetch', 'search/usages'],
    'performance-optimizer': ['search/codebase', 'edit/editFiles', 'read/readFile', 'search', 'shell/terminalLastCommand', 'search/usages'],
    'product-manager': ['search/codebase', 'read/readFile', 'search', 'web/githubRepo', 'web/fetch'],
    'product-owner': ['search/codebase', 'read/readFile', 'search', 'web/githubRepo', 'web/fetch'],
    'project-planner': ['search/codebase', 'search/fileSearch', 'read/readFile', 'search', 'web/githubRepo'],
    'qa-automation-engineer': ['search/codebase', 'edit/editFiles', 'search/fileSearch', 'read/readFile', 'search', 'shell/terminalLastCommand'],
    'security-auditor': ['search/codebase', 'read/readFile', 'search', 'search/usages', 'web/fetch', 'search/fileSearch'],
    'seo-specialist': ['search/codebase', 'edit/editFiles', 'read/readFile', 'search', 'web/fetch'],
    'test-engineer': ['search/codebase', 'edit/editFiles', 'search/fileSearch', 'read/readFile', 'search', 'shell/terminalLastCommand', 'search/usages'],
}

def update_agent_tools(filepath):
    """Update tools in an agent file"""
    agent_name = filepath.stem.replace('.agent', '')
    
    if agent_name not in AGENT_TOOLS:
        print(f"⚠️  No tool mapping for {agent_name}")
        return False
    
    tools = AGENT_TOOLS[agent_name]
    
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
    
    # Replace tools line
    tools_str = str(tools).replace("'", '"')
    frontmatter = re.sub(r'tools:\s*\[.*?\]', f'tools: {tools_str}', frontmatter, flags=re.DOTALL)
    
    # Reconstruct file
    new_content = f"---{frontmatter}---{body}"
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

def main():
    """Update all agent files with appropriate tools"""
    agents_dir = Path('.github/agents')
    
    if not agents_dir.exists():
        print(f"❌ Error: {agents_dir} not found")
        return 1
    
    print("🔧 Assigning tools to agents (CORRECTED TOOL NAMES)...\n")
    
    agent_files = list(agents_dir.glob('*.agent.md'))
    updated_count = 0
    
    for filepath in sorted(agent_files):
        agent_name = filepath.stem.replace('.agent', '')
        if update_agent_tools(filepath):
            tools = AGENT_TOOLS.get(agent_name, [])
            print(f"✅ {agent_name}: {len(tools)} tools")
            updated_count += 1
    
    print(f"\n✨ Updated {updated_count}/{len(agent_files)} agent files")
    print(f"\nTool Categories (CORRECT FORMAT):")
    print(f"  📖 Read: read/readFile, read/listDirectory")
    print(f"  🔍 Search: search/codebase, search, search/fileSearch, search/usages")
    print(f"  ✏️  Edit: edit/editFiles")
    print(f"  🔧 Shell: shell/terminalLastCommand")
    print(f"  🌐 Web: web/fetch, web/githubRepo")
    print(f"  🤖 Agent: agent")
    
    return 0

if __name__ == '__main__':
    exit(main())
