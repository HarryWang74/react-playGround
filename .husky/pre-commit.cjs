#!/usr/bin/env node

const { execSync } = require('child_process');
const { exit } = require('process');

function runCommand(command, description) {
  console.log(`🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed successfully`);
  } catch (_error) {
    console.error(`❌ ${description} failed`);
    exit(1);
  }
}

function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-status', {
      encoding: 'utf8',
    });
    return output
      .trim()
      .split('\n')
      .filter((line) => line.length > 0)
      .map((line) => {
        const parts = line.split('\t');
        const status = parts[0];

        // For renamed/copied files: R088 old-file new-file
        // We want to check the new filename, not the old one
        if (status.startsWith('R') || status.startsWith('C')) {
          return { filename: parts[2], status }; // new filename
        }

        return { filename: parts[1], status };
      });
  } catch (_error) {
    return [];
  }
}

function getModifiedFiles(stagedFiles) {
  const modifiedFiles = [];

  for (const { filename, status } of stagedFiles) {
    if (status === 'D') {
      continue;
    }

    try {
      // Check if file was modified (git diff returns non-zero exit code if there are differences)
      execSync(`git diff --exit-code --quiet "${filename}"`, {
        stdio: 'ignore',
      });
    } catch (_error) {
      // File was modified (non-zero exit code means there are differences)
      modifiedFiles.push(filename);
    }
  }

  return modifiedFiles;
}

async function main() {
  console.log('🚀 Running pre-commit checks...\n');

  // Run tests
  runCommand('npm test', 'Running tests');

  // Store staged files before linting
  const stagedFiles = getStagedFiles();
  console.log(`📋 Found ${stagedFiles.length} staged files`);

  // Run lint with fix
  console.log('🔄 Running linter with auto-fix...');
  try {
    execSync('npm run lint:fix', { stdio: 'inherit' });
  } catch (_error) {
    console.error('❌ Linter failed');
    exit(1);
  }

  // Check if any staged files were modified by the linter
  const modifiedStagedFiles = getModifiedFiles(stagedFiles);

  if (modifiedStagedFiles.length > 0) {
    console.error(
      '\n❌ Lint --fix modified staged files. Please stage the changes and commit again.',
    );
    console.error('Modified staged files:');
    for (const file of modifiedStagedFiles) console.error(`  - ${file}`);
    exit(1);
  }

  console.log('✅ Linter completed successfully with no unstaged changes');

  // Run type checking
  runCommand('npm run type-check', 'Running type checks');

  console.log('\n🎉 All pre-commit checks passed!');
}

main().catch((error) => {
  console.error('❌ Pre-commit hook failed:', error.message);
  exit(1);
});
