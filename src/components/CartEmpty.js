import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => (
    <div className="cart cart--empty container">
        <div className='Col  center content'>
            <h2>
                О, курва! Кошик порожній <span>😕</span>
            </h2>
            <p>
                Найімовірніше, ви ще не обрали жодного товару.
                Швиденько купіть у нас що небудь!                <br />
                Щоб обратити товар, перейдіть на головну сторінку.            </p>
            <img src={cartEmptyImg} alt="Empty cart" />
            <Link to="/" className="button button--black">
                <span>Повернутися назад</span>
            </Link>
        </div>
    </div>
);

export default CartEmpty