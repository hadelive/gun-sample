const express = require('express');
const Gun = require('gun');

const app = express();
const port = 3001;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Create a Gun instance
const gun = Gun({ web: app.listen(port) });

console.log(`Server 1 is running on http://localhost:${port}`);

// Initialize some data
gun.get('data').put({ field: 'initial value' });

// Listen for updates witness list
// data -> witnesses: [witness_1] -> [witness_1, witness_2]
gun.get('data').on(data => {
  // nodes will check if they sign the tx, 
  // if not they will sign
  // and if have enough witnesses, they will submit the tx
  console.log('Server 1 received update:', data);
});
