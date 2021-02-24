import React from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import MainCart from './pages/MainCart'
export default function Cart() {
    const match = useRouteMatch()
    return (
        <Router>
            <Switch>
                <Route exact path={match.url} component={MainCart} />
            </Switch>
        </Router>
    )
}
