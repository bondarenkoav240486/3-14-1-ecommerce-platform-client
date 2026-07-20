import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand',)
    return data
}

export const createDevice = async (device) => {
    console.log(device)
    const { data } = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    const { data } = await $host.get('api/device', {
        params: {
            typeId, brandId, page, limit
        }
    })
    return data
}

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get('api/device/' + id)
    return data
}

// export const getSearchGoods = async (searchTerm) => {
//     try {
//         // const response = await $host.get(`api/device/search?searchTerm=${searchTerm}`);
//         const { data } = await $host.get(`api/device/search-goods?searchTerm=${searchTerm}`);
//         return data
//     } catch (error) {
//         console.error(error);
//     }
// };

// export const getFilterPriceDevices = async (minPrice, maxPrice) => {
//     try {
//         const { data } = await $host.get(`api/device/filter-price?minPrice=${minPrice}&maxPrice=${maxPrice}`);
//         console.log(data)

//         return data
//     } catch (error) {
//         console.error(error);
//     }
// };

// export const getSortPriceDevices = async (sortBy) => {
//     try {
//         const response = await $host.get(`api/device/sort-price?sortBy=${sortBy}`);
//         return response.data
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const getSortRatingDevices = async (sortBy) => {
//     try {
//         const response = await $host.get(
//             `api/device/sort-rating?sortBy=${sortBy}`
//         );
//         return response.data
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const getFilteredDevices = async (typeId, brandIds, priceRange, page, limit = 5) => {
//     const data = await $host.get('api/device/filter', {
//         params: {
//             typeId: typeId ? parseInt(typeId) : undefined,
//             brandIds: brandIds.length ? brandIds.join(',') : undefined,
//             priceRange: priceRange.length ? priceRange.join(',') : undefined,
//             page: page ? parseInt(page) : 1,
//             limit: limit ? parseInt(limit) : 5
//         }
//     });
//     return data;
// }

export const fetchDevices2 = async (typeId, brandIds, priceRange, sort, searchQuery, page, limit = 5) => {
    const { data } = await $host.get('api/device', {
        params: {
            typeId: typeId ? parseInt(typeId) : undefined,
            brandIds: brandIds.length ? brandIds.join(',') : undefined,
            priceRange: priceRange.length ? priceRange.join(',') : undefined,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 8,
            sortBy: sort ? sort.type : undefined,
            order: sort ? sort.order : undefined,
            searchQuery,
        }
    });
    return data;
};


