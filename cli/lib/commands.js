const fs = require('fs');
const path = require('path');
const https = require('https');
const chalk = require('chalk');
const ora = require('ora');
const AdmZip = require('adm-zip');
const readline = require('readline');

const GITHUB_REPO = 'sk-labs/copilot-kit';
const GITHUB_API = 'https://api.github.com';

async function init(options) {
  const targetPath = path.resolve(options.path || '.');
  const githubPath = path.join(targetPath, '.github');
  const vscodePath = path.join(targetPath, '.vscode');
  const vscodeSettingsPath = path.join(vscodePath, 'settings.json');
  
  if (!options.quiet) {
    console.log(chalk.bold.blue('\n🚀 Copilot Kit Installer\n'));
  }

  // Check if .github exists
  if (fs.existsSync(githubPath) && !options.force && !options.dryRun) {
    console.log(chalk.yellow('⚠️  .github folder already exists!'));
    
    const shouldOverwrite = await askConfirmation(chalk.bold('Do you want to overwrite it? (y/N) '));
    
    if (!shouldOverwrite) {
      console.log(chalk.yellow('Aborted.\n'));
      process.exit(0);
    }
  }

  if (options.dryRun) {
    console.log(chalk.cyan('🔍 Dry run - no changes will be made\n'));
    console.log(chalk.dim('Would download from:'), `https://github.com/${GITHUB_REPO}/archive/${options.branch}.zip`);
    console.log(chalk.dim('Would install to:'), githubPath);
    console.log(chalk.dim('Would install to:'), vscodePath);
    return;
  }

  const spinner = options.quiet ? null : ora('Downloading Copilot Kit...').start();

  try {
    // Download repo archive
    const zipBuffer = await downloadRepo(options.branch);
    
    if (spinner) spinner.text = 'Extracting files...';
    
    // Extract .github and .vscode folders
    const zip = new AdmZip(zipBuffer);
    const entries = zip.getEntries();
    
    // Find the root folder name (copilot-kit-main or similar)
    const rootFolder = entries[0].entryName.split('/')[0];
    
    // Extract .github folder
    let githubFileCount = 0;
    entries.forEach(entry => {
      if (entry.entryName.startsWith(`${rootFolder}/.github/`)) {
        const relativePath = entry.entryName.replace(`${rootFolder}/`, '');
        const targetFile = path.join(targetPath, relativePath);
        
        if (entry.isDirectory) {
          fs.mkdirSync(targetFile, { recursive: true });
        } else {
          fs.mkdirSync(path.dirname(targetFile), { recursive: true });
          fs.writeFileSync(targetFile, entry.getData());
          githubFileCount++;
        }
      }
    });

    // Handle .vscode/settings.json
    if (spinner) spinner.text = 'Configuring VS Code settings...';
    
    const vscodeSettingsEntry = entries.find(e => e.entryName === `${rootFolder}/.vscode/settings.json`);
    
    if (vscodeSettingsEntry) {
      const newSettingsContent = vscodeSettingsEntry.getData().toString('utf8');
      const newSettings = parseJsonWithComments(newSettingsContent);
      
      if (fs.existsSync(vscodeSettingsPath)) {
        // .vscode/settings.json already exists
        if (spinner) spinner.stop();
        
        console.log(chalk.yellow('\n⚠️  .vscode/settings.json already exists!'));
        console.log(chalk.dim('Choose an option:'));
        console.log(chalk.dim('  [R] Replace - Overwrite with Copilot Kit settings'));
        console.log(chalk.dim('  [M] Merge - Add Copilot Kit settings to existing (recommended)'));
        console.log(chalk.dim('  [S] Skip - Keep existing settings'));
        
        const answer = await askQuestion(chalk.bold('\nYour choice (R/M/S): '));
        const choice = answer.trim().toLowerCase();
        
        if (choice === 'r') {
          // Replace
          fs.mkdirSync(vscodePath, { recursive: true });
          fs.writeFileSync(vscodeSettingsPath, JSON.stringify(newSettings, null, 2));
          console.log(chalk.green('✓ Replaced .vscode/settings.json'));
        } else if (choice === 'm') {
          // Merge
          try {
            const existingContent = fs.readFileSync(vscodeSettingsPath, 'utf8');
            const existingSettings = parseJsonWithComments(existingContent);
            const mergedSettings = mergeSettings(existingSettings, newSettings);
            fs.writeFileSync(vscodeSettingsPath, JSON.stringify(mergedSettings, null, 2));
            console.log(chalk.green('✓ Merged Copilot Kit settings into existing settings.json'));
          } catch (error) {
            console.log(chalk.red('✗ Failed to merge settings:'), error.message);
            console.log(chalk.yellow('  Creating backup and replacing...'));
            fs.copyFileSync(vscodeSettingsPath, `${vscodeSettingsPath}.backup`);
            fs.writeFileSync(vscodeSettingsPath, JSON.stringify(newSettings, null, 2));
            console.log(chalk.green('✓ Replaced settings (backup saved)'));
          }
        } else {
          // Skip
          console.log(chalk.yellow('⊘ Skipped .vscode/settings.json'));
        }
        
        if (spinner) spinner.start();
      } else {
        // No existing settings.json, create new
        fs.mkdirSync(vscodePath, { recursive: true });
        fs.writeFileSync(vscodeSettingsPath, JSON.stringify(newSettings, null, 2));
      }
    }

    if (spinner) spinner.succeed(chalk.green('✓ Copilot Kit installed successfully!'));
    
    if (!options.quiet) {
      console.log(chalk.dim(`\n📦 Installed ${githubFileCount} files to ${githubPath}`));
      console.log(chalk.dim(`📦 Configured VS Code settings at ${vscodeSettingsPath}\n`));
      console.log(chalk.bold('🔴 CRITICAL: Reload VS Code for settings to take effect!'));
      console.log(chalk.dim('   Press Ctrl+Shift+P → "Developer: Reload Window"\n'));
      console.log(chalk.bold('Next steps:'));
      console.log(chalk.dim('  1. Reload VS Code (Ctrl+Shift+P → Reload Window)'));
      console.log(chalk.dim('  2. Test auto-detection: "Create a responsive card component"'));
      console.log(chalk.dim('  3. Docs: https://github.com/sk-labs/copilot-kit\n'));
    }
    
    // Ensure process exits cleanly
    process.exit(0);
  } catch (error) {
    if (spinner) spinner.fail(chalk.red('Installation failed'));
    console.error(chalk.red('\n❌ Error:'), error.message);
    process.exit(1);
  }
}

async function update(options) {
  const targetPath = path.resolve(options.path || '.');
  const githubPath = path.join(targetPath, '.github');
  
  if (!fs.existsSync(githubPath)) {
    console.log(chalk.yellow('⚠️  No .github folder found. Run "copilot-kit init" first.\n'));
    process.exit(1);
  }

  const spinner = options.quiet ? null : ora('Updating Copilot Kit...').start();

  try {
    // Backup current installation
    const backupPath = `${githubPath}.backup.${Date.now()}`;
    fs.renameSync(githubPath, backupPath);
    
    // Download latest
    const zipBuffer = await downloadRepo('main');
    
    // Extract
    const zip = new AdmZip(zipBuffer);
    const entries = zip.getEntries();
    const rootFolder = entries[0].entryName.split('/')[0];
    
    let fileCount = 0;
    entries.forEach(entry => {
      if (entry.entryName.startsWith(`${rootFolder}/.github/`)) {
        const relativePath = entry.entryName.replace(`${rootFolder}/`, '');
        const targetFile = path.join(targetPath, relativePath);
        
        if (entry.isDirectory) {
          fs.mkdirSync(targetFile, { recursive: true });
        } else {
          fs.mkdirSync(path.dirname(targetFile), { recursive: true });
          fs.writeFileSync(targetFile, entry.getData());
          fileCount++;
        }
      }
    });

    // Remove backup on success
    fs.rmSync(backupPath, { recursive: true, force: true });

    if (spinner) spinner.succeed(chalk.green('✓ Copilot Kit updated successfully!'));
    if (!options.quiet) {
      console.log(chalk.dim(`\n📦 Updated ${fileCount} files\n`));
    }
    
    // Ensure process exits cleanly
    process.exit(0);
  } catch (error) {
    if (spinner) spinner.fail(chalk.red('Update failed'));
    console.error(chalk.red('\n❌ Error:'), error.message);
    process.exit(1);
  }
}

async function status(options) {
  const targetPath = path.resolve(options.path || '.');
  const githubPath = path.join(targetPath, '.github');
  const vscodePath = path.join(targetPath, '.vscode');
  const vscodeSettingsPath = path.join(vscodePath, 'settings.json');
  
  console.log(chalk.bold.blue('\n📊 Copilot Kit Status\n'));
  
  if (!fs.existsSync(githubPath)) {
    console.log(chalk.red('❌ Not installed'));
    console.log(chalk.dim('   Run "copilot-kit init" to install\n'));
    process.exit(0);
  }

  console.log(chalk.green('✓ Installed'), chalk.dim(`at ${githubPath}`));
  
  // Check structure
  const checks = [
    { path: 'agents', label: 'Agents' },
    { path: 'skills', label: 'Skills' },
    { path: 'prompts', label: 'Prompt Workflows' },
    { path: 'copilot-instructions.md', label: 'Global Instructions' }
  ];

  console.log();
  checks.forEach(check => {
    const fullPath = path.join(githubPath, check.path);
    const exists = fs.existsSync(fullPath);
    const icon = exists ? chalk.green('✓') : chalk.red('✗');
    
    if (exists) {
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        const files = fs.readdirSync(fullPath);
        console.log(`${icon} ${check.label}: ${chalk.cyan(files.length)} items`);
      } else {
        console.log(`${icon} ${check.label}: ${chalk.green('present')}`);
      }
    } else {
      console.log(`${icon} ${check.label}: ${chalk.red('missing')}`);
    }
  });
  
  // Check VS Code settings
  console.log();
  console.log(chalk.bold('VS Code Configuration:'));
  
  if (fs.existsSync(vscodeSettingsPath)) {
    try {
      const settingsContent = fs.readFileSync(vscodeSettingsPath, 'utf8');
      const settings = parseJsonWithComments(settingsContent);
      
      // Check critical setting
      const criticalSetting = settings['chat.customAgentInSubagent.enabled'];
      if (criticalSetting === true) {
        console.log(chalk.green('✓ Auto-detection enabled'), chalk.dim('(chat.customAgentInSubagent.enabled)'));
      } else {
        console.log(chalk.red('✗ Auto-detection disabled'), chalk.dim('(chat.customAgentInSubagent.enabled)'));
        console.log(chalk.yellow('  ⚠️  Run "copilot-kit init" to configure settings'));
      }
      
      // Check other important settings
      const importantSettings = [
        'chat.agentFilesLocations',
        'chat.useAgentSkills',
        'chat.agentSkillsLocations'
      ];
      
      let configuredCount = 0;
      importantSettings.forEach(key => {
        if (settings[key] !== undefined) configuredCount++;
      });
      
      console.log(chalk.dim(`  ${configuredCount}/${importantSettings.length} important settings configured`));
      
    } catch (error) {
      console.log(chalk.yellow('⚠️  settings.json exists but could not be parsed'));
      console.log(chalk.dim(`     Error: ${error.message}`));
    }
  } else {
    console.log(chalk.yellow('⚠️  .vscode/settings.json not found'));
    console.log(chalk.dim('   Run "copilot-kit init" to create it'));
  }
  
  console.log();
  
  // Ensure process exits cleanly
  process.exit(0);
}

function downloadRepo(branch = 'main') {
  return new Promise((resolve, reject) => {
    const url = `https://github.com/${GITHUB_REPO}/archive/refs/heads/${branch}.zip`;
    
    https.get(url, { headers: { 'User-Agent': 'copilot-kit-cli' } }, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        https.get(response.headers.location, { headers: { 'User-Agent': 'copilot-kit-cli' } }, (redirectResponse) => {
          const chunks = [];
          redirectResponse.on('data', chunk => chunks.push(chunk));
          redirectResponse.on('end', () => resolve(Buffer.concat(chunks)));
          redirectResponse.on('error', reject);
        });
      } else if (response.statusCode === 200) {
        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => resolve(Buffer.concat(chunks)));
        response.on('error', reject);
      } else {
        reject(new Error(`Failed to download: HTTP ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

function askConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase().startsWith('y'));
    });
  });
}

function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function parseJsonWithComments(jsonString) {
  // Remove single-line comments (// ...)
  let cleaned = jsonString.replace(/\/\/.*$/gm, '');
  
  // Remove multi-line comments (/* ... */)
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Remove trailing commas before } or ]
  cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');
  
  return JSON.parse(cleaned);
}

function mergeSettings(existing, newSettings) {
  // Merge settings, with Copilot Kit settings taking priority
  const merged = { ...existing };
  
  // Copilot Kit critical settings (always override)
  const criticalSettings = [
    'chat.customAgentInSubagent.enabled',
    'chat.agentFilesLocations',
    'chat.agent.enabled',
    'chat.useAgentSkills',
    'chat.agentSkillsLocations',
    'github.copilot.chat.codeGeneration.useInstructionFiles',
    'chat.instructionsFilesLocations',
    'chat.includeApplyingInstructions',
    'chat.promptFilesLocations',
    'chat.useAgentsMdFile'
  ];
  
  // Override critical settings
  criticalSettings.forEach(key => {
    if (newSettings[key] !== undefined) {
      merged[key] = newSettings[key];
    }
  });
  
  // Add other Copilot Kit settings if not present
  Object.keys(newSettings).forEach(key => {
    if (merged[key] === undefined) {
      merged[key] = newSettings[key];
    }
  });
  
  return merged;
}

module.exports = { init, update, status };
