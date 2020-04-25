import React, { useState } from "react";
import logo from "./logo.svg";

import Sidebar from "./Sidebar/Sidebar";

import { Layout, Menu } from "antd";
import "./App.scss";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const content = (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );

  const AppFooter = () => (
    <>
      <div className="app-footer-links">
        <a href="https://www.myfooddata.com/">Home |</a>
        <a href="https://www.myfooddata.com/contact.php"> Contact |</a>
        <a href="https://www.myfooddata.com/about.php"> About |</a>
        <a href="https://www.myfooddata.com/terms.php"> Terms of Use |</a>
        <a href="https://www.myfooddata.com/privacy.php"> Privacy |</a>
        <a href="https://www.myfooddata.com/faq.php"> FAQ |</a>
        <a href="https://www.myfooddata.com/sitemap.php"> Sitemap</a>
      </div>
      <div class="app-footer-copyright">© 2020 MyFoodData.com</div>
    </>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">Header</Header>
      <Layout>
        <Sider width={310}>
          <Sidebar />
        </Sider>

        <Content>{content}</Content>
      </Layout>

      <Footer className="app-footer">
        <AppFooter />
      </Footer>
    </Layout>
  );
}

export default App;
