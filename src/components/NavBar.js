import React, { useContext } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.svg';
import BurgerMenuNav from "./BurgerMenuNav";
import Search from "./Search";
import TypeBar from "./TypeBar";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import Drawer from '@mui/material/Drawer';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';

import StorefrontIcon from '@mui/icons-material/Storefront';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CloseIcon from '@mui/icons-material/Close';




const NavBar = observer(() => {
    const [openBrandBar, setOpenBrandBar] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openSearch, setOpenSearch] = React.useState(false);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [stateSearch, setStateSearch] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawerTop = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const toggleDrawerTopSearch = (anchor, openSearch) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setStateSearch({ ...stateSearch, [anchor]: openSearch });
    };

    const { user } = useContext(Context);
    const { cart } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        cart.getCartFromLSmethod();
    };

    const totalCount = cart.items.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="full-width-navbar">
            <Navbar className='container' bg="primary" variant="primary">
                <BurgerMenuNav />

                <NavLink className='logo' to={SHOP_ROUTE}>
                    <StorefrontIcon />
                    <div className='text'>
                        <span className={'main_text'}>
                            Pern React Shop
                        </span>
                        <span className={'sub_text'}>
                            Pern React Goods
                        </span>
                    </div>
                </NavLink>
                <Search className='SearchInNavbar' />
                <a onClick={toggleDrawerTopSearch('top', true)} className='button SearchButton'>
                    <SearchIcon />
                </a>

                {user.isAuth ?
                    <Nav className="ml-auto">
                        <div className='catalogButton Col button'>
                            <AccountCircleIcon />
                            <div className='text'>
                                {user.user.email}
                            </div>
                        </div>
                        <div
                            className='catalogButton Col button'
                            onClick={() => navigate(SHOP_ROUTE)}
                        >
                            <HomeIcon />
                            <span className='text'>Головна</span>
                        </div>
                        <div
                            className='catalogButton Col button'
                            onClick={toggleDrawerTop('top', true)}
                        >
                            <CategoryIcon />
                            <div className='text'>
                                Каталог
                            </div>
                        </div>

                        {user.user.role === "ADMIN" ?
                            <a className='Col button admin text' onClick={() => navigate(ADMIN_ROUTE)}>
                                <AdminPanelSettingsOutlinedIcon />
                                Адмін
                            </a>
                            :
                            ''
                        }
                        <div className="cart Row button" onClick={() => navigate(CART_ROUTE)}>
                            <div className='Col IconAndtext text'>
                                <ShoppingCartIcon />
                                Кошик
                            </div>
                            <div className='TotalCountNumber'>
                                {totalCount}
                            </div>
                        </div>
                        <a variant={"outline-light"} onClick={() => logOut()} className="Col button ">
                            <LogoutOutlinedIcon />
                            <span
                                className='text'
                            >
                                Вийти
                            </span>
                        </a>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <div className='catalogButton Col button'>
                            <AccountCircleIcon />
                            <div className='text'>
                                Гість
                            </div>
                        </div>
                        <div
                            className='catalogButton Col button'
                            onClick={() => navigate(SHOP_ROUTE)}
                        >
                            <HomeIcon />
                            <span className='text'>Головна</span>
                        </div>
                        <div className='catalogButton Col button' onClick={toggleDrawerTop('top', true)}>
                            <CategoryIcon />
                            <div className='text'>
                                Каталог
                            </div>
                        </div>

                        <div className="cart Row button" onClick={() => navigate(CART_ROUTE)}>
                            <div className='Col IconAndtext'>
                                <ShoppingCartIcon />
                                <div class="text">Кошик</div>
                            </div>
                            <div className='TotalCountNumber'>
                                {totalCount}
                            </div>
                        </div>
                        <a variant={"outline-light"} className='button Col autorization' onClick={() => navigate(LOGIN_ROUTE)}>
                            <LoginIcon />
                            <div class="text">Авторизація</div>
                        </a>
                    </Nav>
                }
                {(['top']).map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Drawer
                            className='DrawerTop Catalog'
                            anchor={'top'}
                            open={state['top']}
                            onClose={toggleDrawerTop(anchor, false)}

                        >
                            <CloseIcon
                                onClick={toggleDrawerTop(anchor, false)}
                                className='CloseDrawerTopCatalogIcon'
                            />
                            <TypeBar onClose={() => toggleDrawerTop(anchor, false)} />
                        </Drawer>
                    </React.Fragment>
                ))}
                {(['top']).map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Drawer
                            className='DrawerTopSearch '
                            anchor={'top'}
                            open={stateSearch['top']}
                            onClose={toggleDrawerTopSearch(anchor, false)}
                        >
                            <CloseIcon
                                onClick={toggleDrawerTopSearch(anchor, false)}
                                className='CloseDrawerTopSearchIcon'
                            />
                            <Search />


                        </Drawer>
                    </React.Fragment>
                ))}
            </Navbar>
        </div>
    );
});

export default NavBar;
