import React, { useContext } from "react";

import Sidebar from "./Sidebar/Sidebar";
import NutritionFactsPanel from "./NutritionFacts/NutritionFactsPanel";

import logo from "./assets/logo.svg";

import { Layout } from "antd";
import "./App.scss";
import AppContext from "./AppContext";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const { foodItemData, toggleMobile } = useContext(AppContext);
  const displaySider = foodItemData !== null;

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
    <Layout style={{ minHeight: "100vh" }}>
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

      <Layout>
        {displaySider && (
          <Sider
            width={310}
            breakpoint="md"
            collapsedWidth={0}
            trigger={null}
            onCollapse={toggleMobile}
          >
            <Sidebar />
          </Sider>
        )}

        <Content>
          <NutritionFactsPanel />
        </Content>
      </Layout>

      <Footer className="app-footer">
        <AppFooter />
      </Footer>
    </Layout>
  );
}

export default App;
