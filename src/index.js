#!/usr/bin/env node
const chalk = require('chalk');
const { execSync } = require('child_process');

async function main() {
  console.log(chalk.cyan('\n💻 Language Stats v1.0.0\n'));
  const repos = JSON.parse(execSync('gh repo list yksanjo --limit 100 --json name', { encoding: 'utf8' }));
  const langs = {};
  for (const repo of repos) {
    try {
      const info = JSON.parse(execSync(`gh repo view yksanjo/${repo.name} --json languages`, { encoding: 'utf8' }));
      if (info.languages) info.languages.forEach(l => langs[l.name] = (langs[l.name] || 0) + l.size);
    } catch {}
  }
  console.log(chalk.yellow('Language Usage:'));
  Object.entries(langs).sort((a, b) => b[1] - a[1]).forEach(([lang, size]) => console.log(`  ${lang}: ${(size/1000).toFixed(1)}KB`));
}
if (require.main === module) main().catch(console.error);
module.exports = { main };
