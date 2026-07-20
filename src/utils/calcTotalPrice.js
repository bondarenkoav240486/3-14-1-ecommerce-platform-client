// import { CartItem } from '../redux/cart/types';

// export const calcTotalPrice = (items: CartItem[]) => {
export const calcTotalPrice = (items) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
