import Message from './Message';

export default function MessagesList({ messages, currentUsername, handleEditClicked }) {
  if (!messages || messages.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-20 flex grow">
        There are no messages right now. Come back later.
      </div>
    );
  }
  
  return (
    <div className="space-y-4 flex-grow overflow-y-auto max-h-[500px] px-2">
      {messages.map((message) => (
        <Message
          key={message.id || message.date}
          messageDetails={message}
          isUser={message.username === currentUsername}
          handleEditClicked={handleEditClicked}
        />
      ))}
    </div>
  );
}
