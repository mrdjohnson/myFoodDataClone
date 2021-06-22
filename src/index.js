import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, useHistory } from "react-router-dom";
import { Provider } from "mobx-react";
import { RootStoreModel } from "./models/RootStoreModel";

const rootStore = RootStoreModel.create({});

const AppWithRootStore = () => {
  const history = useHistory();

  // hacky work around because mobx-react-router does not work well with mobx-state-tree
  useEffect(() => {
    rootStore.setRouter(history);
  }, []);

  return (
    <Provider store={rootStore}>
      <App />
    </Provider>
  );
};

ReactDOM.render(
  <BrowserRouter basename="myFoodDataClone">
    <AppWithRootStore />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
