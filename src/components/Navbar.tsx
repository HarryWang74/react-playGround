import { NavLink } from 'react-router-dom';
import { NavSection } from './NavSection';

/**
 * Navigation sidebar component that displays links to all demo pages.
 * Provides a hierarchical navigation structure with sections for different types of demos.
 */
export function Navbar() {
  return (
    <div>
      <NavLink to="/">
        <h1 className="p-4 text-i-primary border-b border-i-border-color">
          React Playground
        </h1>
      </NavLink>

      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          State Management
        </h2>
        <div className="space-y-1">
          <NavSection title="Custom Hook" link="/context-hooks" />
          <NavSection title="Reducer" link="/context-hooks-reducer" />
          <NavSection title="Zustand" link="/zustand" />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          API Integration
        </h2>
        <div className="space-y-1">
          <NavSection title="Axios CRUD" link="/axios-crud" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
