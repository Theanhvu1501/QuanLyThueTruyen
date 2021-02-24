import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import categoryAPI from '../../../../api/categoryAPI'
import productAPI from '../../../../api/productAPI'
import Card from '../../../../components/Card'
import Loader from '../../../../components/Loader'
import { InputField } from '../../../../customField/InputField'
import { filterCategory, filterSearch, paramsState } from '../../../../recoilState/paramsState'
import { productState } from '../../../../recoilState/productState'
import './Shop.scss'
export default function Shop() {

    const [products, setProducts] = useRecoilState(productState)
    const [category, setCategory] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [params, setParams] = useRecoilState(paramsState)
    const flag = useRef('')
    //fetch API products
    useEffect(() => {
        const fetchAPIProduct = async () => {
            try {
                setIsLoading(true)
                const res = await productAPI.getAll(params)
                setProducts(res.products)
                setIsLoading(false)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchAPIProduct()
    }, [params])

    //fetch category API
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await categoryAPI.getAll()
                setCategory(res)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategory()
    }, [])

    const handleCategory = (item) => {
        const newParams = filterCategory(params, item)
        setParams(newParams)
    }

    const handleSearch = (e) => {
        const value = e.target.value
        if (flag.current)
            clearTimeout(flag.current)
        flag.current = setTimeout(() => {
            const NewParams = filterSearch(params, value)
            setParams(NewParams)
        }, 300)
    }
    function Welcome(props) {
        return (
            products.length === 0 ? <h1 style={{ marginTop: '30px' }}>Nothing Found</h1>
                : products.map((item) => <Card item={item} key={item._id} />)
        )

    }

    return (
        <>
            <section className="shop">
                <div className="container">
                    <div className="row">
                        <div className="col-9 ">
                            <div className="shop__toolBar">
                                <ul>
                                    <li onClick={() => handleCategory()} className="shop__toolBar__link active">All</li>
                                    {
                                        category.map((item) => (
                                            <li
                                                onClick={() => handleCategory(item.name)}
                                                key={item.name}
                                                className="shop__toolBar__link ">{item.name}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-3 ">
                            <div className="shop__search" id="search">
                                <InputField
                                    placeholder='Search...'
                                    type="text"
                                    name="search"
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            isLoading ? <Loader />
                                : <Welcome />
                        }
                    </div>
                </div>

            </section>
        </>
    )
}
