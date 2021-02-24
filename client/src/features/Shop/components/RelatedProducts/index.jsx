import React from 'react'
import { useRecoilValue } from 'recoil'
import Card from '../../../../components/Card'
import { productState } from '../../../../recoilState/productState'
export default function RelatedProducts() {
    const products = useRecoilValue(productState)
    return (
        <div className="related-product">
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <h2>Related products</h2>
                </div>
                <div className="row">
                    {products.map((item) => <Card item={item} key={item._id} />)}
                </div>
            </div>
        </div>
    )
}
