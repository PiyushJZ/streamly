import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function walkAndRun(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  if (items.some(i => i.name === 'package.json')) {
    console.log(`Running in ${dir}`);
    execSync('npm install', { cwd: dir, stdio: 'inherit' });
  }

  for (const item of items) {
    if (item.isDirectory() && item.name !== 'node_modules') {
      walkAndRun(path.join(dir, item.name));
    }
  }
}

walkAndRun(path.resolve(__dirname, "packages"));
