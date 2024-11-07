const express = require('express');
const fs = require('fs');
const path = require('path');
const { buildDocsTable, generateMarkdownViewer } = require('./tableGenerator');

const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Main route
app.get('/', (req, res) => {
    const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
    const tableContent = buildDocsTable(__dirname).join('');
    const html = template.replace('<!-- TABLE_CONTENT -->', tableContent);
    res.send(html);
});

// Markdown viewer route
app.get('/view-md/*', (req, res) => {
    try {
        // Remove the leading '/view-md' from the URL
        const relativePath = req.params[0];
        const mdPath = path.join(__dirname, relativePath);
        
        // Verify the file exists and is within the docs directory
        if (!fs.existsSync(mdPath) || !mdPath.startsWith(__dirname)) {
            return res.status(404).send('File not found');
        }

        const content = fs.readFileSync(mdPath, 'utf8');
        const html = generateMarkdownViewer(content, path.basename(mdPath));
        res.send(html);
    } catch (err) {
        console.error('Error serving markdown file:', err);
        res.status(404).send('File not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Documentation server running at http://localhost:${port}`);
    console.log(`Press Ctrl+C to stop the server`);
});