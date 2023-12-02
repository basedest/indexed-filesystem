import MainPage from '@pages/main';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/indexed-filesystem',
        element: <MainPage />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
