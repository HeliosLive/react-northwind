import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Form, Pagination as PaginationCmp } from "react-bootstrap";
import ProductContext from "../../../context/product/ProductContext";

const Pagination = () => {
  const productContext = useContext(ProductContext);
  const {
    page,
    size,
    setPage,
    sizeOptions,
    setSize,
    pageOptions,
  } = productContext;

  let pageItems = [];
  for (let k = 1; k <= Math.ceil(pageOptions); k++) {
    pageItems.push(
      <PaginationCmp.Item key={k} active={k === page}>
        {k}
      </PaginationCmp.Item>
    );
  }

  return (
    <div className="d-flex justify-content-between">
      <PaginationCmp onClick={setPage}>{pageItems}</PaginationCmp>
      <Form.Group>
        <Form.Control as="select" value={size} onChange={setSize}>
          {sizeOptions.map((sizeOpts) => (
            <option key={sizeOpts} value={sizeOpts}>
              {sizeOpts}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
};

Pagination.defaultProps = {
  page: 1,
  size: 30,
  SortType: "price",
  sortDir: "ASC",
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  SortType: PropTypes.string.isRequired,
  sortDir: PropTypes.string.isRequired,
};

export default Pagination;
