import { atom } from 'recoil'
export const tokenState = atom({
    key: 'token',
    default: false
})

export const isLoggedState = atom({
    key: 'isLogged',
    default: false
})

export const isAdminState = atom({
    key: 'isAdmin',
    default: false
})