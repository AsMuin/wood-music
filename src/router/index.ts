import App from '@/App';
import { createBrowserRouter } from 'react-router-dom';
import Album from '@/view/Album';
import Home from '@/view/Home';
const router = createBrowserRouter([
    {
        path: '*',
        Component: App,
        children: [
            {
                path: '',
                Component: Home
            },
            {
                path: 'album/:id',
                Component: Album
            }
        ]
    }
]);
export default router;
