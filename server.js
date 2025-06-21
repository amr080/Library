// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const app = express();
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
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


app.use('/:folder', (req, res, next) => {
    const folderPath = req.params.folder;
    if (fs.existsSync(`./${folderPath}/index.js`)) {
        // Set up folder-specific static files
        app.use(express.static(`./${folderPath}/public`));
        
        // Handle Python script execution
        app.get(`/${folderPath}/run_code`, (req, res) => {
            const scriptName = req.query.script;
            const scriptPath = path.join(__dirname, folderPath, 'src', scriptName);
            
            exec(`python ${scriptPath}`, (error, stdout, stderr) => {
                if (error) return res.status(500).send({ error: error.message });
                res.send({ output: stdout });
            });
        });
    }
    next();
});


// app.listen(3000);

module.exports = app;
