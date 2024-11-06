// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('.'));

const excludedRootItems = [
  'server.js',
  'script.js', 
  'index.html', // Only exclude from root
  'node_modules',
  '.git',
  '.gitignore',
  'package.json',
  'package-lock.json',
  '.nixpacks',
];

function getDirectoryContents(dirPath) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  return items
      .filter(item => {
          // Only apply exclusions to root directory
          if (dirPath === '.') {
              return !excludedRootItems.includes(item.name);
          }
          // For subdirectories, exclude only system files
          return !['node_modules', '.git', 'package.json', 'package-lock.json', '.gitignore'].includes(item.name);
      })
      .map(item => ({
          name: item.name,
          isDirectory: item.isDirectory(),
          path: path.join(dirPath, item.name).replace(/\\/g, '/')
      }));
}

app.get('/api/files/*', (req, res) => {
  const requestedPath = req.params[0] || '.';
  try {
      const contents = getDirectoryContents(requestedPath);
      res.json(contents);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.listen(3000);
