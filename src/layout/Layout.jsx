import React from "react";
import Header from "../components/Header";
import Content from "../components/Content";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
