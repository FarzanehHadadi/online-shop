import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Auth0Provider
    domain="dev-z1ah5jcw.us.auth0.com"
    clientId="C5prR3e4PK0AGChNv27GHyPTXlEqCfzS"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <Provider store={store}>
      <UserProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </UserProvider>
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);
