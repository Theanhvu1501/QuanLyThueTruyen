import { Avatar, Button, Col, Divider, Dropdown, Menu, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import authAPI from "../../api/authAPI";
import { logo } from "../../const/svg";
import { isLoggedState } from "../../recoilState/authState";
const styles = require("./Header.scss");

function getContextMenu(setIsLogged) {
  return (
    <Menu style={{ fontFamily: "Arial", fontSize: 14, width: 200 }}>
      <Menu.Item key="0">
        <Row>
          <Col span={4}>
            <Avatar style={{ backgroundColor: "#87d068", cursor: "pointer" }}>
              A
            </Avatar>
          </Col>
          <Col span={20}>
            <div>
              <span style={{ marginLeft: 32 }}>Trần văn A</span>
            </div>
            <div>
              <span style={{ marginLeft: 32 }}>admin@gmail.com</span>
            </div>
          </Col>
        </Row>
      </Menu.Item>
      <Menu.Item key="1">
        <svg
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="red"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.78125 9.5C8.875 9.5 8.46875 10 7 10C5.5 10 5.09375 9.5 4.1875 9.5C1.875 9.5 0 11.4062 0 13.7188V14.5C0 15.3438 0.65625 16 1.5 16H12.5C13.3125 16 14 15.3438 14 14.5V13.7188C14 11.4062 12.0938 9.5 9.78125 9.5ZM12.5 14.5H1.5V13.7188C1.5 12.2188 2.6875 11 4.1875 11C4.65625 11 5.375 11.5 7 11.5C8.59375 11.5 9.3125 11 9.78125 11C11.2812 11 12.5 12.2188 12.5 13.7188V14.5ZM7 9C9.46875 9 11.5 7 11.5 4.5C11.5 2.03125 9.46875 0 7 0C4.5 0 2.5 2.03125 2.5 4.5C2.5 7 4.5 9 7 9ZM7 1.5C8.625 1.5 10 2.875 10 4.5C10 6.15625 8.625 7.5 7 7.5C5.34375 7.5 4 6.15625 4 4.5C4 2.875 5.34375 1.5 7 1.5Z"
            fill="red"
          />
        </svg>
        <span style={{ marginLeft: 32 }}>Tài khoản của tôi</span>
      </Menu.Item>
      <Menu.Item key="2">
        <svg
          width="16"
          height="13"
          viewBox="0 0 16 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 1.5V3.125H5.5C4.65625 3.125 4 3.8125 4 4.625V7.40625C4 8.21875 4.65625 8.90625 5.5 8.90625H8.5V10.5C8.5 11.8438 10.0938 12.5 11.0312 11.5625L15.5312 7.0625C16.125 6.5 16.125 5.53125 15.5312 4.9375L11.0312 0.4375C10.0938 -0.5 8.5 0.1875 8.5 1.5ZM14.5 6L10 10.5V7.40625H5.5V4.625H10V1.5L14.5 6ZM3 0C1.34375 0 0 1.34375 0 3V9C0 10.6562 1.34375 12 3 12H5.625C5.8125 12 6 11.8438 6 11.625V10.875C6 10.6875 5.8125 10.5 5.625 10.5H3C2.15625 10.5 1.5 9.84375 1.5 9V3C1.5 2.1875 2.15625 1.5 3 1.5H5.625C5.8125 1.5 6 1.34375 6 1.125V0.375C6 0.1875 5.8125 0 5.625 0H3Z"
            fill="Violet"
          />
        </svg>
        
         <span style={{ marginLeft: 32 }} onClick={async() => {
          // await authAPI.logout()
          // localStorage.clear()
          // setIsLogged(false)
          window.location.href = '/'
         }}>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  );
}

export default function Header() {
  const setIsLogged = useSetRecoilState(isLoggedState);
  const [isScroll, setIsScroll] = useState(false);
  const scroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };
  window.addEventListener("scroll", scroll);

  return (
    <>
      <div
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 16px",
        }}
      >
        <div>
          {logo}
          <span
            style={{
              fontFamily: "Arial",
              fontWeight: "bold",
              marginLeft: 16,
              color: "white",
              fontSize: 14,
            }}
          >
            QUẢN LÝ THUÊ TRUYỆN
          </span>
        </div>
        <Dropdown overlay={getContextMenu(setIsLogged)} trigger={["hover"]}>
          <Avatar style={{ backgroundColor: "#87d068", cursor: "pointer" }}>
            A
          </Avatar>
        </Dropdown>
      </div>
    </>
  );
}
