const fs = require('fs');
const path = require('path');
const https = require('https');
const chalk = require('chalk');
const ora = require('ora');
const AdmZip = require('adm-zip');

const GITHUB_REPO = 'sk-labs/copilot-kit';
const GITHUB_API = 'https://api.github.com';

async function init(options) {
  const targetPath = path.resolve(options.path || '.');
  const githubPath = path.join(targetPath, '.github');
  
  if (!options.quiet) {
    console.log(chalk.bold.blue('\n🚀 Copilot Kit Installer\n'));
  }

  // Check if .github exists
  if (fs.existsSync(githubPath) && !options.force && !options.dryRun) {
    console.log(chalk.yellow('⚠️  .github folder already exists!'));
    console.log(chalk.dim('   Use --force to overwrite\n'));
    process.exit(1);
  }

  if (options.dryRun) {
    console.log(chalk.cyan('🔍 Dry run - no changes will be made\n'));
    console.log(chalk.dim('Would download from:'), `https://github.com/${GITHUB_REPO}/archive/${options.branch}.zip`);
    console.log(chalk.dim('Would install to:'), githubPath);
    return;
  }

  const spinner = options.quiet ? null : ora('Downloading Copilot Kit...').start();

  try {
    // Download repo archive
    const zipBuffer = await downloadRepo(options.branch);
    
    if (spinner) spinner.text = 'Extracting files...';
    
    // Extract .github folder
    const zip = new AdmZip(zipBuffer);
    const entries = zip.getEntries();
    
    // Find the root folder name (copilot-kit-main or similar)
    const rootFolder = entries[0].entryName.split('/')[0];
    
    // Extract only .github folder
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

    if (spinner) spinner.succeed(chalk.green('✓ Copilot Kit installed successfully!'));
    
    if (!options.quiet) {
      console.log(chalk.dim(`\n📦 Installed ${fileCount} files to ${githubPath}\n`));
      console.log(chalk.bold('Next steps:'));
      console.log(chalk.dim('  1. Open VS Code with GitHub Copilot extension'));
      console.log(chalk.dim('  2. Try: @frontend-specialist or /brainstorm'));
      console.log(chalk.dim('  3. Docs: https://github.com/sk-labs/copilot-kit\n'));
    }
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
  } catch (error) {
    if (spinner) spinner.fail(chalk.red('Update failed'));
    console.error(chalk.red('\n❌ Error:'), error.message);
    process.exit(1);
  }
}

async function status(options) {
  const targetPath = path.resolve(options.path || '.');
  const githubPath = path.join(targetPath, '.github');
  
  console.log(chalk.bold.blue('\n📊 Copilot Kit Status\n'));
  
  if (!fs.existsSync(githubPath)) {
    console.log(chalk.red('❌ Not installed'));
    console.log(chalk.dim('   Run "copilot-kit init" to install\n'));
    return;
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
  
  console.log();
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

module.exports = { init, update, status };
