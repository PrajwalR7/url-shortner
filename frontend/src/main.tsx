import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Default from './components/Default'
import Error404 from './components/Error404'
import Error500 from './components/Error500'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Default />
    },
    {
        path: '/invalid',
        element: <Error404 />
    },
    {
        path: '/internal-error',
        element: <Error500 />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
