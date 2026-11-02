# Customer Support Ticket API (Node.js + Express)

## Run
```bash
npm install
npm start
```
Server: http://localhost:3000

## Endpoints
| Method | URL | Purpose |
|---|---|---|
| GET | /api/tickets | List tickets (?status=open&priority=high) |
| GET | /api/tickets/:id | Get one ticket |
| POST | /api/tickets | Create a ticket |
| PUT | /api/tickets/:id | Update a ticket |
| DELETE | /api/tickets/:id | Delete a ticket |
