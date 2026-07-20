import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { Container, Row, Col } from "react-bootstrap";
import CartItem from "../components/CartItem";
import CartEmpty from '../components/CartEmpty';
import { Context } from "../index";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Cart = observer(() => {
    const { cart } = useContext(Context);
    const { user } = useContext(Context);

    const totalCount = cart.items.reduce((sum, item) => sum + item.count, 0);

    const onClickClear = () => {
        if (window.confirm('Очистить корзину?')) {
            cart.clearItems(user);
        }
    };

    if (!cart.totalPrice) {
        return <CartEmpty />;
    }

    return (
        <div className="container container--cart Cart">
            <div className="Row center">
                <div className="Col content">
                    <div className="cart__top Row">
                        <div className="Col">
                            <h2 className="content__title">
                                Кошик
                            </h2>
                        </div>
                        <div className="Col">
                            <div onClick={onClickClear} className="cart__clear Row">
                                <span>Очистити кошик</span>
                                <DeleteIcon style={{ color: "#B6B6B6" }} />
                            </div>
                        </div>
                    </div>
                    <div className="content__items">
                        {cart.items.map((item) => (
                            <CartItem key={item.id} {...item} />
                        ))}
                    </div>
                    <div className="cart__bottom">
                        <div className="cart__bottom-details">
                            <span>
                                {' '}
                                Усього товарів: <b>{totalCount} шт.</b>{' '}
                            </span>
                            <span>
                                {' '}
                                Сума замовлення: <b>{cart.totalPrice} ₴</b>{' '}
                            </span>
                        </div>
                        <div className="cart__bottom-buttons">
                            <Link to="/" className="button button--outline button--add go-back-btn">
                                <ArrowBackIcon style={{ marginRight: "5px" }} />
                                <span>Повернутись назад</span>
                            </Link>
                            <div className="button pay-btn">
                                <span>Оплатити зараз</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Cart;
