import React from 'react'
import './Post.scss'
export default function Post() {
    return (
        <div className="post">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col">
                        <div className="post__img">
                            <img src="https://demo2.drfuri.com/unero/wp-content/uploads/sites/2/2013/12/a1-1170x360.jpg" alt="" />
                        </div>
                        <div className="post__title">
                            Decoration House With Scadinavan Style
                        </div>
                        <div className="post__description">
                            Today most people get on average 4 to 6 hours of exercise every day, and make sure that everything they put in their mouths is not filled with sugars or preservatives, but they pay no attention to their mental health, no vacations, not even the occasional long weekend. All of this for hopes of one day getting that big promotion.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
