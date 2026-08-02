import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

import axios from "axios";


export const registration = async (email, password) => {
    // const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' })
    const { data } = await $host.post('api/user/registration', { email, password, role: 'USER' })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    debugger
    const { data } = await $authHost.get('api/user/auth')
    debugger
    localStorage.setItem('token', data.token)
    debugger

    return jwt_decode(data.token)
}

export const addToBasket = async (idUser, idDevice) => {
    try {
        const basket = await $authHost.post('api/user/add-to-basket', { idUser, idDevice })
    } catch (error) {
        console.log(error)
    }
}

export const minusFromBasket = async (idUser, idDevice) => {
    try {
        const basket = await $authHost.post('api/user/minus-from-basket', { idUser, idDevice })
    } catch (error) {
        console.log(error)
    }
}

export const clearBasket = async (idUser) => {
    try {
        const basket = await $authHost.post('api/user/clear-basket', { idUser })
    } catch (error) {
        console.log(error)
    }
}

export const addRate = async (idUser, idDevice, rateValue) => {
    try {
        const {data} = await $authHost.post('api/user/add-rate', { idUser, idDevice, rateValue }
        )
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteFromBasket = async (idUser, idDevice) => {
    try {
        const { data } = await $authHost.post('api/user/delete-from-basket', { idUser, idDevice });
        return data;
    } catch (error) {
        console.error("Error deleting item from basket:", error);
    }
};
