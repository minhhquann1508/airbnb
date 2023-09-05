import {lazy} from 'react';
import {Route} from 'react-router-dom'
const routes = [
    {
        path:'',
        element:lazy(() => import('../templates/UserTemplate')),
        nested:[
            {
                path: '/',
                element:lazy(() => import('../pages/userPage/Home'))
            },
            {
                path: '/detail/:id',
                element:lazy(() => import('../pages/userPage/Detail'))
            },
            {
                path: '/login',
                element:lazy(() => import('../pages/userPage/Login'))
            },
            {
                path: '/register',
                element:lazy(() => import('../pages/userPage/Register'))
            },
            {
                path: '/infomation/:id',
                element:lazy(() => import('../pages/userPage/Infomation'))
            },
            {
                path: '/journey/:id',
                element:lazy(() => import('../pages/userPage/Journey'))
            },
            {
                path: '/finding/:id',
                element:lazy(() => import('../pages/userPage/FindingLst'))
            },
            {
                path: '/help',
                element:lazy(() => import('../pages/userPage/Help'))
            },
            {
                path: '/location/:keyword',
                element:lazy(() => import('../pages/userPage/Location'))
            },
        ]
    },
    {
        path:'/admin',
        element:lazy(() => import('../templates/AdminTemplate')),
        nested:[
            {
                path: '/admin/manageUser',
                element:lazy(() => import('../pages/adminPage/ManageUser'))
            },
            {
                path: '/admin/manageLocation',
                element:lazy(() => import('../pages/adminPage/ManageLocation'))
            },
            {
                path: '/admin/manageRoom',
                element:lazy(() => import('../pages/adminPage/ManageRoom'))
            },
            {
                path: '/admin/manageRoomOrder',
                element:lazy(() => import('../pages/adminPage/ManageRoomOrder'))
            },
        ]
    }
]

export const renderRoutes = () => {
    return routes.map((route,index) => {
        if(route.nested) {
            return (
                <Route key={index} path={route.path} element={<route.element/>}>
                    {route.nested.map((item) => (
                        <Route 
                            key={item.path}
                            path={item.path}
                            element={<item.element/>}
                        />
                    ))}
                </Route>
            )
        }
        else {
            return (
                <Route key={route.path} path={route.path} element={<route.element />} />
            );
        }
    })

}

