// Import Outlet from react-router-dom
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <div className="container">
        {/* Outlet is the placeholder where child pages will be injected */}
        <Outlet />
      </div>
    </>
  );
}

export default Layout;

