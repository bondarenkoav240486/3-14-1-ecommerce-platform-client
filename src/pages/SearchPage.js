import React, { useContext, useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchDevices, fetchTypes, fetchDevices2 } from "../http/deviceAPI";
import Pages from "../components/Pages";

import SortBar from "../components/SortBar"; // Імпорт сортування


const SearchPage = observer(() => {
    const { device } = useContext(Context)
    const [sort, setSort] = useState({ type: 'rating', order: 'asc' }); // Додаємо стан для сортування

    useEffect(() => {
        console.log('sort  :  ', sort)
        console.log('device.devices  :  ', device.getDevices)
        fetchDevices2(
            // device.selectedType.id,
            // device.selectedType.id || 0, // або надайте значення за замовчуванням
            0,
            // 8,
            [], // selectedBrands
            [], // priceRange
            sort,
            device.searchQuery, // Використовуємо searchQuery з device
            device.page,
            device.limit
        ).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
            console.log(data);
        }).catch(e => console.log(e));
    }, [device.page, device.selectedBrand, sort]); // Додаємо залежність від сортування


    return (
        <div className='SearchPage container'
        >
            Результати пошуку
            <SortBar setSort={setSort} /> {/* Використовуємо компонент сортування */}
            <div className='DeviceListAndPages catalog'>
                SEARCH
                {/* <BrandBar /> */}
                <DeviceList />
                <Pages />
            </div>
            {/* </Container> */}
        </div>
    );
});

export default SearchPage;
