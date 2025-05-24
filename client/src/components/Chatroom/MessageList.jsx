import Message from './Message';

export default function MessagesList({ messages, currentUsername }) {
  if (!messages || messages.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-20">
        There are no messages right now. Come back later.
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Message
          key={message.id || message.date}
          message={message}
          isUser={message.username === currentUsername}
        />
      ))}
    </div>
  );
}
