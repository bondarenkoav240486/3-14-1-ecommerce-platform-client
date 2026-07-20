import React, { useContext } from 'react';
// import { Switch,  Redirect } from 'react-router-dom'
import { Route, Routes, Link, Navigate } from "react-router-dom";
import Shop from "../pages/Shop";

// import { authRoutes } from '../routes';
import { authRoutes, publicRoutes } from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
    const { user } = useContext(Context)

    return (
        user.isAuth ?
            <Routes>
                {
                    authRoutes.map(({ path, Component }) =>
                        <Route key={path} path={path} Component={Component} />
                    )
                }
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
            :
            <Routes>
                {
                    publicRoutes.map(({ path, Component }) =>
                        <Route key={path} path={path} Component={Component} />
                    )
                }
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
    );
});

export default AppRouter;



//             {user.isAuth && authRoutes.map(({ path, Component }) =>
//                 <Route key={path} path={path} component={Component} exact/>
//             )}
//             {publicRoutes.map(({path, Component}) =>
//                 <Route key={path} path={path} component={Component} exact/>
//             )}
//             <Redirect to={SHOP_ROUTE}/>