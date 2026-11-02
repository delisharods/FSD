function ChatHeader({ title, online, onReset }) {
  return (
    <header className="chat-header">
      <div className="header-main">
        <span className={online ? 'dot online' : 'dot'} aria-label={online ? 'Online' : 'Offline'} />
        <div>
          <h2>{title}</h2>
          <p>{online ? 'Online · replies in seconds' : 'Offline'}</p>
        </div>
      </div>
      <button type="button" className="reset" onClick={onReset}>
        New chat
      </button>
    </header>
  );
}

export default ChatHeader;
