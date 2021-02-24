import axiosClient from "./axiosClient"

const productAPI = {
    getAll: (params) => {
        const url = '/api/products'
        return axiosClient.get(url, { params })
    }
}

export default productAPI