function Message({ messageDetails, isUser, handleEditClicked, isAdmin, handleDeleteClicked }) {
  const { username, message, date, isedited } = messageDetails;
  const formattedDate = new Date(date).toLocaleString();

  return (
    <div className={`relative max-w-md p-3 my-2 rounded-xl shadow-sm group 
      ${isUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black mr-auto"}
    `}>

      <div className="absolute bottom-2 right-2 text-white cursor-pointer opacity-70 ">
        {isUser && (
        <span 
          onClick={() => handleEditClicked(messageDetails)}
          className="text-green-500"
        >
          ✎
        </span>
      )}
      {
        (isUser || isAdmin) && (
          <span 
          className="text-red-500"
          onClick={() => handleDeleteClicked(messageDetails)} 
        >
          🗑
        </span>
        )
      }
      </div>

      <div className="w-full text-sm font-semibold mb-1 flex justify-between">
        <p>{isUser ? "You" : username}</p>
        <span>{formattedDate}</span>
      </div>

      <div className="text-base whitespace-pre-wrap break-words">
        <p>{message}{isedited && <span className="italic text-xs ml-1">(Edited)</span>}</p>
      </div>
    </div>
  );
}

export default Message;