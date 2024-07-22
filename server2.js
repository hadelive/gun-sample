const express = require('express');
const Gun = require('gun');

const app = express();
const port = 3002;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Create a Gun instance and connect to the first server
const gun = Gun({
  peers: ['http://localhost:3001/gun'],
  web: app.listen(port)
});

console.log(`Server 2 is running on http://localhost:${port}`);

// Listen for updates
gun.get('data').on(data => {
  console.log('Server 2 received update:', data);
});
