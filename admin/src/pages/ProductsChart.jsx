import React, { useContext } from "react";
import assets from "../assets/assets";
import { ProductContext } from "../contexts/ProductContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const ProductsChart = () => {
  const {
    products,
    getTotalProducts,
    getHighestPriceProduct,
    getLowestPriceProduct,
    getHighestRatedProduct,
    getLowestRatedProduct,
  } = useContext(ProductContext);

  // Lấy data từ các hàm context
  const totalProducts = getTotalProducts();
  const highestPriceProduct = getHighestPriceProduct();
  const lowestPriceProduct = getLowestPriceProduct();
  const highestRatedProduct = getHighestRatedProduct();
  const lowestRatedProduct = getLowestRatedProduct();

  // Chuẩn bị data cho biểu đồ
  const chartData = products.map((product) => ({
    name: product.title.substring(0, 20) + "...", // Cắt ngắn tên sản phẩm
    price: product.price,
    rating: product.rating?.rate || 0,
  }));

  // Chuẩn bị data cho biểu đồ tròn theo category
  const categoryData = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }));

  // Màu sắc cho biểu đồ tròn
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="space-y-8">
      {/* ------------ Cards thống kê ------------------ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Tổng số lượng */}
        <div className="rounded-2xl border bg-white shadow-sm p-6 text-center hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Quantity
          </h3>
          <p className="text-8xl font-bold text-blue-600 mt-6">
            {totalProducts}
          </p>
        </div>

        {/* Giá cao */}
        <div className="flex flex-col justify-between rounded-2xl border bg-white shadow-sm p-6 text-center hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700">High Price</h3>
          <img
            src={highestPriceProduct?.image}
            alt="High price product"
            className="w-20 h-20 mx-auto my-4 object-contain"
          />
          <p className="text-sm text-gray-600 mb-2">
            {highestPriceProduct?.title}
          </p>
          <p className="text-xl font-bold text-green-600">
            {highestPriceProduct?.price?.toLocaleString()} VND
          </p>
        </div>

        {/* Giá thấp */}
        <div className="flex flex-col justify-between rounded-2xl border bg-white shadow-sm p-6 text-center hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700">Low Price</h3>
          <img
            src={lowestPriceProduct?.image}
            alt="Low price product"
            className="w-20 h-20 mx-auto my-4 object-contain"
          />
          <p className="text-sm text-gray-600 mb-2">
            {lowestPriceProduct?.title}
          </p>
          <p className="text-xl font-bold text-red-500">
            {lowestPriceProduct?.price?.toLocaleString()} VND
          </p>
        </div>

        {/* Rating cao */}
        <div className="flex flex-col justify-between rounded-2xl border bg-white shadow-sm p-6 text-center hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700">High Rating</h3>
          <img
            src={highestRatedProduct?.image || assets.bell}
            alt="High rating product"
            className="w-20 h-20 mx-auto my-4 object-contain"
          />
          <p className="text-sm text-gray-600 mb-2">
            {highestRatedProduct?.title || "No product found"}
          </p>
          <p className="text-xl font-bold text-green-600">
            ⭐ {highestRatedProduct?.rating?.rate?.toFixed(1) || 0}
          </p>
        </div>

        {/* Rating thấp */}
        <div className="flex flex-col justify-between rounded-2xl border bg-white shadow-sm p-6 text-center hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700">Low Rating</h3>
          <img
            src={lowestRatedProduct?.image || assets.bell}
            alt="Low rating product"
            className="w-20 h-20 mx-auto my-4 object-contain"
          />
          <p className="text-sm text-gray-600 mb-2">
            {lowestRatedProduct?.title || "No product found"}
          </p>
          <p className="text-xl font-bold text-red-500">
            ⭐ {lowestRatedProduct?.rating?.rate?.toFixed(1) || 0}
          </p>
        </div>
      </div>

      {/* ------------ Biểu đồ thể hiện số sản phẩm và giá --------------- */}
      <div className="rounded-2xl border bg-white shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Products Analysis
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              fontSize={12}
            />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="price"
              fill="#8884d8"
              name="Price (VND)"
            />
            <Bar
              yAxisId="right"
              dataKey="rating"
              fill="#82ca9d"
              name="Rating"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ tròn */}
      <div className="rounded-2xl border bg-white shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Products by Category
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ đường */}
      <div className="rounded-2xl border bg-white shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Price Trends
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              fontSize={12}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Price (VND)"
            />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#82ca9d"
              name="Rating"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductsChart;
