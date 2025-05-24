import { useState } from 'react';
import { useLoaderData } from 'react-router';
import AdminPanel from './AdminPanel';
import MemberForm from './MemberForm';
import JoinMemberPrompt from './JoinMemberPromt';
import MessagesList from './MessageList';

function Chatroom() {
  const { user, messages: initialMessages } = useLoaderData();

  const [userData, setUserData] = useState(user);
  const [messages, setMessages] = useState(initialMessages);
  
  const [adminMode, setAdminMode] = useState(false);
  const [memberFormOpen, setMemberFormOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [messageText, setMessageText] = useState("")

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
        
        <div className='message-container flex flex-col'>
            <MessagesList messages={messages} currentUsername={userData.username} />
            {
                userData.ismember && 
                <div>
                    <input value={messageText} onChange={(e)=>setMessageText(e.target.value)} type="text" className='border border-black w-full'/>
                    <button onClick={handleMessageSend} className="text-white m-auto cursor-pointer">Send</button>
                </div>
            }
        </div>
      </main>
    </div>
  );
}

export default Chatroom;