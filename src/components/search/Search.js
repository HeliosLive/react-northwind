import React, { useEffect, useContext } from "react";
import CategoryContext from "../../context/category/CategoryContext";
import ProductContext from "../../context/product/ProductContext";
import { Select } from "antd";

const Search = () => {
  const categoryContext = useContext(CategoryContext);
  const productContext = useContext(ProductContext);
  const {
    categories,
    filteredCategories,
    searchCategories,
    setFilteredCategories,
    clearFilteredCategories,
  } = categoryContext;
  const { searchProducts, setPage } = productContext;
  const { Option } = Select;

  useEffect(() => {
    // Create an scoped async function in the hook
    async function setProductArguments() {
      await searchCategories();
    }
    // Execute the created function directly
    setProductArguments();

    // eslint-disable-next-line
  }, []);

  const handleChange = async (value) => {
    await setFilteredCategories(value);
    await searchProducts({ categoryId: value });
    setPage({ target: { text: 1 } });
  };

  return (
    <div className="row" style={{ width: "100%" }}>
      <div className="col-md-12">
        <Select
          mode="tags"
          size="large"
          placeholder="Filter by categories"
          defaultValue={filteredCategories}
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          {categories.map((category) => (
            <Option key={category.id}>{category.name}</Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Search;
