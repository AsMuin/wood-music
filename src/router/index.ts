import App from '@/App';
import { createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter([
    {
        path: '*',
        Component: App,
        children: [
            {
                // path: '/',
            }
        ]
    }
]);
export default router;
