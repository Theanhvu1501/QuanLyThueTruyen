import React from 'react'
import './PageHeader.scss'
export default function PageHeader(props) {
    const { headerContent } = props
    return (
        <div className="page-header">
            <div className="container">
                <div className="row justify-content-center">
                    <h2>{headerContent}</h2>
                </div>
            </div>
        </div>
    )
}
