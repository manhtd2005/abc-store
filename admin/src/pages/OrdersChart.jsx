// ...existing code...
import React, { useContext, useMemo } from "react";
import { OrderContext } from "../contexts/OrderContext";
import { ProductContext } from "../contexts/ProductContext";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#A28FD0",
  "#F87171",
  "#60A5FA",
];

const fmtCurrency = (v) =>
  Number.isFinite(v) ? v.toLocaleString("vi-VN") + " VND" : v;

const OrdersChart = () => {
  const {
    orders,
    loading,
    error,
    getTotalOrders,
    getOrdersByStatus,
    getOrdersByMonth,
    getRevenueByMonth,
    getAverageOrderValue,
  } = useContext(OrderContext);

  // basic stats
  const totalOrders = getTotalOrders();
  const avgOrderValue = useMemo(
    () => getAverageOrderValue() || 0,
    [getAverageOrderValue]
  );

  // orders by status -> PieChart expects { name, value }
  const statusData = useMemo(() => {
    const d = getOrdersByStatus() || [];
    if (!d.length) return [{ name: "No Data", value: 1 }];
    return d.map((s) => ({ name: s.status || "unknown", value: s.value || 0 }));
  }, [getOrdersByStatus]);

  // orders count by month -> LineChart expects { name, count }
  const ordersByMonth = useMemo(() => {
    const d = getOrdersByMonth() || [];
    if (!d.length) return [{ name: "No Data", count: 0 }];
    return d.map((m) => ({ name: m.month, count: m.count }));
  }, [getOrdersByMonth]);

  // revenue by month -> BarChart expects { name, revenue }
  const revenueByMonth = useMemo(() => {
    const d = getRevenueByMonth() || [];
    if (!d.length) return [{ name: "No Data", revenue: 0 }];
    return d.map((m) => ({ name: m.month, revenue: Number(m.revenue) || 0 }));
  }, [getRevenueByMonth]);

  const totalRevenue = useMemo(
    () => revenueByMonth.reduce((s, r) => s + (Number(r.revenue) || 0), 0),
    [revenueByMonth]
  );

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-500">Loading charts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-center text-red-500">Error loading data</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-500">
          No order data to display charts.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border bg-white shadow-sm p-6 text-center">
          <h3 className="text-sm text-gray-500">Total Orders</h3>
          <p className="text-4xl font-bold mt-4 text-blue-600">{totalOrders}</p>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm p-6 text-center">
          <h3 className="text-sm text-gray-500">Average Order Value</h3>
          <p className="text-2xl font-medium mt-4 text-green-600">
            {avgOrderValue ? fmtCurrency(avgOrderValue) : fmtCurrency(0)}
          </p>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm p-6 text-center">
          <h3 className="text-sm text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-medium mt-4 text-indigo-600">
            {fmtCurrency(totalRevenue)}
          </p>
        </div>
      </div>

      {/* charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie: orders by status */}
        <div className="rounded-2xl border bg-white shadow-sm p-6">
          <h4 className="text-lg font-semibold mb-3">Orders by Status</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {statusData.map((_, idx) => (
                  <Cell
                    key={`cell-status-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(v) => v} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line: orders by month */}
        <div className="rounded-2xl border bg-white shadow-sm p-6 lg:col-span-2">
          <h4 className="text-lg font-semibold mb-3">Orders by Month</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={ordersByMonth}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                name="Orders"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar: revenue by month */}
        <div className="rounded-2xl border bg-white shadow-sm p-6 lg:col-span-3">
          <h4 className="text-lg font-semibold mb-3">Revenue by Month</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={revenueByMonth}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) =>
                  Number(value) ? fmtCurrency(Number(value)) : value
                }
              />
              <Legend />
              <Bar dataKey="revenue" fill="#00C49F" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OrdersChart;
