import { useNavigate } from 'react-router';

function Header({fromChatroom = false}) {
    const navigate = useNavigate()

    const handleLogout = async ()=>{
        await fetch("/api/logout",{
            method: "POST",
            credentials: "include"
        })
        navigate("/")
    }

    return (
        <header className="w-full bg-blue-600 text-white shadow-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
            <span className="text-2xl">💬</span>
            <h1 className="text-lg font-semibold tracking-wide">AutiChat</h1>
        </div>

        {fromChatroom && <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-blue-100 transition"
        >
            Logout
        </button>}
        </header>
    );
}

export default Header;