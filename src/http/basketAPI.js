// import { $authHost, $host } from "./index";
// import jwt_decode from "jwt-decode";
// import axios from "axios";

import { $authHost } from "./index";


// export const addToBasket = async (idUser, idDevice) => {
//     try {
//         const basket = await $authHost.post('api/user/add-to-basket', { idUser, idDevice })
//     } catch (error) {
//         console.log(error)
//     }
// }

export const getBasket = async () => {
    const { data } = await $authHost.get('api/basket');
    return data;
};


export const addToBasket = async (deviceId) => {
    const { data } = await $authHost.post('api/basket/add', {
        deviceId
    });

    return data;
}

export const deleteFromBasket = async (deviceId) => {
    const { data } = await $authHost.delete('api/basket/remove', {
        // deviceId
        data: {
            deviceId
        }
    });

    return data;
};

export const clearBasket = async (idUser) => {
    // const { data } = await $authHost.post('api/basket/clear', { idUser })
    const { data } = await $authHost.post('api/basket/clear')
    return data;
}