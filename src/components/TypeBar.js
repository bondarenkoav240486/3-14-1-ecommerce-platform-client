import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useNavigate } from 'react-router-dom';
import { TYPE_PAGE_ROUTE } from "../utils/consts";

import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import WatchIcon from '@mui/icons-material/Watch';
import TvIcon from '@mui/icons-material/Tv';
import KitchenIcon from '@mui/icons-material/Kitchen';

const iconMapping = {
    'Телефони': <PhoneAndroidIcon />,
    'Ноутбуки': <LaptopMacIcon />,
    'Навушники': <HeadphonesIcon />,
    'Годинники': <WatchIcon />,
    'Телевізори': <TvIcon />,
    'Холодильники': <KitchenIcon />
    // Додайте інші іконки для інших типів
};

const TypeBar = observer(({ onClose }) => {
    const { device } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className='TypeBar'>
            <IconButton 
                onClick={onClose} 
                // style={{ border: 'none', outline: 'none', margin: '10 0' }} 
                disableRipple
                className='ButtonChevronLeftIcon'
            >
                <ChevronLeftIcon />
            </IconButton>
            <List className='typeBar'>
                {device.types.map(type => (
                    <ListItem
                        button
                        style={{ cursor: 'pointer', margin: '10px 0' }}
                        selected={type.id === device.selectedType.id}
                        onClick={() => {
                            device.setSelectedType(type);
                            navigate(TYPE_PAGE_ROUTE);
                        }}
                        key={type.id}
                    >
                        <ListItemIcon>
                            {iconMapping[type.name] || <PhoneAndroidIcon />} {/* Default icon if none is found */}
                        </ListItemIcon>
                        <ListItemText primary={type.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
});

export default TypeBar;

