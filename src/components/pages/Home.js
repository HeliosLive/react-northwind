import React, { Fragment } from "react";
import Search from "../search/Search";
import Products from "../products/Products";
import ProductChart from "../products/ProductChart";

const Home = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-4">
          <div className="d-flex align-items-start align-self-baseline container-fluid">
            <Search />
          </div>
          <div className="d-flex align-items-end align-self-end">
            <ProductChart />
          </div>
        </div>
        <div className="col-md-8">
          <Products />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
