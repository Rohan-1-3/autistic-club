import { useState } from 'react';
import { useLoaderData } from 'react-router';
import AdminPanel from './AdminPanel';
import MemberForm from './MemberForm';
import JoinMemberPrompt from './JoinMemberPromt';
import MessagesList from './MessageList';
import { toast } from 'react-toastify';

function Chatroom() {
  const { user, messages: initialMessages } = useLoaderData();

  const [userData, setUserData] = useState(user);
  const [messages, setMessages] = useState(initialMessages);
  
  const [adminMode, setAdminMode] = useState(false);
  const [memberFormOpen, setMemberFormOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  
  const [editMessageFlag, setEditMessageFlag] = useState(false);
  const [messageText, setMessageText] = useState("")
  const [message, setMessage] = useState(null);

  const handleBeingMember = () => {
    setMemberFormOpen(true);
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!agreed) return;
    const res = await fetch(`/api/update/${userData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData, ismember: true }),
    });
    if (res.ok) {
      const updatedUser = await res.json();
      setMemberFormOpen(false);
      setAgreed(false);
      setUserData({ ...updatedUser });
    }
  };

  const handleMessageSend = async ()=>{
    toast("Adding Message....");
    const messageData = {
        userId: userData.id, 
        message: messageText,
    }
    const response = await fetch("/api/message/add",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData)
    })
    if(response.ok){
        const message = await response.json();
        console.log(message)
        setMessages(prev=>[...prev, message]);
        setMessageText("")
    }
  }

  const handleMessageUpdate = async ()=>{
    if(message && message.message === messageText) return;
    toast("Updating Message....");
    const messageData = {
      userId: userData.id,
      message: messageText
    }
    const response = await fetch(`/api/message/update/${message.id}`,{
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData)
    })

    if(response.ok){
      const res = await fetch("/api/message/all");
      if (res.ok) {
          const updatedMessages = await res.json();
          setMessages(updatedMessages)
      }
      setMessageText("")
      setEditMessageFlag(false)
      setMessage("");
    }
  }

  const handleEditClicked = (messageDetails) => {
    setEditMessageFlag(true);
    setMessageText(messageDetails.message);
    setMessage(messageDetails)
  }

  const handleEditCancel = ()=>{
    toast("Canceling Update....");
    setMessageText("")
    setEditMessageFlag(false)
    setMessage("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex flex-col items-center p-6 font-sans text-gray-800">
      <header className="w-full max-w-4xl mb-6">
        {userData.isadmin ? (
          <AdminPanel adminMode={adminMode} setAdminMode={setAdminMode} />
        ) : userData.ismember ? (
          <></>
        ) : (
          <>
            {!memberFormOpen && <JoinMemberPrompt onJoinClick={handleBeingMember} />}
            {memberFormOpen && (
              <MemberForm
                agreed={agreed}
                setAgreed={setAgreed}
                onCancel={() => {
                  setMemberFormOpen(false);
                  setAgreed(false);
                }}
                onSubmit={handleJoin}
              />
            )}
          </>
        )}
      </header>

      <main
        className={`w-full max-w-4xl bg-white rounded-lg p-6 shadow-lg min-h-[400px] overflow-y-auto
        ${!userData.ismember ? 'blur-sm pointer-events-none select-none' : ''}
        transition-filter duration-300`}
      >
        
        <div className='message-container flex flex-col h-full px-4 py-2'>
  <div className="flex-grow overflow-y-auto">
    <MessagesList 
      messages={messages} 
      currentUsername={userData.username} 
      handleEditClicked={handleEditClicked} 
    />
  </div>

  {userData.ismember && (
    <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
      <input 
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        type="text"
        placeholder="Type your message..."
        className='flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
      />

      <div className="flex items-center gap-2">
        <button 
          onClick={editMessageFlag ? handleMessageUpdate : handleMessageSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          {editMessageFlag ? "Update" : "Send"}
        </button>

              {editMessageFlag && (
                <button 
                  onClick={handleEditCancel}
                  className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      </main>
    </div>
  );
}

export default Chatroom;