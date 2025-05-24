import React, { useEffect, useRef } from "react";

function Message({ messageDetails, isUser }) {
  const { message, date, isedited } = messageDetails;
  const formattedDate = new Date(date).toLocaleString();
  const username = useRef();
  
  useEffect(() => {
    const getMessageOwner = async () => {
        console.log(messageDetails.userid, messageDetails)
      const res = await fetch(`/api/get/${messageDetails.userid}`);
      if(res.ok){
        const user = await res.json()
        username.current = user.username;
        console.log(user)
      }

    };
    if(!messageDetails.username){
        getMessageOwner();
    }
  }, []);

  return (
    <div
      className={`max-w-md p-3 my-2 rounded-xl shadow-sm 
      ${
        isUser
          ? "bg-blue-500 text-white ml-auto"
          : "bg-gray-200 text-black mr-auto"
      }
    `}
    >
      <div className="text-sm font-semibold">
        {isUser ? "You" : messageDetails ? messageDetails.username : username.current}
      </div>

      <div className="text-base mt-1 whitespace-pre-wrap break-words">
        {message}
      </div>

      <div className="text-xs mt-2 flex justify-between items-center opacity-80">
        <span>{formattedDate}</span>
        {isedited && <span className="italic">edited</span>}
      </div>
    </div>
  );
}

export default Message;
