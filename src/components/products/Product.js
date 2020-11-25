import React, { Fragment, useEffect, useContext } from "react";
import Spinner from "../pages/shared/Spinner";
import { Link } from "react-router-dom";
import ProductContext from "../../context/product/ProductContext";
import { Button } from "react-bootstrap";

const Product = ({ match }) => {
  const productContext = useContext(ProductContext);

  const { loading, product, getProduct } = productContext;

  useEffect(() => {
    getProduct(match.params.id);
    // eslint-disable-next-line
  }, []);

  const {
    id,
    name,
    supplierId,
    categoryId,
    quantityPerUnit,
    unitPrice,
    unitsInStock,
    unitsOnOrder,
    reorderLevel,
    discontinued,
    supplier,
    category,
  } = product;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back To List
      </Link>
      <div className="card grid-2">
        <div className="all-center">
          <h1>{name}</h1>
          <p>Price: {unitPrice}</p>
          <p>Per Unit: {quantityPerUnit}</p>
          <p>Unit on stock: {unitsInStock}</p>
          <p>Unit on order: {unitsOnOrder}</p>
        </div>
      </div>
      <div className="card text-center">
        <Button variant="success">Add to Cart</Button>{" "}
      </div>
    </Fragment>
  );
};

export default Product;
