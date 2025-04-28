const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`
  ===============================================
  🚀 Mad Learning with Vision App running!
  
  📱 Open http://localhost:${PORT} in your browser
  
  🔍 Point your camera at objects and press spacebar
     to identify them and hear fun rhymes!
  ===============================================
  `);
});
