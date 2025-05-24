import React from 'react';
import Header from '../Header';
import { Outlet } from 'react-router';
import Footer from '../Footer';

function UserpageLayout() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-grow'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default UserpageLayout;