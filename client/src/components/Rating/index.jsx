import React from 'react'
import StarRatings from 'react-star-ratings'
export default function Rating(props) {
    const { rating } = props
    return (
        <>
            <StarRatings
                starDimension='15px'
                starSpacing='2px'
                rating={rating}
                starRatedColor="yellow"
                name='rating'
            />
        </>
    )
}
