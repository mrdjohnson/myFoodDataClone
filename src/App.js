import React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router";

import Sidebar from "./Sidebar/Sidebar";
import NutritionFactsPanel from "./NutritionFacts/NutritionFactsPanel";
import HomePage from "./HomePage";

import useIsMobile from "./hooks/useIsMobile";

import useUrlEffects from "./hooks/useUrlEffects";

import logo from "./assets/logo.svg";

import "./App.scss";

const { Header, Content, Footer } = Layout;

function App() {
  useUrlEffects();

  const isMobile = useIsMobile();
  const displaySidebar = !isMobile;

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
      <div className="app-footer-copyright">© 2020 MyFoodData.com</div>
    </>
  );

  return (
    <Layout className={isMobile && "mobile"} style={{ minHeight: "100vh" }}>
      <Header className="header">
        <a href="https://www.myfooddata.com">
          <img
            className="header-logo"
            src={logo}
            alt="my food data"
            height="100%"
          />
        </a>
      </Header>

      <Content>
        <Switch>
          <Route path="/nutrition-facts/:foodName/:weight?/:quantity?">
            {displaySidebar && (
              <Sidebar className="ant-layout-content__sidebar" />
            )}

            <NutritionFactsPanel className="ant-layout-content__nutrition-facts-panel" />
          </Route>

          {/* default route */}
          <Route>
            <HomePage className="ant-layout-content__home-page" />
          </Route>
        </Switch>
      </Content>

      <Footer className="app-footer">
        <AppFooter />
      </Footer>
    </Layout>
  );
}

export default App;
