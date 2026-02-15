const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Registry of known/safe MCP servers
const MCP_Registry = {
  'postgres': {
    name: 'PostgreSQL MCP',
    package: '@modelcontextprotocol/server-postgres',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://localhost/mydb']
    }
  },
  'filesystem': {
    name: 'Filesystem MCP',
    package: '@modelcontextprotocol/server-filesystem',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-filesystem', '.']
    }
  },
  'github': {
    name: 'GitHub MCP',
    package: '@modelcontextprotocol/server-github',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-github'],
      env: {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
      }
    }
  },
  'sqlite': {
    name: 'SQLite MCP',
    package: '@modelcontextprotocol/server-sqlite',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-sqlite', '--file', 'db.sqlite']
    }
  },
  'playwright': {
    name: 'Playwright MCP',
    package: '@modelcontextprotocol/server-playwright',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-playwright']
    }
  }
};

class McpManager {
  constructor(cwd = process.cwd()) {
    this.cwd = cwd;
    this.vscodeDir = path.join(cwd, '.vscode');
    this.settingsFile = path.join(this.vscodeDir, 'settings.json');
  }

  ensureVscodeDir() {
    if (!fs.existsSync(this.vscodeDir)) {
      fs.mkdirSync(this.vscodeDir, { recursive: true });
    }
  }

  getSettings() {
    if (fs.existsSync(this.settingsFile)) {
      try {
        // Strip comments if any (simple regex, not perfect but usually sufficient for VS Code JSON)
        const content = fs.readFileSync(this.settingsFile, 'utf8').replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
        return JSON.parse(content);
      } catch (e) {
        console.warn("Warning: Could not parse settings.json. Starting fresh.");
        return {};
      }
    }
    return {};
  }

  saveSettings(settings) {
    this.ensureVscodeDir();
    fs.writeFileSync(this.settingsFile, JSON.stringify(settings, null, 2));
    console.log(`✅ Updated .vscode/settings.json`);
  }

  /**
   * Installs an MCP server.
   * @param {string} serverRef - Either a short name (postgres) or a full package name (@modelcontextprotocol/server-postgres)
   * @param {string[]} extraArgs - Optional extra args for the server
   */
  install(serverRef, extraArgs = []) {
    console.log(`🤖 Agent requesting MCP: ${serverRef}...`);

    let serverConfig = null;
    let packageName = serverRef;
    let shortName = serverRef;

    // 1. Check Registry for "Short Names" (Optimization/Convenience)
    if (MCP_Registry[serverRef]) {
      console.log(`✨ Identified known tool: ${MCP_Registry[serverRef].name}`);
      serverConfig = { ...MCP_Registry[serverRef].config }; // clone
      packageName = MCP_Registry[serverRef].package;
    } else {
      // 2. Dynamic Installation (The "Open Mode")
      console.log(`🌍 Unknown tool name. Treating as direct NPM package: ${serverRef}`);
      
      // Basic Safety Check: Official Scope Preference
      const isOfficial = serverRef.startsWith('@modelcontextprotocol/');
      if (!isOfficial) {
         console.warn(`⚠️  WARNING: You are installing a community package '${serverRef}'. Ensure it is safe.`);
      }

      // Construct default config for unknown package
      // Assumption: standard MCP servers run as "npx -y <package> studio" or similar, 
      // but usually just running the binary via npx is the entry point.
      serverConfig = {
        command: 'npx',
        args: ['-y', serverRef, ...extraArgs]
      };
      
      // Generate a clean key name from package (e.g. @modelcontextprotocol/server-postgres -> postgres)
      const parts = serverRef.split('/');
      shortName = parts[parts.length - 1].replace('server-', '');
    }

    // Merge extra args if provided (and not already merged for dynamic)
    if (MCP_Registry[serverRef] && extraArgs.length > 0) {
      serverConfig.args = [...serverConfig.args, ...extraArgs];
    }

    console.log(`📦 Configuration: ${serverConfig.command} ${serverConfig.args.join(' ')}`);

    // Update VS Code Settings
    const settings = this.getSettings();
    
    // Initialize mcpServers object if missing
    if (!settings['github.copilot.advanced.mcpServers']) {
      settings['github.copilot.advanced.mcpServers'] = {};
    }

    // Prevent overwriting if exists? Or Update? Agent implies intent, so Update.
    settings['github.copilot.advanced.mcpServers'][shortName] = serverConfig;
    
    this.saveSettings(settings);

    console.log(`✅ INSTALLED: ${shortName}`);
    console.log(`💡 Copilot can now use this tool.`);
    
    return true;
  }

  list() {
    console.log("\nSuggested MCP Servers (Shortcuts):");
    console.log("==================================");
    for (const [key, val] of Object.entries(MCP_Registry)) {
      console.log(`- ${key}: ${val.name} (${val.package})`);
    }
    console.log("\n💡 You can also install ANY package by name:");
    console.log("   $ copilot-kit mcp install @modelcontextprotocol/server-foobar");
    console.log("\n");
  }
}

module.exports = McpManager;
