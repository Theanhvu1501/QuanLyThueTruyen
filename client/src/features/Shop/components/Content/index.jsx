import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import authAPI from '../../../../api/authAPI'
import Rating from '../../../../components/Rating'
import { isLoggedState, tokenState } from '../../../../recoilState/authState'
import { addToCart, cartState } from '../../../../recoilState/cartState'
import { useHistory } from 'react-router-dom'
import './Content.scss'
export default function Content(props) {
    const { product } = props
    const [cart, setCart] = useRecoilState(cartState)
    const token = useRecoilValue(tokenState)
    const isLogged = useRecoilValue(isLoggedState)
    const history = useHistory()

    const HandleAddToCart = async () => {
        if (isLogged) {
            const newCart = addToCart(cart, product)
            setCart(newCart)
            //save db
            await authAPI.addCart(token, { cart: newCart })
        } else {
            history.push('/login')
        }
    }
    return (
        <div className="content">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="content__img">
                            <img src={product.images.url} alt="" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="content__summary">
                            <div className="content__summary__title">
                                {product.title}
                            </div>
                            <Rating rating={product.rating} />
                            <div className="content__summary__price">
                                ${product.price}
                            </div>
                            <div className="content__summary__description">
                                <p>{product.description}</p>
                            </div>
                            <div className="content__summary__btn">
                                <div className="btn-quantity">
                                    - <span>1</span> +
                                </div>
                                <div className="btn-add" onClick={HandleAddToCart}>
                                    Add to Cart
                                </div>
                            </div>
                            <div className="content__summary__socials">
                                <ul>
                                    <li><a href="/"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="/"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="/"><i className="fab fa-google-plus-g"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
