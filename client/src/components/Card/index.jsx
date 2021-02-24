import React from 'react'
import { useHistory } from 'react-router-dom'
import Rating from '../Rating'
import './Card.scss'
export default function Card(props) {
    const { item } = props
    const history = useHistory()
    return (
        <>
            <div className="col-6 col-lg-3 col-md-4 col-sm-6 col-xs-6" onClick={() => history.push(`/shop/${item._id}`)}>
                <div className="item">
                    <div className="item__img">
                        <div className="image__hover">
                            <i className="fas fa-plus fa-lg"></i>
                            <i className="fas fa-shopping-bag fa-lg" onClick={() => console.log('as')}></i>
                        </div>
                        <img src={item.images.url} alt="" />
                    </div>
                    <div className="item__title">
                        <p>{item.title}</p>
                        <i className="far fa-heart fa-lg"></i>
                    </div>
                    <Rating rating={item.rating} />
                    <p>${item.price}</p>
                </div>
            </div>
        </>
    )
}
