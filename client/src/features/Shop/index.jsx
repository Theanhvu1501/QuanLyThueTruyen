import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import MainShop from './Pages/MainShop'
import ProductDetail from './Pages/ProductDetail'
export default function Shop() {
    const match = useRouteMatch()
    return (
        <>
            <Switch>
                <Route exact path={match.url} component={MainShop} />
                <Route path={`${match.url}/:id`} component={ProductDetail} />
            </Switch>
        </>
    )
}
