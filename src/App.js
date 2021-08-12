import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  About,
  Cart,
  Home,
  Checkout,
  Error,
  Products,
  SingleProduct,
  PrivateRoute,
} from "./pages";
import { fetchProducts } from "./redux/actions/products_actions";
import store from "./redux/store";
function App() {
  store.dispatch(fetchProducts());
  return (
    <>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/products/:id">
            <SingleProduct />
          </Route>

          <PrivateRoute exact path="/checkout">
            <Checkout />
          </PrivateRoute>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
