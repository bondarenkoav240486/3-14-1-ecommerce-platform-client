import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import { useParams } from 'react-router-dom'
import { fetchOneDevice } from "../http/deviceAPI";

import { useContext } from 'react';
import { Context } from "../index";
// import { calcTotalPrice } from '../utils/calcTotalPrice';
import { addToBasket, addRate } from "../http/userAPI";

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';


const DevicePage = () => {
    const [device, setDevice] = useState({ info: [], rating: 3 })
    const { id } = useParams();
    const params = useParams();
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])
    // useEffect(() => {
    //     fetchOneDevice(id).then(data => setDevice(data))
    // }, [device.rating])

    const { user } = useContext(Context)
    const { cart } = useContext(Context)

    // const { device } = useContext(Context)

    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const onClickAdd = () => {
        cart.addItem(
            // cart.items,
            // cart.setItems,
            // cart.setTotalPrice,
            device,
            user
        );
        addToBasket(user.user.id, device.id);
    };
    const onClickSetRate = (e) => {
        addRate(
            user.user.id, device.id, +e.target.value
        )
            .then(
                data => {
                    setDevice({
                        // ...obj.data,
                        ...data,
                        info: device.info
                    })
                }
            );
    };
    const valera = 3.5;

    console.log(device.id)
    console.log(user.isAuth)

    return (
        <Container className="DevicePage">
            <div
                className="ImageAndInfoAndActivesRow"
            >
                <div
                    className="ColImage"
                >
                    <Image
                        className="Image"
                        src={process.env.REACT_APP_API_URL + device.img}
                    />
                </div>
                <div
                    className="infoAndActivesCol"
                >
                    <div
                        className="nameRatingCodeRow"
                    >
                        {/* <div> */}
                        <h2>{device.name}</h2>
                        {/* </div> */}
                        <div className='ratingStars' >
                            {/* <div>{device.rating}</div> */}
                            <Stack
                                className='ratingStack'
                                spacing={1}
                            >
                                <Rating
                                    name="size-large"
                                    // defaultValue={device.rating}
                                    value={device.rating}
                                    // defaultValue={1}
                                    // defaultValue={3}
                                    size="large"
                                    readOnly
                                />
                            </Stack>
                            <div
                                className='ratingNumber'
                            >
                                {device.rating}
                            </div>
                            <div className='code'>
                                Код:  308593166
                            </div>
                        </div >

                    </div>
                    <div className='Row PriceAndAddCartButton'>
                        <h3> {device.price} ₴</h3>
                        <Button
                            variant={"outline-dark"}
                            onClick={
                                () => onClickAdd()
                            }
                        >
                            Додати до кошику
                        </Button>
                    </div>
                    <div className='Row SetRate'>
                        <p3>Оцініть товар (поставити оцінку можуть лише зареєстровані авторизовані користувачі)</p3>
                        {user.isAuth
                            ?
                            <Stack
                                onClick={
                                    (e) => {
                                        onClickSetRate(e)
                                    }
                                }
                                spacing={1}>
                                <Rating
                                    name="size-large"
                                    defaultValue={2}
                                    size="large"
                                />
                            </Stack>
                            :
                            <Stack spacing={1} >
                                <Rating
                                    name="size-large"
                                    defaultValue={0}
                                    size="large"
                                    readOnly />
                            </Stack>
                        }
                    </div>
                </div>
            </div>



            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row
                        key={info.id}
                        // style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}
                    >
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container >
    );
};

export default DevicePage;
