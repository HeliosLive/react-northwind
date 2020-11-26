import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/pages/shared/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Alert from "./components/pages/shared/Alert";
import Product from "./components/products/Product";
import ProductState from "./context/product/ProductState";
import CartState from "./context/cart/CartState";
import CategoryState from "./context/category/CategoryState";
import AlertState from "./context/alert/AlertState";
import "./App.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AlertState>
      <ProductState>
        <CartState>
          <CategoryState>
            <div className="App">
              <Router>
                <Navbar />
                <Alert />
                <div className="container-fluid">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/product/:id" component={Product} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </Router>
            </div>
          </CategoryState>
        </CartState>
      </ProductState>
    </AlertState>
  );
};

export default App;
