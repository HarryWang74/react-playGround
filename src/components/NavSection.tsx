import { NavLink } from 'react-router-dom';

/**
 * Props for the NavSection component.
 */
export interface NavSectionProps {
  /** The title text displayed in the navigation section */
  title: string;
  /** The route path this section links to */
  link: string;
  /** Optional child elements (typically a list of features or sub-items) */
  children?: React.ReactNode;
}

/**
 * A reusable navigation section component that displays a clickable navigation item
 * with optional child content. Highlights when the route is active.
 *
 * @param title - The title text displayed in the navigation section
 * @param link - The route path this section links to
 * @param children - Optional child elements (typically a list of features or sub-items)
 */
export function NavSection({ title, link, children }: NavSectionProps) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        (isActive ? 'text-i-primary' : '') + ' block hover:bg-i-hover-color'
      }
    >
      <div className="p-4 border-b border-i-border-color">
        <h2>{title}</h2>
        {children && <ul className="list-disc pl-4">{children}</ul>}
      </div>
    </NavLink>
  );
}
