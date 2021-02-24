import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import authAPI from './api/authAPI';
import Footer from './components/Footer';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Blog from './features/Blog';
import Cart from './features/Cart';
import Login from './features/Login';
import Register from './features/Register';
import Shop from './features/Shop';
import { isAdminState, isLoggedState, tokenState } from './recoilState/authState';
import { cartState } from './recoilState/cartState';
const Home = React.lazy(() => import('./features/Home'))

function App() {

  const [token, setToken] = useRecoilState(tokenState)
  const setIsLogged = useSetRecoilState(isLoggedState)
  const setIsAdmin = useSetRecoilState(isAdminState)
  const setCart = useSetRecoilState(cartState)

  //refresh_token
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      const refreshToken = async () => {
        try {
          const token = await axios.get('user/refresh_token')
          setToken(token.data.accesstoken)
        } catch (error) {
          console.log(error.message)
        }
      }
      refreshToken()
    }
  }, [])

  //check Login
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const user = await authAPI.getUser(token)
          setIsLogged(true)
          setCart(user.cart)

          if (user.role === 1)
            setIsAdmin(true)
        } catch (error) {
          console.log(error.message)
        }
      }
      getUser()
    }
  }, [token])




  return (
    <>
      <Suspense fallback={<div>Loading...</div>} >
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/blog' component={Blog} />
            <Route path='/shop' component={Shop} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/cart' component={Cart} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </Suspense>
    </>
  );
}

export default App;
