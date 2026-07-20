import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

import ListGroup from "react-bootstrap/ListGroup";

const BrandBar = observer(() => {
    const { device } = useContext(Context)
    
    return (
      
        <ListGroup >
            {device.brands.map(brand =>
                <ListGroup.Item
                    className="p-3"
                    style={{ cursor: 'pointer' }}
                    active={brand.id === device.selectedBrand.id}
                    // onClick={
                    //     () => {
                    //         device.setSelectedType(type);
                    //         //  navigate(TYPE_PAGE_ROUTE)
                    //     }
                    // }
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                // onClick={() => 
                >
                    {brand.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default BrandBar;
