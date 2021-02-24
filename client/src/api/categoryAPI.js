import axiosClient from "./axiosClient"

const categoryAPI = {
    getAll: () => {
        const url = '/api/category'
        return axiosClient.get(url)
    }
}
export default categoryAPI