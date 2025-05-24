import Footer from '../Footer';
import { Outlet } from 'react-router';

function HomepageLayout() {
    return (
        <div className='homepage-layout flex flex-col min-h-screen'>
            <main className='flex-grow'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default HomepageLayout;