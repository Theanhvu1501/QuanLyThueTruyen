import React from 'react'
import './Banner.scss'
export default function Banner() {
    window.addEventListener('scroll', () => {
        const bg = document.querySelector('.banner')
        if (bg) {
            bg.style.backgroundSize = 160 - window.pageYOffset / 12 + '%'
            if (window.innerWidth < 1280) {
                bg.style.backgroundSize = 190 - window.pageYOffset / 12 + '%'
            }
            if (window.innerWidth < 520) {
                bg.style.backgroundSize = 520 - window.pageYOffset / 12 + '%'
            }
            bg.style.opacity = 1 - +window.pageYOffset / 700 + ''
        }
    })
    return (
        <>
            <section className="banner">
                <div className="box">
                    <div className="box__content">Fastest</div>
                </div>
            </section>
        </>
    )
}
