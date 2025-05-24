import React from 'react';

function Message({ message, isUser }) {
  const { username, text, date, isEdited } = message;
  const formattedDate = new Date(date).toLocaleString();

  return (
    <div className={`max-w-md p-3 my-2 rounded-xl shadow-sm 
      ${isUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black mr-auto"}
    `}>
      <div className="text-sm font-semibold">
        {isUser ? "You" : username}
      </div>

      <div className="text-base mt-1 whitespace-pre-wrap break-words">
        {text}
      </div>

      <div className="text-xs mt-2 flex justify-between items-center opacity-80">
        <span>{formattedDate}</span>
        {isEdited && <span className="italic">edited</span>}
      </div>
    </div>
  );
}


export default Message;