import React from 'react';

function Message({ messageDetails, isUser, handleEditClicked }) {
  const { username, message, date, isedited } = messageDetails;
  const formattedDate = new Date(date).toLocaleString();

  return (
    <div className={`max-w-md p-3 my-2 rounded-xl shadow-sm 
      ${isUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black mr-auto"}
    `}>
      <div className="text-sm font-semibold">
        {isUser ? "You" : username}
      </div>

      <div className="text-base mt-1 whitespace-pre-wrap break-words">
        {message}
      </div>

      <div className="text-xs mt-2 flex justify-between items-center opacity-80">
        <span>{formattedDate}</span>
        {isedited && <span className="italic">Edited</span>}
        {
          isUser && 
          <button onClick={() => handleEditClicked(messageDetails)} className='text-xs underline hover:text-blue-700'>Edit</button>  
        }
      </div>
    </div>
  );
}

export default Message;