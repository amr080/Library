const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');
const app = express();

app.use(express.static('public'));

const excludedItems = [
    'node_modules',
    '.git',
    '.gitignore',
    'package.json',
    'package-lock.json',
    '.nixpacks',
    'server.js',
    'railway.json',
    'README.md',
    'src',
    'public',
    'index.html',
    'style.css',
    'script.js'
];

async function getDirectoryContents(dirPath) {
    const items = await fs.readdir(dirPath, { withFileTypes: true });
    return items
        .filter(item => !excludedItems.includes(item.name))
        .map(item => ({
            name: item.name,
            isDirectory: item.isDirectory(),
            path: path.join(dirPath, item.name).replace(/\\/g, '/')
        }));
}

app.get('/api/files/*', async (req, res) => {
    const requestedPath = req.params[0] || '.';
    try {
        const contents = await getDirectoryContents(requestedPath);
        res.json(contents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/spec/*', async (req, res) => {
    const filePath = req.params[0];
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const spec = filePath.endsWith('.yaml') || filePath.endsWith('.yml') 
            ? yaml.load(fileContent)
            : JSON.parse(fileContent);
        res.json(spec);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/summary/*', async (req, res) => {
    const filePath = req.params[0];
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const spec = filePath.endsWith('.yaml') ? yaml.load(content) : JSON.parse(content);
        
        const validMethods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
        
        const summary = {
            title: spec.info.title,
            endpoints: Object.entries(spec.paths || {}).map(([path, methods]) => 
                Object.keys(methods)
                    .filter(method => validMethods.includes(method.toLowerCase()))
                    .map(method => `${method.toUpperCase()} ${path}`)
            ).flat(),
            schemas: spec.components?.schemas ? 
                Object.keys(spec.components.schemas).map(schema => schema) : []
        };

        const formattedSummary = `# ${summary.title}\n
## Endpoints\n${summary.endpoints.sort().join('\n')}\n
## Schemas\n${summary.schemas.sort().join('\n')}`;

        res.type('text').send(formattedSummary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});