#!/usr/bin/env python3
"""
Flatten nested skills to match GitHub Copilot's expected structure.
All skills must be direct children of .github/skills/
"""

import os
import shutil
from pathlib import Path

def flatten_skills():
    """Flatten nested skill directories"""
    skills_dir = Path('.github/skills')
    
    if not skills_dir.exists():
        print(f"❌ Error: {skills_dir} not found")
        return 1
    
    print("🔧 Flattening nested skills...\n")
    
    # Find nested SKILL.md files
    nested_skills = []
    for skill_dir in skills_dir.iterdir():
        if skill_dir.is_dir():
            # Look for nested SKILL.md files (2 levels deep)
            for subdir in skill_dir.iterdir():
                if subdir.is_dir():
                    skill_file = subdir / 'SKILL.md'
                    if skill_file.exists():
                        nested_skills.append((subdir, skill_dir.name))
    
    if not nested_skills:
        print("✅ No nested skills found - structure is already flat!")
        return 0
    
    print(f"Found {len(nested_skills)} nested skills:\n")
    
    # Move each nested skill to top level
    for nested_dir, parent_name in nested_skills:
        # Create new name: parent-child
        new_name = f"{parent_name}-{nested_dir.name}"
        new_path = skills_dir / new_name
        
        # Check if target already exists
        if new_path.exists():
            print(f"⚠️  Skipping {nested_dir.name} - {new_name} already exists")
            continue
        
        # Move the directory
        shutil.move(str(nested_dir), str(new_path))
        print(f"✅ Moved: {parent_name}/{nested_dir.name} → {new_name}")
    
    # Clean up empty parent directories
    print(f"\n🧹 Cleaning up...")
    for skill_dir in skills_dir.iterdir():
        if skill_dir.is_dir():
            # Check if directory only has subdirectories (no SKILL.md)
            has_skill = (skill_dir / 'SKILL.md').exists()
            subdirs = [d for d in skill_dir.iterdir() if d.is_dir()]
            
            if not has_skill and not subdirs:
                # Empty directory, remove it
                skill_dir.rmdir()
                print(f"🗑️  Removed empty: {skill_dir.name}")
    
    # Remove doc.md if it exists
    doc_file = skills_dir / 'doc.md'
    if doc_file.exists():
        doc_file.unlink()
        print(f"🗑️  Removed: doc.md (not a skill)")
    
    print(f"\n✨ Flattening complete!")
    print(f"\nAll skills are now direct children of .github/skills/")
    
    return 0

if __name__ == '__main__':
    exit(flatten_skills())
