import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE, 
    BASKET_ROUTE, 
    DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE,
     SHOP_ROUTE,
     CART_ROUTE,
     TYPE_PAGE_ROUTE,
     SEARCH_PAGE_ROUTE
    } from "./utils/consts";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Cart from "./pages/Cart";
import TypePage from "./pages/TypePage";
import SearchPage from "./pages/SearchPage";

import { Card } from "react-bootstrap";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        // path: '/admin'
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: TYPE_PAGE_ROUTE,
        Component: TypePage
    },
    {
        path: SEARCH_PAGE_ROUTE,
        Component: SearchPage
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: TYPE_PAGE_ROUTE,
        Component: TypePage
    },
    {
        path: SEARCH_PAGE_ROUTE,
        Component: SearchPage
    },
] 
