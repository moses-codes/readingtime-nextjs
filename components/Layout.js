import Navbar from './Navbar';
import { useState } from 'react';
import Footer from './Footer';

const Layout = ({ children, pending }) => {
    return (
        <>
            <Navbar
                pending={pending}
            />
            <div className='min-h-screen'>
                {children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;