import { $authHost } from "./index";


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

export const minusFromBasket = async (deviceId) => {
    const { data } = await $authHost.delete('api/basket/remove', {
        // deviceId
        data: {
            deviceId
        }
    });

    return data;
};

export const removeAllFromBasket = async (deviceId) => {
    const { data } = await $authHost.delete(
        'api/basket/remove-all',
        {
            data: {
                deviceId,
            },
        }
    );

    return data;
};

// export const clearBasket = async (idUser) => {
//     // const { data } = await $authHost.post('api/basket/clear', { idUser })
//     const { data } = await $authHost.post('api/basket/clear')
//     return data;
// }
export const clearBasket = async () => {
    const { data } = await $authHost.delete('api/basket/clear');
    return data;
};