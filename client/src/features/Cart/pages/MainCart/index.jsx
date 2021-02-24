import React from 'react'
import PageHeader from '../../../../components/PageHeader'
import TableCart from '../../components/TableCart'

export default function MainCart() {
    return (
        <div className="container">
            <PageHeader headerContent="Cart" />
            <h1 style={{ marginBottom: "30px" }}>Your cart items</h1>
            <TableCart />
        </div>
    )
}
