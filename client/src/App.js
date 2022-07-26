import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import authAPI from "./api/authAPI";
import NotFound from "./components/NotFound";
import Shop from "./features/Home/components/Shop";
import Login from "./features/Login";
import Pages from "./features/Pages";
import {
  isAdminState,
  isLoggedState,
  tokenState
} from "./recoilState/authState";
import { cartState } from "./recoilState/cartState";
const Home = React.lazy(() => import("./features/Home"));

function App() {
  const [token, setToken] = useRecoilState(tokenState);
  const setIsLogged = useSetRecoilState(isLoggedState);
  const setIsAdmin = useSetRecoilState(isAdminState);
  const setCart = useSetRecoilState(cartState);

  //refresh_token
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        try {
          const token = await axios.get("user/refresh_token");
          setToken(token.data.accesstoken);
        } catch (error) {
          console.log(error.message);
        }
      };
      refreshToken();
    }
  }, []);

  //check Login
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const user = await authAPI.getUser(token);
          setIsLogged(true);
          setCart(user.cart);

          if (user.role === 1) setIsAdmin(true);
        } catch (error) {
          console.log(error.message);
        }
      };
      getUser();
    }
  }, [token]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          {/* <Header />
          <Row>
            <div>
              <div
                style={{
                  width: 256,
                  padding: 16,
                  borderRight: "1px solid #e3e1e1",
                }}
              >
                <Button
                  style={{
                    width: "100%",
                    color: "white",
                    backgroundColor: "#6a16c9",
                    textAlign: "center",
                   
                  }}
                  icon={
                    <span style={{float:'left',marginBottom:20}}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7854 0.965517C13.8469 0.919407 13.8978 0.860624 13.9346 0.793148C13.9713 0.725673 13.9932 0.651081 13.9987 0.574423C14.0041 0.497766 13.993 0.420833 13.9661 0.348833C13.9393 0.276834 13.8972 0.211449 13.8429 0.157108C13.7886 0.102766 13.7232 0.0607353 13.6512 0.0338625C13.5792 0.00698956 13.5022 -0.00409837 13.4256 0.00134952C13.3489 0.00679741 13.2743 0.0286539 13.2069 0.0654389C13.1394 0.102224 13.0806 0.153079 13.0345 0.214559L4.45211 8.79693L4.29119 9.70881L5.20307 9.54789L13.7854 0.965517V0.965517ZM2.68199 1.12644C1.97068 1.12644 1.28851 1.409 0.785537 1.91197C0.282566 2.41495 0 3.09712 0 3.80843V11.318C0 12.0293 0.282566 12.7115 0.785537 13.2145C1.28851 13.7174 1.97068 14 2.68199 14H10.1916C10.9029 14 11.5851 13.7174 12.088 13.2145C12.591 12.7115 12.8736 12.0293 12.8736 11.318V5.95402C12.8736 5.81176 12.8171 5.67533 12.7165 5.57473C12.6159 5.47414 12.4794 5.41762 12.3372 5.41762C12.1949 5.41762 12.0585 5.47414 11.9579 5.57473C11.8573 5.67533 11.8008 5.81176 11.8008 5.95402V11.318C11.8008 12.2084 11.082 12.9272 10.1916 12.9272H2.68199C2.25521 12.9272 1.8459 12.7577 1.54412 12.4559C1.24234 12.1541 1.0728 11.7448 1.0728 11.318V3.80843C1.0728 2.91801 1.79157 2.19923 2.68199 2.19923H8.04598C8.18824 2.19923 8.32467 2.14272 8.42527 2.04213C8.52586 1.94153 8.58238 1.8051 8.58238 1.66284C8.58238 1.52057 8.52586 1.38414 8.42527 1.28354C8.32467 1.18295 8.18824 1.12644 8.04598 1.12644H2.68199Z"
                          fill="white"
                        ></path>
                      </svg>
                    </span>
                  }
                >
                  Tạo mới
                </Button>
              </div>
              <Sidebar />
            </div>
            <RFlist/>
          </Row> */}
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home"  component={Pages} />
            {/* <Route path="/shop" component={Shop} /> */}
            {/* <Route path="/blog" component={Blog} />
            <Route path="/register" component={Register} />
            <Route path="/cart" component={Cart} /> */}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
