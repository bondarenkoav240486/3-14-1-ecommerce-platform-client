import { makeAutoObservable } from "mobx";
import { getCartFromLS } from '../utils/getCartFromLS';
import { calcTotalPrice } from '../utils/calcTotalPrice';
import {
    getBasket,
    addToBasket,
    deleteFromBasket,
    clearBasket,
} from "../http/basketAPI";

const CartState = getCartFromLS();

export default class CartStore {
    constructor() {
        this._totalPrice = CartState.totalPrice
        this._items = CartState.items
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

    async addItem(item, user) {
        if (user.isAuth) {
            await addToBasket(item.id);
            await this.getCartFromDB();
        } else {
            const findItem = this._items.find(obj => obj.id === item.id);
            if (findItem) {
                findItem.count++;
            } else {
                this._items.push({
                    ...item,
                    count: 1,
                });
            }
            // this.setItems([...this._items]);
            // this.setTotalPrice(calcTotalPrice(this._items));
            // this.writeToLocalStorage(this._items);
            this.updateLocalCart();
        }
    }

    async minusItem(id, user) {
        if (user.isAuth) {
            await deleteFromBasket(id);
            await this.getCartFromDB();
        } else {
            const findItem = this._items.find(obj => obj.id === id);
            if (findItem) {
                findItem.count--;
                if (findItem.count === 0) {
                    this._items = this._items.filter(obj => obj.id !== id);
                }
                // this.setItems([...this._items]);
                // this.setTotalPrice(calcTotalPrice(this._items));
                // this.writeToLocalStorage(this._items);
                this.updateLocalCart();
            }
        }
    }

    async removeItem(id, user) {
        if (user.isAuth) {
            await deleteFromBasket(id);
            await this.getCartFromDB();
        } else {
            this._items = this._items.filter(obj => obj.id !== id);
            // this.setItems([...this._items]);
            // this.setTotalPrice(calcTotalPrice(this._items));
            // this.writeToLocalStorage(this._items);
            this.updateLocalCart();
        }
    }

    async clearItems(user) {
        if (user.isAuth) {
            await clearBasket();
            await this.getCartFromDB();
        } else {
            // localStorage.removeItem('cart');
            // this.writeToLocalStorage(this._items)
            // this.setItems([]);
            // this.setTotalPrice(0);
            // this.writeToLocalStorage([]);
            this.clearLocalCart();
        }
    }

    writeToLocalStorage(cartItems) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    updateLocalCart() {
        this.setItems([...this._items]);
        this.setTotalPrice(calcTotalPrice(this._items));
        this.writeToLocalStorage(this._items);
    }
    clearLocalCart() {
        this.setItems([]);
        this.setTotalPrice(0);
        this.writeToLocalStorage([]);
    }

    async getCartFromDB() {
        const basket = await getBasket();
        if (!basket || !basket.basket_devices) {
            this.setItems([]);
            this.setTotalPrice(0);
            return;
        }
        const items = basket.basket_devices.map(item => ({
            ...item.device,
            count: item.quantity
        }));
        this.setItems(items);
        this.setTotalPrice(basket.totalPrice || 0);
    }

    getCartFromLSmethod() {
        const data = localStorage.getItem('cart');
        const items = data ? JSON.parse(data) : [];
        const totalPrice = calcTotalPrice(items);
        this.setItems(items);
        this.setTotalPrice(totalPrice);
        // return {
        //     items: items,
        //     totalPrice,
        // };
    }

    async syncLocalCartToDB() {

        if (!this._items.length) {

            await this.getCartFromDB();
            return;
        }

        const localItems = [...this._items];
        // const localItems = [...this._items];
        // if (!localItems.length) {
        //     await this.getCartFromDB();
        //     return;
        // }
        for (const item of localItems) {
            for (let i = 0; i < item.count; i++) {
                await addToBasket(item.id);
            }
        }
        try {
            localStorage.removeItem("cart");
            // this.setItems([]);
            // this.setTotalPrice(0);
            await this.getCartFromDB();

        } catch (e) {

            console.log(e);
        }
    }

}
