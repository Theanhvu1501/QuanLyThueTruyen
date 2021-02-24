import { atom } from "recoil";

export const paramsState = atom({
    key: 'params',
    default: {

    }
})

export const filterCategory = (params, category) => {

    const newParams = {
        ...params,
        category
    }
    return newParams
}
export const filterSearch = (params, searchTerm) => {
    const newParams = {
        ...params,
        'title[regex]': searchTerm
    }
    return newParams
}