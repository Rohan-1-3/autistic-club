function Message({ messageDetails, isUser, handleEditClicked }) {
  const { username, message, date, isedited } = messageDetails;
  const formattedDate = new Date(date).toLocaleString();

  return (
    <div className={`relative max-w-md p-3 my-2 rounded-xl shadow-sm group 
      ${isUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black mr-auto"}
    `}>

{isUser && (
        <button 
          onClick={() => handleEditClicked(messageDetails)} 
          className="absolute bottom-2 right-2 text-white opacity-70 hover:opacity-100"
        >
          ✎
        </button>
      )}
      <div className="w-full text-sm font-semibold mb-1 flex justify-between">
        <p>{isUser ? "You" : username}</p>
        <span>{formattedDate}</span>
      </div>

      <div className="text-base whitespace-pre-wrap break-words">
        {message}
      </div>

      <div className="text-xs mt-2 flex justify-between items-center opacity-80">

        {isedited && <span className="italic ml-2">Edited</span>}
      </div>
    </div>
  );
}

export default Message;