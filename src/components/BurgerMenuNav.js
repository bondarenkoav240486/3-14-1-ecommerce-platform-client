import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../index";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';

import TypeBar from "./TypeBar";
import BrandBar from "./BrandBar";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout'; // Альтернативна іконка для "Вийти"
import PersonIcon from '@mui/icons-material/Person'; // Іконка для "Юзер"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Альтернативна іконка для "Юзер"


import { fetchBrands, fetchTypes } from "../http/deviceAPI";

const BurgerMenuNav = observer(() => {
    const { device } = useContext(Context);
    const { user } = useContext(Context);
    const { cart } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, [device]);

    const [open, setOpen] = useState(false);
    const [openBrandBar, setOpenBrandBar] = useState(false);
    const [openBurgerCheckbox, setOpenBurgerCheckbox] = useState(false);

    const totalCount = cart.items.reduce((sum, item) => sum + item.count, 0);

    const icons = [
        <HomeIcon />,
        <ShoppingCartIcon />,
        <AccountCircleIcon />,
        <PersonIcon />,
        <LoginIcon />,
        <CategoryIcon />
    ];
    const menuItems = [
        { text: user.user.email, href: '', icon: icons[2] },
        { text: 'Головна', href: SHOP_ROUTE, icon: icons[0] },
        { text: 'Кошик ' + totalCount, href: CART_ROUTE, icon: icons[1] }
    ];

    const publicMenuItems = [
        { text: 'Гість', href: '', icon: icons[2] },
        { text: 'Авторизація ', href: LOGIN_ROUTE, icon: icons[4] },
        { text: 'Кошик ' + totalCount, href: CART_ROUTE, icon: icons[1] },
        { text: 'Головна', href: SHOP_ROUTE, icon: icons[0] },
    ];


    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const toggleDrawerBrandBar = (newOpen) => () => {
        setOpenBrandBar(newOpen);
    };

    const toggleBurgerCheckbox = (newOpen) => () => {
        setOpenBurgerCheckbox(newOpen);
    };

    useEffect(() => {
        openBurgerCheckbox ? setIsChecked(true) : setIsChecked(false);
    }, [openBurgerCheckbox]);

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        cart.getCartFromLSmethod();
    };

    return (
        <div className='BurgerMenuNav'>
            <MenuIcon onClick={toggleBurgerCheckbox(true)} />
            <Drawer
                className='Drawerburgmenu'
                open={openBurgerCheckbox}
                onClose={toggleBurgerCheckbox(false)}
            >
                {user.isAuth ? (
                    <List>
                        <div>
                            <IconButton
                                // onClick={onClick}
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    margin: '0.6rem 0'
                                }}
                            // disableRipple
                            >
                                <ChevronLeftIcon
                                    onClick={toggleBurgerCheckbox(false)}
                                />
                            </IconButton>
                        </div>
                        {menuItems.map(({ text, href, icon }) => (
                            <ListItem button key={href} onClick={() => navigate(href)}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                        {user.user.role === "ADMIN" && (
                            <ListItem button onClick={() => navigate(ADMIN_ROUTE)}>
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Адмін панель'} />
                            </ListItem>
                        )}
                        <ListItem button onClick={logOut}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Вийти'} />
                        </ListItem>
                    </List>
                ) : (
                    <List>
                        <div>
                            <IconButton>
                                <ChevronLeftIcon onClick={toggleBurgerCheckbox(false)} />
                            </IconButton>
                        </div>
                        {publicMenuItems.map(({ text, href, icon }) => (
                            <ListItem button key={href} onClick={() => navigate(href)}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}


                    </List>
                )}
                <ListItem button onClick={toggleDrawer(true)}>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Каталог'} />
                </ListItem>
                {/* <ListItem button onClick={toggleDrawerBrandBar(true)}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={'БРЕНДИ'} />
                </ListItem> */}
            </Drawer>

            <Drawer open={open} onClose={toggleDrawer(false)}
                className='BurgerMenuDrawerCatalogTypeBar'
            >
                <TypeBar onClose={toggleDrawer(false)} />
            </Drawer>
            {/* <Drawer open={openBrandBar} onClose={() => setOpenBrandBar(false)}>
                <BrandBar />
            </Drawer> */}
        </div>
    );
});

export default BurgerMenuNav;
