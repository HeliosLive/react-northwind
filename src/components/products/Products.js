import React, { useContext, useEffect } from "react";
import ProductItem from "./ProductItem";
import Pagination from "../pages/shared/Pagination";
import Spinner from "../../components/pages/shared/Spinner";
import ProductContext from "../../context/product/ProductContext";

const Products = () => {
  const productContext = useContext(ProductContext);
  const {
    loading,
    searchProducts,
    products,
    page,
    size,
    setSize,
    sortType,
    sortDir,
  } = productContext;

  useEffect(() => {
    // Create an scoped async function in the hook
    async function setProductArguments() {
      await searchProducts(page, size, sortType, sortDir);
      await setSize({ target: { value: size, text: size } });
    }
    // Execute the created function directly
    setProductArguments();

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Pagination />
        <div className="product-list" style={productStyle}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }
};

const productStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Products;
