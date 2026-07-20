import React, { useContext, useEffect } from 'react';
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

    fetchDevices2
} from "../http/deviceAPI";
import Pages from "../components/Pages";
import SliderCarousel from "../components/SliderCarousel";

const Shop = observer(() => {
    const { device } = useContext(Context)

    // useEffect(() => {
    // fetchTypes().then(data => device.setTypes(data))
    // fetchBrands().then(data => device.setBrands(data))
    // fetchDevices(null, null, 1, 8).then(data => {
    //     device.setDevices(data.rows)
    //     device.setTotalCount(data.count)
    // })
    // fetchDevices().then(data => {
    // console.log(data.rows)
    // device.setDevices(data.rows)
    // device.setTotalCount(data.count)
    // })
    // }, [])

    useEffect(() => {
        // fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 8).then(data => {
        //     device.setDevices(data.rows)
        //     device.setTotalCount(data.count)
        // })

        fetchDevices2(
            // 8,
            // device.selectedType.id,
            null,
            // selectedBrands,
            [],
            // priceRange,
            [],
            // sort,
            {},
            '',
            device.page,
            device.limit
            // 20
        ).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        }).catch(e => console.log(e));
    }, [
        device.page,
        // device.selectedType,
        // device.selectedBrand,
        ]
    )

    return (
        <div className="container catalog" >
            <div className='typeBar_SliderCarousel'>
                <SliderCarousel />

            </div>
            <div className='content'>
                {/* <TypeBar /> */}
                {/* <BrandBar /> */}
                <DeviceList />
                <Pages />
            </div>
        </div>
    );
});

export default Shop;
