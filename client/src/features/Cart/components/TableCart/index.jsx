import React from 'react'
import { Table } from 'reactstrap'
import { useRecoilState, useRecoilValue } from 'recoil'
import authAPI from '../../../../api/authAPI'
import { tokenState } from '../../../../recoilState/authState'
import { cartState, cartTotal, decrease, increase, removeCart } from '../../../../recoilState/cartState'
import './TableCart.scss'
export default function TableCart() {
    const [carts, setCarts] = useRecoilState(cartState)
    const token = useRecoilValue(tokenState)
    const total = useRecoilValue(cartTotal)


    const backShop = () => {
        window.location.href = '/shop'
    }

    const handleRemoveCart = async (product) => {
        try {
            const newCart = removeCart(carts, product)
            setCarts(newCart)
            //save db 
            await authAPI.addCart(token, { cart: newCart })
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleIncrease = async (product) => {
        try {
            const newCart = increase(carts, product)
            setCarts(newCart)
            //save db 
            await authAPI.addCart(token, { cart: newCart })
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDecrease = async (product) => {
        try {
            const newCart = decrease(carts, product)
            setCarts(newCart)
            //save db 
            await authAPI.addCart(token, { cart: newCart })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr style={{ background: "#999" }}>
                        <th>&nbsp;</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {carts.map(item =>
                        <tr className="form-cart" key={item.id}>
                            <th className="product-thumbnail"><img src={item.product.images.url} alt="" /></th>
                            <td className="product-title">{item.product.title}</td>
                            <td className="product-price">${item.product.price}</td>
                            <td className="product-quantity">
                                <div className="product-quantity__box">
                                    <span onClick={() => handleIncrease(item)}>+</span>
                                    <span>{item.quantity}</span>
                                    <span onClick={() => handleDecrease(item)}>-</span>
                                </div>
                            </td>
                            <td className="product-total">${(item.quantity * item.product.price).toFixed(2)}</td>
                            <td className="product-remove" onClick={() => handleRemoveCart(item)}>x</td>
                        </tr>

                    )}
                    <tr>
                        <td>
                            <div className="btn-shop" onClick={() => backShop()}>
                                <i className="fas fa-long-arrow-alt-left"></i>
                                <span>Back to shop</span>
                            </div>
                        </td>
                        <td style={{ float: 'right' }}>
                            <div className="total" >
                                <h2>Total : ${total.toFixed(2)}</h2>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
