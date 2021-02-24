import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { cartState } from '../../recoilState/cartState'
import './Header.scss'
export default function Header() {
    const [isScroll, setIsScroll] = useState(false)
    const scroll = () => {
        if (window.scrollY > 0) {
            setIsScroll(true)
        }
        else {
            setIsScroll(false)
        }
    }
    window.addEventListener('scroll', scroll)

    const carts = useRecoilValue(cartState)
    return (
        <>
            <section className={isScroll ? 'header sticky' : 'header'}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="logo">
                                <img src="https://demo2.drfuri.com/unero/wp-content/themes/unero/images/logo/logo.png" alt="" />

                            </div>

                        </div>
                        <div className="col-md-7">
                            <div className="navbar">
                                <ul>
                                    <li><NavLink className="navbar__link" to="/">Home</NavLink></li>
                                    <li><NavLink className="navbar__link" to="/blog">Blog</NavLink></li>
                                    <li><Link className="navbar__link" to="/shop">Shop</Link></li>
                                    <li><Link className="navbar__link" to="/collection">Collection</Link></li>
                                    <li><Link className="navbar__link" to="/pages">Pages</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="navbar">
                                <ul>
                                    <li><a href="#search"><i className="fas fa-search fa-lg"></i></a></li>
                                    <li><Link to='/login'><i className="far fa-user fa-lg"></i></Link></li>
                                    <li><Link to='/'><i className="far fa-heart fa-lg"></i></Link></li>
                                    <li><Link to='/cart'><i className="fas fa-shopping-bag fa-lg">
                                        {
                                            carts.length !== 0 ? <div className="items__count">
                                                <p>{carts.length}</p>
                                            </div> : null
                                        }
                                    </i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
