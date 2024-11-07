const fs = require('fs');
const path = require('path');

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function buildDocsTable(dir, basePath = '') {
    let rows = [];
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);
        
        if (item === 'node_modules' || item === 'index.html' || item === 'index.js' || item === 'public') {
            return;
        }

        if (stats.isDirectory()) {
            rows.push(`
                <tr>
                    <td style="padding-left: 20px;">📁 ${item}</td>
                    <td>Directory</td>
                    <td>${new Date(stats.mtime).toLocaleDateString()}</td>
                </tr>
            `);
            const subRows = buildDocsTable(fullPath, path.join(basePath, item));
            rows = rows.concat(subRows);
        } else if (path.extname(item) === '.md') {
            // Fix the URL path by ensuring it starts with a forward slash
            const urlPath = '/' + path.join(basePath, item).replace(/\\/g, '/');
            rows.push(`
                <tr>
                    <td style="padding-left: 20px;">
                        <a href="${urlPath}" style="text-decoration: none; color: #569cd6;">
                            📄 ${item}
                        </a>
                    </td>
                    <td>${formatBytes(stats.size)}</td>
                    <td>${new Date(stats.mtime).toLocaleDateString()}</td>
                </tr>
            `);
        }
    });

    return rows;
}

function generateMarkdownViewer(content, filename) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${filename}</title>
    <link rel="stylesheet" href="/style.css">
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>
<body>
    <a href="/" class="back-button">Back to Directory</a>
    <div id="content"></div>
    <script>
        document.getElementById('content').innerHTML = marked.parse(\`${content.replace(/`/g, '\\`')}\`);
    </script>
</body>
</html>`;
}

module.exports = {
    buildDocsTable,
    generateMarkdownViewer
};