import React from "react";
import styles from "./Layout.module.css";
import logo from '../assets/crypto.png'

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <img src={logo} alt="" />
        <h1>Crypto App</h1>
        <p>Venture in cryptocurrency world</p>
      </header>
      {children}
      <footer>
        <p>Developed with 🤍 by Mojtaba Mohseni</p>
      </footer>
    </>
  );
};

export default Layout;
