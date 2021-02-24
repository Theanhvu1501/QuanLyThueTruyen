import axiosClient from "./axiosClient"
const authAPI = {
    login: (user) => {
        const url = 'user/login'
        return axiosClient.post(url, user)
    },
    register: (user) => {
        const url = 'user/register'
        return axiosClient.post(url, user)
    },
    logout: () => {
        const url = 'user/logout'
        return axiosClient.get(url)
    },
    refreshToken: () => {
        const url = 'user/refresh_token'
        return axiosClient.get(url)
    },
    getUser: (token) => {
        const url = 'user/infor'
        return axiosClient.get(url, {
            headers: { 'Authorization': token }
        })
    },
    addCart: (token, cart) => {
        const url = 'user/addcart'
        return axiosClient.patch(url, cart, {
            headers: { 'Authorization': token }
        })
    }
}


export default authAPI;