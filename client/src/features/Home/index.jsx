import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainHome from './pages/MainHome'

export default function Home() {
    return (
        <Switch>
            <Route path="/" exact component={MainHome} />
        </Switch>
    )
}
