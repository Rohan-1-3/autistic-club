import { useState } from 'react';
import { useLoaderData } from 'react-router';
import AdminPanel from './AdminPanel';
import MemberForm from './MemberForm';
import JoinMemberPrompt from './JoinMemberPromt';
import MessagesList from './MessageList';

function Chatroom() {
  const { user, messages } = useLoaderData();
  const [userData, setUserData] = useState(user);
  const [adminMode, setAdminMode] = useState(false);
  const [memberFormOpen, setMemberFormOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);

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
        {
        userData.ismember && 
        <div>
            <button className="text-white m-auto w-full cursor-pointer">Add Message</button>
        </div>
        }
        <MessagesList messages={messages} currentUsername={userData.username} />
      </main>
    </div>
  );
}

export default Chatroom;