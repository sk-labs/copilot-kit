#!/usr/bin/env node

const { program } = require('commander');
const { init, update, status, mcp } = require('../lib/commands');
const pkg = require('../package.json');

program
  .name('copilot-kit')
  .description('CLI tool to install Custom Agents, Skills & Prompt Workflows for GitHub Copilot')
  .version(pkg.version);

program
  .command('init')
  .description('Install .github structure into your project')
  .option('-f, --force', 'Overwrite existing .github folder')
  .option('-p, --path <path>', 'Install in specific directory', '.')
  .option('-b, --branch <branch>', 'Use specific branch', 'main')
  .option('-q, --quiet', 'Suppress output (for CI/CD)')
  .option('--dry-run', 'Preview actions without executing')
  .action(init);

program
  .command('update')
  .description('Update to the latest version')
  .option('-p, --path <path>', 'Project directory', '.')
  .option('-q, --quiet', 'Suppress output')
  .action(update);

program
  .command('status')
  .description('Check Copilot Kit status')
  .option('-p, --path <path>', 'Path to project root', '.')
  .action((options) => {
    status(options);
  });

program
  .command('mcp [action] [target]')
  .description('Manage MCP servers (install, list)')
  .option('-p, --path <path>', 'Path to project root', '.')
  .action((action, target, options) => {
    mcp({ ...options, action, target });
  });

program.parse(process.argv); // Changed to pass process.argv
