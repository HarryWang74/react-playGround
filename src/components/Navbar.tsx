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

      <NavSection
        title="Context + Provider + Custom Hooks"
        link="/context-hooks"
      />

      <NavSection
        title="Context + Provider + Custom Hook + Reducer"
        link="/context-hooks-reducer"
      />
    </div>
  );
}

export default Navbar;
