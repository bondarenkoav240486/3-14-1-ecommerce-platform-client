import React, { useContext, useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import {
    fetchBrands, fetchDevices, fetchTypes,
    getFilteredDevices,
    fetchDevices2,
} from "../http/deviceAPI";
import Pages from "../components/Pages";

import SortBar from "../components/SortBar";

import Drawer from '@mui/material/Drawer';

// import { Button } from "react-bootstrap";
import Filters from "../components/Filters";
import Button from '@mui/material/Button'; // імпорт Button з Material-UI
import MenuIcon from '@mui/icons-material/Menu'; // імпорт MenuIcon з Material-UI
import FilterListIcon from '@mui/icons-material/FilterList'; // імпорт іконки FilterList з Material-UI
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';




const TypePage = observer(() => {
    const { device } = useContext(Context)
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [sort, setSort] = useState(null); // Новий стан для сортування

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        fetchDevices2(
            // 8,
            device.selectedType.id,
            selectedBrands,
            priceRange,
            sort,
            '',
            device.page,
            device.limit
        ).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        }).catch(e => console.log(e));
    }, [device.page, device.selectedBrand, device.selectedType, sort])

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    return (
        <div className='type container Col'>
            {/* <SortBar /> */}
            <SortBar setSort={setSort} />
            <Button
                onClick={toggleDrawer(true)}
                className='adaptiveFiltersDrawerButton'
            >
                <FilterListIcon
                    onClick={toggleDrawer(true)}
                />
                Фільтри
            </Button>
            <div
                className='Row'
            >
                <div
                    className='brands'
                >
                    {/* <p2>БРЕНД</p2> */}
                    <Filters

                        selectedBrands={selectedBrands}
                        priceRange={priceRange}
                        setSelectedBrands={setSelectedBrands}
                        setPriceRange={setPriceRange}
                    />
                </div>
                <Drawer
                    anchor='left'
                    open={isDrawerOpen}
                    onClose={toggleDrawer(false)}
                    className='DrawerLeft_for_Filters'
                >
                    <Button
                        onClick={toggleDrawer(false)}
                        className='CloseAdaptiveFiltersDrawerButton'
                    >
                        <ChevronLeftIcon 
                            onClick={toggleDrawer(false)}
                        />
                    </Button>
                    <Filters
                        selectedBrands={selectedBrands}
                        priceRange={priceRange}
                        setSelectedBrands={setSelectedBrands}
                        setPriceRange={setPriceRange}
                    />
                </Drawer>
                <div className='DeviceListAndPages'>
                    <DeviceList />
                    <Pages />
                </div>
            </div>
        </div>
    );
});

export default TypePage;
