let currentPath = '.';

async function displayContents(dirPath = '.') {
   currentPath = dirPath;
   const table = document.getElementById('repo-table');
   table.innerHTML = '';
   
   if (dirPath !== '.') {
       const parentPath = dirPath.split('/').slice(0, -1).join('/') || '.';
       const backRow = table.insertRow();
       const backCell = backRow.insertCell(0);
       backCell.colSpan = 2;
       backCell.innerHTML = `<a href="#" onclick="displayContents('${parentPath}'); return false">📁 ..</a>`;
   }
   
   try {
       const response = await fetch(`/api/files/${dirPath}`);
       const items = await response.json();
       
       items.forEach((item, index) => {
           const row = table.insertRow();
           const cell1 = row.insertCell(0);
           const cell2 = row.insertCell(1);
           
           cell1.textContent = `${index + 1}.`;
           
           if (item.isDirectory) {
               cell2.innerHTML = `<a href="#" onclick="displayContents('${item.path}'); return false">📁 ${item.name}</a>`;
           } else if (item.name.endsWith('.yaml') || item.name.endsWith('.json')) {
               cell2.innerHTML = `<a href="#" onclick="loadDoc('${item.path}'); return false">📄 ${item.name}</a>`;
           } else {
               cell2.innerHTML = `<a href="${item.path}">📄 ${item.name}</a>`;
           }
       });
   } catch (error) {
       console.error('Error:', error);
   }
}

async function loadDoc(filePath) {
   try {
       // Get the summary first
       const summaryResponse = await fetch(`/api/summary/${filePath}`);
       const summaryText = await summaryResponse.text();
       
       // Get spec for Swagger UI
       const response = await fetch(`/api/spec/${filePath}`);
       const spec = await response.json();

       // Update UI with split view
       document.querySelector('.doc-viewer').innerHTML = `
           <div style="display: flex; gap: 20px;">
               <pre style="flex: 1; padding: 20px; background: #f5f5f5; border-radius: 4px; line-height: 1.2; overflow-y: auto; max-height: 90vh; max-width: 350px; font-size: 11px">${summaryText}</pre>
               <div id="swagger-ui" style="flex: 2"></div>
           </div>`;

       // Initialize Swagger UI
       SwaggerUIBundle({
           spec: spec,
           dom_id: '#swagger-ui',
           deepLinking: true,
           presets: [
               SwaggerUIBundle.presets.apis,
               SwaggerUIBundle.SwaggerUIStandalonePreset
           ],
       });
   } catch (error) {
       console.error('Error loading doc:', error);
   }
}

displayContents();