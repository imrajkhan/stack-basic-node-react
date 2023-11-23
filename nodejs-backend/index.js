const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const PORT = process.env.PORT || 3001; // Define the port

app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON data
app.use(express.json());

// Temporary in-memory data store (Replace this with a database)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

// GET all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// GET single item by ID
app.get('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

// POST - Create a new item
app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name // Assuming the request body has a 'name' field
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT - Update an item
app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  let item = items.find(item => item.id === itemId);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  item.name = req.body.name;
  res.json(item);
});

// DELETE - Delete an item
app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(item => item.id !== itemId);
  res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

