const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(express.json()); // parse JSON request bodies

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()}  ${req.method} ${req.originalUrl}`);
  next();
});

// ---------- In-memory data (replace with a database later) ----------
const STATUSES = ['open', 'in-progress', 'resolved', 'closed'];
const PRIORITIES = ['low', 'medium', 'high'];

let tickets = [
  {
    id: 1,
    title: 'Cannot log in to my account',
    description: 'Password reset email is not arriving.',
    customerName: 'Asha Patil',
    customerEmail: 'asha@example.com',
    priority: 'high',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Refund not received',
    description: 'Order ORD-123456 was returned 10 days ago.',
    customerName: 'Rahul Verma',
    customerEmail: 'rahul@example.com',
    priority: 'medium',
    status: 'in-progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
let nextId = 3;

// ---------- Helpers ----------
const isText = (v) => typeof v === 'string' && v.trim().length > 0;
const isEmail = (v) => typeof v === 'string' && /^\S+@\S+\.\S+$/.test(v);

/** Returns a list of validation problems for the fields that are present in `body`. */
function checkFields(body) {
  const errors = [];
  if ('title' in body && !isText(body.title)) errors.push('title must be a non-empty string');
  if ('description' in body && !isText(body.description)) errors.push('description must be a non-empty string');
  if ('customerName' in body && !isText(body.customerName)) errors.push('customerName must be a non-empty string');
  if ('customerEmail' in body && !isEmail(body.customerEmail)) errors.push('customerEmail must be a valid email');
  if ('priority' in body && !PRIORITIES.includes(body.priority)) errors.push(`priority must be one of: ${PRIORITIES.join(', ')}`);
  if ('status' in body && !STATUSES.includes(body.status)) errors.push(`status must be one of: ${STATUSES.join(', ')}`);
  return errors;
}

/** Reads :id, validates it and attaches the ticket to req. */
function findTicket(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Ticket id must be a positive whole number' });
  }
  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) {
    return res.status(404).json({ error: `Ticket ${id} not found` });
  }
  req.ticket = ticket;
  next();
}

// ---------- Routes ----------
app.get('/', (req, res) => {
  res.json({ message: 'Customer Support Ticket API', endpoints: '/api/tickets' });
});

// GET all tickets (optional filters: ?status=open&priority=high)
app.get('/api/tickets', (req, res) => {
  const { status, priority } = req.query;
  let result = tickets;
  if (status) result = result.filter((t) => t.status === status);
  if (priority) result = result.filter((t) => t.priority === priority);
  res.status(200).json({ count: result.length, tickets: result });
});

// GET one ticket
app.get('/api/tickets/:id', findTicket, (req, res) => {
  res.status(200).json(req.ticket);
});

// POST create a ticket
app.post('/api/tickets', (req, res) => {
  const body = req.body || {};
  const missing = ['title', 'description', 'customerName', 'customerEmail'].filter((f) => !(f in body));
  const errors = [...missing.map((f) => `${f} is required`), ...checkFields(body)];
  if (errors.length) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  const now = new Date().toISOString();
  const ticket = {
    id: nextId++,
    title: body.title.trim(),
    description: body.description.trim(),
    customerName: body.customerName.trim(),
    customerEmail: body.customerEmail.trim(),
    priority: body.priority || 'medium',
    status: 'open',
    createdAt: now,
    updatedAt: now,
  };
  tickets.push(ticket);
  res.status(201).location(`/api/tickets/${ticket.id}`).json(ticket);
});

// PUT update a ticket (send the fields you want to change)
app.put('/api/tickets/:id', findTicket, (req, res) => {
  const body = req.body || {};
  const editable = ['title', 'description', 'customerName', 'customerEmail', 'priority', 'status'];
  const provided = editable.filter((f) => f in body);

  if (provided.length === 0) {
    return res.status(400).json({ error: `Send at least one of: ${editable.join(', ')}` });
  }
  const errors = checkFields(body);
  if (errors.length) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  provided.forEach((f) => {
    req.ticket[f] = typeof body[f] === 'string' ? body[f].trim() : body[f];
  });
  req.ticket.updatedAt = new Date().toISOString();
  res.status(200).json(req.ticket);
});

// DELETE a ticket
app.delete('/api/tickets/:id', findTicket, (req, res) => {
  tickets = tickets.filter((t) => t.id !== req.ticket.id);
  res.status(200).json({ message: `Ticket ${req.ticket.id} deleted`, deleted: req.ticket });
});

// ---------- Error handling ----------
// Unknown route
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

// Errors thrown anywhere (including invalid JSON bodies)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Support API running at http://localhost:${PORT}`);
});
