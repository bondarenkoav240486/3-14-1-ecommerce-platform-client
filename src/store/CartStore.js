import { makeAutoObservable } from "mobx";
import { getCartFromLS } from '../utils/getCartFromLS';
import { calcTotalPrice } from '../utils/calcTotalPrice';
import {
    addToBasket,
    minusFromBasket,
    fetchDevicesFromBasket,
    clearBasket,
    deleteFromBasket
} from "../http/userAPI";

const CartState = getCartFromLS();

export default class CartStore {
    constructor() {
        // const CartState = getCartFromLS();
        // this._isAuth = false
        this._totalPrice = CartState.totalPrice
        // this._totalPrice = 0
        this._items = CartState.items
        // this._items = [1, 2, 3]
        this.isUserAuth = false
        makeAutoObservable(this)
    }

    setItems(items) {
        this._items = items
    }
    setTotalPrice(price) {
        this._totalPrice = price
    }

    get totalPrice() {
        return this._totalPrice
    }
    get items() {
        return this._items
    }

    addItem(item, user) {
        // const findItem = cart.items.find((obj) => obj.id === item.id);
        const findItem = this._items.find((obj) => obj.id === item.id);
        if (findItem) {
            findItem.count++;
        } else {
            const items = this._items
            items.push({
                ...item,
                count: 1,
            });
            this.setItems(items)
        }
        this.setTotalPrice(+calcTotalPrice(this._items));

        if (user.isAuth) {
            addToBasket(user.user.id, item.id)
        } else {
            this.writeToLocalStorage(this._items)
        }
    }

    minusItem(id, user) {
        const findItem = this._items.find((obj) => obj.id === id);
        if (findItem) {
            findItem.count--;
        }
        console.log(
            'user : ', user
            // user.isAuth
        )
        this._totalPrice = calcTotalPrice(this._items);
        // this.writeToLocalStorage(this._items)

        if (user.isAuth) {
            // minusFromBasket(user.user.id, item.id)
            minusFromBasket(user.user.id, id)
        } else {
            this.writeToLocalStorage(this._items)
        }
    }

    // removeItem(id) {
    //     this._items = this._items.filter((obj) => obj.id !== id);
    //     this._totalPrice = calcTotalPrice(this._items);
    //     this.writeToLocalStorage(this._items)
    // }
    async removeItem(id, user) {
        // this._items = this._items.filter((obj) => obj.id !== id);
        // this._totalPrice = calcTotalPrice(this._items);
        if (user.isAuth) {
            // Remove item from the database if the user is authenticated
            await deleteFromBasket(user.user.id, id);
            await this.getCartFromDB(user.user.id)
        } else {
            // Remove item from local storage if the user is not authenticated
            this._items = this._items.filter((obj) => obj.id !== id);
            this.writeToLocalStorage(this._items);
            this.setItems(this._items)
        }
        // this._items = this._items.filter((obj) => obj.id !== id);
        this._totalPrice = calcTotalPrice(this._items);
    }

    clearItems(user) {
        // this._items = [];
        this.setItems([]);
        this.setTotalPrice(0);
        // localStorage.removeItem('cart');
        // this.writeToLocalStorage(this._items)
        if (user.isAuth) {
            // minusFromBasket(user.user.id, item.id)
            clearBasket(user.user.id)
        } else {
            localStorage.removeItem('cart');
            this.writeToLocalStorage(this._items)
        }
    }

    writeToLocalStorage(cartItems) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    async getCartFromDB(userId) {
        let devices = await fetchDevicesFromBasket(userId);
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
        this.setItems(items);
        this.setTotalPrice(totalPrice);
        // return {
        //     // items: items as CartItem[],
        //     items: items,
        //     totalPrice,
        // };
    }

    getCartFromLSmethod() {
        const data = localStorage.getItem('cart');
        const items = data ? JSON.parse(data) : [];
        const totalPrice = calcTotalPrice(items);

        let result = {
            items: items,
            totalPrice,
        };
        this.setItems(items);
        this.setTotalPrice(totalPrice);

        // return {
        //     items: items,
        //     totalPrice,
        // };
    }







}
