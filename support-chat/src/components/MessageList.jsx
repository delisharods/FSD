import { useEffect, useRef } from 'react';

function MessageList({ messages, typing, onQuickReply }) {
  const endRef = useRef(null);
  const last = messages[messages.length - 1];

  // Scroll to the newest message whenever the list changes
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  return (
    <div className="message-list" role="log" aria-live="polite">
      {messages.map((m) => (
        <div key={m.id} className={`bubble ${m.sender}`}>
          <p>{m.text}</p>
          <small>{m.time}</small>
        </div>
      ))}

      {typing && (
        <div className="bubble support typing" aria-label="Support is typing">
          <span className="d" /><span className="d" /><span className="d" />
        </div>
      )}

      {/* Quick-reply chips under the latest support message */}
      {!typing && last?.sender === 'support' && last.suggestions?.length > 0 && (
        <div className="chips">
          {last.suggestions.map((s) => (
            <button key={s} type="button" onClick={() => onQuickReply(s)}>
              {s}
            </button>
          ))}
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}

export default MessageList;
