const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const app = express();
const PORT = 3000;

app.use(express.static('public', { extensions: ['html'], index: false }));

// Serve the home page with welcome content
app.get('/', (req, res) => {
  const welcomePath = path.join(__dirname, 'src', 'welcome.md');

  fs.readFile(welcomePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error loading welcome content');
    const htmlContent = marked(data);
    const templatePath = path.join(__dirname, 'public', 'index.html');

    fs.readFile(templatePath, 'utf8', (err, template) => {
      if (err) return res.status(500).send('Error loading index page');
      const populatedTemplate = template.replace('{{content}}', htmlContent);
      res.send(populatedTemplate);
    });
  });
});

// Corrected dynamic route to handle markdown files in nested folders
app.get('/markdown/*', (req, res) => {
  const filePath = path.join(__dirname, 'src', req.params[0] + '.md'); // Fix for nested paths

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).send('File not found: ' + filePath);
    const htmlContent = marked(data);
    res.send(htmlContent);
  });
});






app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
