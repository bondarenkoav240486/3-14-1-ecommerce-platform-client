import { makeAutoObservable } from "mobx";

import { check, login, registration } from "../http/userAPI";


export default class UserStore {
    constructor() {
        this._isAuth = false
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

    async init() {
        return this.checkAuth();
    }

    async login(email, password) {
        const data = await login(email, password);

        this.setUser(data);
        this.setIsAuth(true);

        return data;
    }

    async register(email, password) {
        const data = await registration(email, password);

        this.setUser(data);
        this.setIsAuth(true);

        return data;
    }

}
