import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import Landing from './pages/Landing';
import { ContextHooksDemo } from './demos/context+provider+customHooks';
import { ContextHooksReducerDemo } from './demos/context+provider+customHook+reducer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'context-hooks',
        element: <ContextHooksDemo />,
      },
      {
        path: 'context-hooks-reducer',
        element: <ContextHooksReducerDemo />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
