import { atom, selector } from 'recoil'

export const cartState = atom({
    key: 'cart',
    default: []
})

export const addToCart = (cart, product) => {
    const newCart = [...cart];
    const foundIndex = cart.findIndex(x => x.id === product._id)
    if (foundIndex >= 0) {
        newCart[foundIndex] = {
            ...cart[foundIndex],
            quantity: cart[foundIndex].quantity + 1
        }
        return newCart
    }
    newCart.push({
        id: product._id,
        product: product,
        quantity: 1
    })
    return newCart
}

export const removeCart = (cart, product) => {
    const newCart = cart.filter(x => x.id !== product.id);
    return newCart;
}

export const increase = (cart, product) => {
    const newCart = [...cart];
    const foundIndex = cart.findIndex(x => x.id === product.id)

    newCart[foundIndex] = {
        ...cart[foundIndex],
        quantity: cart[foundIndex].quantity + 1
    }

    return newCart
}

export const decrease = (cart, product) => {
    const newCart = [...cart];
    const foundIndex = cart.findIndex(x => x.id === product.id)

    if (cart[foundIndex].quantity > 1) {
        newCart[foundIndex] = {
            ...cart[foundIndex],
            quantity: cart[foundIndex].quantity - 1
        }
    }
    return newCart
}

export const cartTotal = selector({
    key: 'cartTotal',
    get: ({ get }) => {
        const cart = get(cartState)
        return cart.reduce((total, item) => {
            return total + item.product.price * item.quantity
        }, 0)
    }
})