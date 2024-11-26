import App from '@/App';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter([
    {
        path: '*',
        Component: App,
        children: [
            {
                path: '/*',
                Component: lazy(() => import('@/view/Home'))
            }
        ]
    }
]);
export default router;
