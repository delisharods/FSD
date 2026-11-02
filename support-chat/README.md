# ShopEasy Live Customer Support Chat (React + Vite)

Components: ChatHeader, MessageList, ChatInput. State via useState, data passed by props.
The support bot lives in `src/bot/` (knowledge base + matching engine).

## Run
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Add your own answers
Edit `src/bot/knowledgeBase.js`: add an object with `phrases`, `keywords`, `reply`, `suggestions`.
