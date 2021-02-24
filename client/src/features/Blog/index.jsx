import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import MainBlog from './pages/MainBlog'
export default function Blog() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={match.url} component={MainBlog} />
        </Switch>
    )
}
