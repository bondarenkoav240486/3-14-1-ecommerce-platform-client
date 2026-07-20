import React, { useContext } from 'react';
import { Context } from "../index";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { observer } from "mobx-react-lite";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CartItem = observer(({
    id,
    name,
    rating,
    size,
    price,
    count,
    img,
    type, // Add type property

}) => {
    const { cart } = useContext(Context);
    const { user } = useContext(Context);

    const onClickPlus = () => {
        cart.addItem({ id }, user);
    };

    const onClickMinus = () => {
        if (count > 1) {
            cart.minusItem(id, user);
        }
    };

    const onClickRemove = () => {
        if (window.confirm('Ти справді хочеш видалити товар?')) {
            cart.removeItem(id, user);
        }
    };

    return (
        <div className="cart__item Row">
            <div className="cart__item-img Col">
                <img
                    className="pizza-block__image"
                    src={process.env.REACT_APP_API_URL + img}
                    alt="Product"
                    // style={{ height: type === 'television' ? '100px' : '200px' }} // Conditionally set height
                />
            </div>
            <div className="cart__item-info Col">
                <h3>{name}</h3>
                <p>рейтинг: {rating}, Код: 308593166</p>
            </div>
            <div className="cart__item-count Col">
                <div className='Row'>
                    <div
                        disabled={count === 1}
                        onClick={onClickMinus}
                        className={`button button--outline button--circle cart__item-count-minus ${count === 1 ? 'disabled' : ''}`}
                    >
                        <RemoveCircleOutlineIcon style={{ color: count === 1 ? 'grey' : '#007bff' }} />
                    </div>
                    <b className='Row'>{count}</b>
                    <div
                        onClick={onClickPlus}
                        className="button button--outline button--circle cart__item-count-plus"
                    >
                        <AddCircleOutlineIcon style={{ color: '#007bff' }} />
                    </div>
                </div>
            </div>
            <div className="cart__item-price Col">
                <b>{price * count} ₴</b>
            </div>
            <div className="cart__item-remove">
                <div onClick={onClickRemove} className="button button--outline button--circle">
                    <DeleteOutlineOutlinedIcon className='icon' />
                </div>
            </div>
        </div>
    );
});

export default CartItem;
