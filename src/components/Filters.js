import React, { useState, useContext } from 'react';
import { observer } from "mobx-react-lite";
import { ListGroup, Button, Container, Row, Col } from "react-bootstrap";
import { Context } from "../index";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {
    fetchDevices, getFilteredDevices,
    fetchDevices2
} from "../http/deviceAPI";

const Filters = observer(({
    selectedBrands,
    priceRange,
    setSelectedBrands,
    setPriceRange,
}) => {
    const { device } = useContext(Context);
    // const [selectedBrands, setSelectedBrands] = useState([]);
    // const [priceRange, setPriceRange] = useState([0, 100000]);
    // debugger
    const handleBrandClick = (brand) => {
        if (selectedBrands.includes(brand.id)) {
            setSelectedBrands(selectedBrands.filter(id => id !== brand.id));
        } else {
            setSelectedBrands([...selectedBrands, brand.id]);
        }
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
        // debugger
    };

    const handleFilter = () => {
        // getFilteredDevices(
        // device.selectedType.id,
        // selectedBrands,
        // priceRange,
        // device.page,
        // 5).then(data => {
        //     device.setDevices(data.data.rows);
        //     device.setTotalCount(data.data.count);
        //     console.log(data)
        // }).catch(
        //     e => console.log(e)
        // )

        fetchDevices2(
            device.selectedType.id,
            selectedBrands,
            priceRange,
            // sort,
            {},
            // search
            '',
            device.page,
            device.limit
        ).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        }).catch(e => console.log(e));
    };

    return (
        <Container className='Filters'>
            <Row>
                <Col>
                    <h5>Фільтри</h5>
                    <Button onClick={handleFilter}>Пошук</Button>
                    <Row>
                        {/* <h5>ЦІНА</h5> */}
                        <br />
                        <Box sx={{ width: 300 }}>
                            <Slider
                                value={priceRange}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                max={100000}
                                min={0}
                            />
                            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <span>{priceRange[0]}</span>
                                <span>{priceRange[1]}</span>
                            </Box> */}
                            <Box className="price-range-container">
                                <span className="price-range">{priceRange[0]}</span>
                                <span className="price-range">{priceRange[1]}</span>
                            </Box>
                        </Box>
                    </Row>

                    <ListGroup>
                        {device.brands.map(brand => (
                            <ListGroup.Item
                                key={brand.id}
                                className="p-3"
                                style={{ cursor: 'pointer' }}
                                active={selectedBrands.includes(brand.id)}
                                onClick={() => handleBrandClick(brand)}
                            >
                                {brand.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

            </Row>
        </Container>
    );
});

export default Filters;
