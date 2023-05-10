import Navbar from './Navbar';
// import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default Layout;