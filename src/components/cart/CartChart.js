import React, { useEffect, useState, useContext } from "react";
import CategoryContext from "../../context/category/CategoryContext";
import CartContext from "../../context/cart/CartContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CartChart = (props) => {
  const categoryContext = useContext(CategoryContext);
  const cartContext = useContext(CartContext);
  const { categories } = categoryContext;
  const {
    items,
    increaseItems,
    decreaseItems,
    addToCart,
    ClearCart,
    removeFromCart,
  } = cartContext;
  const [ResData, setResData] = useState([]);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function setProductArguments() {
      const groupedData = await Object.values(groupBy(items, "categoryId"));
      let resp = [];
      for (let p = 0; p < groupedData.length; p++) {
        const selectedCategory = await getCategoryName(
          groupedData[p][0].categoryId
        );
        let total = 0;
        groupedData[p].forEach((element) => {
          total += element.unitPrice;
        });
        if (selectedCategory) {
          const obj = {
            name: selectedCategory.name,
            quantity: element.quantity,
            averagePrice: (total / groupedData[p].length)
              .toString()
              .slice(0, 5),
          };
          resp.push(obj);
        }
      }
      setResData(resp);
    }
    // Execute the created function directly
    setProductArguments();

    // eslint-disable-next-line
  }, [
    items,
    increaseItems,
    decreaseItems,
    addToCart,
    ClearCart,
    removeFromCart,
  ]);

  const groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {}
    );

  const getCategoryName = (categoryId) => {
    return categories.find((el) => el.id === categoryId);
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={ResData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" />
        <Bar dataKey="averagePrice" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CartChart;
