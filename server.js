const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Sample data
let users = ['existingUser1', 'existingUser2'];
let colleges = ['Harvard University', 'Stanford University', 'Massachusetts Institute of Technology', 'University of Oxford', 'University of Cambridge'];

app.use(bodyParser.json());
app.use(express.static('public')); // To serve index.html

// Endpoint to check username availability
app.get('/check-username', (req, res) => {
  const username = req.query.username;
  if (users.includes(username)) {
    res.send('taken');
  } else {
    res.send('available');
  }
});

// Endpoint to get college suggestions
app.get('/college-suggestions', (req, res) => {
  const query = req.query.query.toLowerCase();
  const suggestions = colleges.filter(college => college.toLowerCase().includes(query));
  res.json(suggestions);
});

// Endpoint to handle registration
app.post('/register', (req, res) => {
  const { name, college, username, password } = req.body;
  // Here, you would typically save the user data to a database
  // For this example, we'll just add the username to the users array
  users.push(username);
  res.send('success');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
