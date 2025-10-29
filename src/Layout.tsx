import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

/**
 * Main layout component that provides the application structure with a fixed sidebar navigation
 * and a main content area for rendering child routes.
 */
export function Layout() {
  return (
    <div className="relative h-screen pl-[400px]">
      <div className="w-[400px] absolute top-0 left-0 overflow-y-auto h-screen">
        <Navbar />
      </div>
      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
}
