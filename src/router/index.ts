import App from '@/App';
import { createBrowserRouter } from 'react-router-dom';
import Album from '@/view/Album';
import Home from '@/view/Home';
import Song from '@/view/Song';
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
            },
            {
                path: 'song',
                Component: Song
            }
        ]
    }
]);
export default router;
