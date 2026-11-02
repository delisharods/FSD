import { useState, useEffect, useRef } from 'react';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import { getReply, initialContext } from './bot/engine';
import { INITIAL_SUGGESTIONS } from './bot/knowledgeBase';

const now = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const welcome = () => [
  {
    id: 1,
    sender: 'support',
    text: 'Hi! 👋 Welcome to ShopEasy Support. Ask me about orders, returns, refunds, shipping, payments or your account.',
    time: now(),
    suggestions: INITIAL_SUGGESTIONS,
  },
];

function App() {
  const [messages, setMessages] = useState(welcome);
  const [pending, setPending] = useState(0);

  const ctx = useRef(initialContext);   // conversation memory (e.g. waiting for an order number)
  const nextId = useRef(2);
  const timers = useRef([]);
  const readyAt = useRef(0);            // keeps replies in order if the user sends several messages

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const handleSend = (text) => {
    setMessages((prev) => [
      // remove old chips once the user answers
      ...prev.map((m) => ({ ...m, suggestions: undefined })),
      { id: nextId.current++, sender: 'user', text, time: now() },
    ]);

    // Decide the reply now, show it after a human-like delay
    const reply = getReply(text, ctx.current);
    ctx.current = reply.ctx;

    const delay = Math.min(2200, 700 + reply.text.length * 8);
    const showAt = Math.max(Date.now(), readyAt.current) + delay;
    readyAt.current = showAt;

    setPending((n) => n + 1);
    const id = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          sender: 'support',
          text: reply.text,
          time: now(),
          suggestions: reply.suggestions,
        },
      ]);
      setPending((n) => n - 1);
    }, showAt - Date.now());
    timers.current.push(id);
  };

  const handleReset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    readyAt.current = 0;
    ctx.current = initialContext;
    nextId.current = 2;
    setPending(0);
    setMessages(welcome());
  };

  return (
    <div className="chat">
      <ChatHeader title="ShopEasy Support" online onReset={handleReset} />
      <MessageList messages={messages} typing={pending > 0} onQuickReply={handleSend} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default App;
