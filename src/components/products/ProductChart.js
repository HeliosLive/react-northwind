import React, { useEffect, useState, useContext } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import CategoryContext from "../../context/category/CategoryContext";
import ProductContext from "../../context/product/ProductContext";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {" "}
        {value > 1 ? `${value} total items` : `${value} total item`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const ProductChart = (props) => {
  const categoryContext = useContext(CategoryContext);
  const productContext = useContext(ProductContext);
  const { categories } = categoryContext;
  const { products } = productContext;
  const [ActiveIndex, setActiveIndex] = useState(0);
  const [ResData, setResData] = useState([]);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function setProductArguments() {
      const groupedData = await Object.values(groupBy(products, "categoryId"));
      let resp = [];
      for (let p = 0; p < groupedData.length; p++) {
        const selectedCategory = await getCategoryName(
          groupedData[p][0].categoryId
        );
        if (selectedCategory) {
          const obj = {
            name: selectedCategory.name,
            value: groupedData[p].length,
          };
          resp.push(obj);
        }
      }
      setResData(resp);
      setActiveIndex(0);
    }
    // Execute the created function directly
    setProductArguments();

    // eslint-disable-next-line
  }, [products]);

  const groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {}
    );

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  const getCategoryName = (categoryId) => {
    return categories.find((el) => el.id === categoryId);
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          activeIndex={ActiveIndex}
          activeShape={renderActiveShape}
          data={ResData}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProductChart;
