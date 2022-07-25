import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserOutlined } from '@ant-design/icons';
import { cartState } from "../../recoilState/cartState";
import {Avatar} from 'antd'
import "./Header.scss";
export default function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const scroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };
  window.addEventListener("scroll", scroll);

  const carts = useRecoilValue(cartState);
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
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.9711 11.754C19.9711 10.1176 21.2976 8.79099 22.934 8.79099H26.8847V4.44531H22.934C18.8976 4.44531 15.6254 7.71751 15.6254 11.754V12.7416H12.4649C8.28603 12.7416 5.15625 16.261 5.15625 20.2478C5.15625 24.3426 8.39151 27.5564 12.4649 27.5564C16.4302 27.5564 19.9711 24.4477 19.9711 20.2478L19.9711 17.0873H24.5143V12.7416H19.9711V11.754ZM9.50193 20.2478C9.50193 18.4526 10.8894 17.0873 12.4649 17.0873H15.6254L15.6254 12.7416H19.9711V17.0873H15.6254L15.6254 20.2478C15.6254 21.8298 14.2539 23.2107 12.4649 23.2107C10.7839 23.2107 9.50193 21.9349 9.50193 20.2478Z"
              fill="white"
            ></path>
          </svg>
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
        <Link to="/login">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </Link>
      </div>
    </>
  );
}
