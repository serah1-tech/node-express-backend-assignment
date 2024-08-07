const express = require('express');
const app = express();
const port = 3001;  // Changed port to 3001

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User Authentication (POST /api/auth/login)
const users = [
  { username: 'user1', password: 'password1' } // In a real app, passwords should be hashed
];

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // In a real app, generate a token and return it
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Mock expense data
let expenses = [];

// Get all expenses (GET /api/expenses)
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

// Add a new expense (POST /api/expenses)
app.post('/api/expenses', (req, res) => {
  const expense = req.body;
  expenses.push(expense);
  res.status(201).json(expense);
});

// Update an expense (PUT /api/expenses/:id)
app.put('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  const updatedExpense = req.body;
  expenses = expenses.map(e => (e.id === id ? updatedExpense : e));
  res.json(updatedExpense);
});

// Delete an expense (DELETE /api/expenses/:id)
app.delete('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  expenses = expenses.filter(e => e.id !== id);
  res.status(204).send();
});

// Calculate total expenses (GET /api/expense)
app.get('/api/expense', (req, res) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  res.json({ total });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
