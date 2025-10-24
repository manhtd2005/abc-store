import React, { useContext, useMemo } from "react";
import { UserContext } from "../contexts/UserContext";
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
];

const AccountsChart = () => {
  const {
    getTotalUsers,
    getUsersByCity,
    getRegistrationsByMonth,
    getTopEmailDomains,
  } = useContext(UserContext);

  const totalUsers = getTotalUsers();

  const cityData = useMemo(() => {
    const d = getUsersByCity() || [];
    return d.length ? d : [{ name: "No data", value: 1 }];
  }, [getUsersByCity]);

  const registrations = useMemo(() => {
    // returns [{ month: 'YYYY-MM', count }]
    const r = getRegistrationsByMonth() || [];
    // convert to { name, count } for chart axis
    return r.length
      ? r.map((item) => ({ name: item.month, count: item.count }))
      : [{ name: "No data", count: 0 }];
  }, [getRegistrationsByMonth]);

  const domainData = useMemo(() => {
    const top = getTopEmailDomains(6) || [];
    return top.length
      ? top.map((t) => ({ name: t.domain, value: t.count }))
      : [{ name: "No data", value: 1 }];
  }, [getTopEmailDomains]);

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border bg-white shadow-sm p-6 text-center">
          <h3 className="text-sm text-gray-500">Total Accounts</h3>
          <p className="text-4xl font-bold mt-4 text-blue-600">{totalUsers}</p>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm p-6 text-center">
          <h3 className="text-sm text-gray-500">Cities</h3>
          <p className="text-4xl font-bold mt-4 text-green-600">
            {cityData.length}
          </p>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm p-6 text-center">
          <h3 className="text-sm text-gray-500">Top Email Domain</h3>
          <p className="text-2xl font-medium mt-4 text-indigo-600">
            {domainData[0]?.name || "N/A"} ({domainData[0]?.value || 0})
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie: users by city */}
        <div className="rounded-2xl border bg-white shadow-sm p-6">
          <h4 className="text-lg font-semibold mb-3">Users by City</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cityData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {cityData.map((_, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line: registrations by month */}
        <div className="rounded-2xl border bg-white shadow-sm p-6 lg:col-span-2 h-[500px]">
          <h4 className="text-lg font-semibold mb-3">Registrations by Month</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={registrations}
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
                name="Registrations"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar: top email domains */}
        <div className="rounded-2xl border bg-white shadow-sm p-6 lg:col-span-3">
          <h4 className="text-lg font-semibold mb-3">Top Email Domains</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={domainData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#00C49F" name="Accounts" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AccountsChart;
