import { makeAutoObservable } from "mobx";

import { check } from "../http/userAPI";


export default class UserStore {
    constructor() {
        this._isAuth = false
        // this._isAuth = true
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }

    async checkAuth() {
        try {
            const data = await check();

            this.setUser(data);
            this.setIsAuth(true);

            return true;

        } catch (e) {

            this.setUser({});
            this.setIsAuth(false);

            return false;
        }
    }

    // async init(cart) {

    //     const isAuth = await this.checkAuth();

    //     if (isAuth) {
    //         await cart.syncLocalCartToDB();
    //     } else {
    //         cart.getCartFromLSmethod();
    //     }
    // }
    async init() {
        return await this.checkAuth();
    }
}
