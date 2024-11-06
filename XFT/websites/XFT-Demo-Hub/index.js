const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const host = '0.0.0.0';

// Serve static files from 'public'
app.use(express.static('public'));

// Allowed scripts (whitelist)
const allowedScripts = ['test.py', 'xft.py', 'usdx.py', 'customers.py', 'distributions.py', 'rusdx.py']; 

// Route to run Python code
app.get('/run_code', (req, res) => {
  const scriptName = req.query.script;

  // Validate the script name
  if (!allowedScripts.includes(scriptName)) {
    res.status(400).send({ error: 'Invalid script name' });
    return;
  }

  // Construct the full path to the script securely
  const scriptPath = path.join(__dirname, 'src', scriptName);

  // Execute the script
  exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      res.status(500).send({ error: error.message });
      return;
    }
    res.send({ output: stdout });
  });
});

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
