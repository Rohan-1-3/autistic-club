import { ToastContainer } from 'react-toastify';
import Footer from '../Footer';
import Header from '../Header';
import { Outlet } from 'react-router';

function ChatroomLayout() {
    return (
        <div className='homepage-layout flex flex-col min-h-screen'>
            <Header />
            <main className='flex-grow'>
                <Outlet />
            </main>
            <Footer />
            <ToastContainer autoClose={1500}/>
        </div>
    );
}

export default ChatroomLayout;