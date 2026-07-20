// import { CartItem } from '../redux/cart/types';
import { calcTotalPrice } from './calcTotalPrice';
import { fetchDevicesFromBasket } from '../http/userAPI';

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    // const items =  [1,1,1];
    const totalPrice = calcTotalPrice(items);
    // const totalPrice = 111;

    return {
        // items: items as CartItem[],
        items: items,
        totalPrice,
    };
};

export const getCartFromDB = async (userId) => {
    let devices = await fetchDevicesFromBasket(userId)
    let items = [];
    devices.forEach(
        (item) => {
            const findItem = items.find((obj) => obj.id === item.id);
            if (findItem) {
                findItem.count++;
            } else {
                items.push({
                    ...item,
                    count: 1,
                });
            }
        }
    )
    const totalPrice = calcTotalPrice(items);

    return {
      // items: items as CartItem[],
      items: items,
      totalPrice,
    };
};