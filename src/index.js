import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";

import App from "./App";

import {reducer} from "./reducer/reducer";
import {api} from "./api";
import {Router} from "react-router-dom";
import history from "./history";

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {api}
      }
    }),
  devTools: true
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router history={history}>
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>
);
