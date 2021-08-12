import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import store from "./redux/store";
// import { fetchPosts } from "./redux/actions/main";

ReactDOM.render(
  <Auth0Provider
    domain="dev-z1ah5jcw.us.auth0.com"
    clientId="C5prR3e4PK0AGChNv27GHyPTXlEqCfzS"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <Provider store={store}>
      <UserProvider>
        <ProductsProvider>
          <FilterProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FilterProvider>
        </ProductsProvider>
      </UserProvider>
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);
