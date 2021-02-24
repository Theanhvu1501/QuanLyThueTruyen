import React from 'react'
import './Footer.scss'
export default function Footer() {
    return (
        <section className="footer">
            <div className="footer__nav">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-2 ">
                            <div className="footer__nav__logo">
                                <img src="https://demo2.drfuri.com/unero/wp-content/themes/unero/images/logo/logo.png" alt="" />
                            </div>
                        </div>
                        <div className="col-12 col-lg-7 ">
                            <div className="footer__nav__newLetter">
                                <h5>NewsLetter</h5>
                                <input placeholder='Your email address' type="text"></input>
                            </div>
                        </div>
                        <div className="col-12 col-lg-3">
                            <div className="footer__nav__socials">
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
            <div className="footer__copyright">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5>© 2017 Unero. All rights reserved</h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
