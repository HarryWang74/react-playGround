import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import Landing from './pages/Landing';
import ContextHooksDemo from './demos/manage-state/customHook/demo';
import ContextHooksReducerDemo from './demos/manage-state/reducer/demo';
import ZustandDemo from './demos/manage-state/zustand/demo';
import AxiosCrudDemo from './demos/api intergation/axio/demo';

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
      {
        path: 'zustand',
        element: <ZustandDemo />,
      },
      {
        path: 'axios-crud',
        element: <AxiosCrudDemo />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
