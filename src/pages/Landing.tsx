/**
 * Landing page component that serves as the home page of the React Playground.
 * Displays a welcome message and brief introduction to the available demos.
 */
export function Landing() {
  return (
    <div>
      <h1 className="mb-4">Welcome to React Playground</h1>
      <p className="text-lg text-gray-600 mb-6">
        Explore various React patterns and concepts through interactive demos.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Available Demos</h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">State Management</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Custom Hook:</strong> Learn how to use React Context
                with custom hooks for state management.
              </li>
              <li>
                <strong>Reducer:</strong> Explore advanced state management
                using Context with useReducer pattern.
              </li>
              <li>
                <strong>Zustand:</strong> Discover lightweight state management
                with Zustand - no Provider needed, simple and performant.
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-8">
          <p className="text-gray-600">
            Select a demo from the sidebar to get started.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Landing;
