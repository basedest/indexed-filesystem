import MainPage from '@pages/main';
import { useIdbStore } from '@shared/lib/idb/IdbStore';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App as AntdApp } from 'antd';

const router = createBrowserRouter([
    {
        // TODO: take basePath from config
        path: '/indexed-filesystem/*',
        element: <MainPage />,
        loader: () => {
            const { getInstance } = useIdbStore.getState();
            return getInstance();
        },
    },
]);

export default function App() {
    return (
        <AntdApp>
            <RouterProvider router={router} />
        </AntdApp>
    );
}
