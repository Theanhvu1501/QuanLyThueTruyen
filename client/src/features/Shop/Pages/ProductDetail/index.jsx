import React from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { productState } from '../../../../recoilState/productState'
import Content from '../../components/Content'
import RelatedProducts from '../../components/RelatedProducts'

export default function ProductDetail() {
    const params = useParams()
    const products = useRecoilValue(productState)
    const product = products.find(x => x._id === params.id)

    return (
        <>

            <Content product={product} />
            <RelatedProducts />
        </>
    )
}
