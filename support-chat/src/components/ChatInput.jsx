import { useState } from 'react';

function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return; // ignore empty messages
    onSend(value);
    setText('');
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        aria-label="Message"
        disabled={disabled}
      />
      <button type="submit" disabled={!text.trim() || disabled}>
        Send
      </button>
    </form>
  );
}

export default ChatInput;
