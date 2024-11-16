//import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  Line,
  Bar,
  Pie,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Ene", ventas: 4000, gastos: 2400, beneficio: 2400 },
  { name: "Feb", ventas: 3000, gastos: 1398, beneficio: 2210 },
  { name: "Mar", ventas: 2000, gastos: 9800, beneficio: 2290 },
  { name: "Abr", ventas: 2780, gastos: 3908, beneficio: 2000 },
  { name: "May", ventas: 1890, gastos: 4800, beneficio: 2181 },
  { name: "Jun", ventas: 2390, gastos: 3800, beneficio: 2500 },
];

const dataPie = [
  { name: "Grupo A", value: 400 },
  { name: "Grupo B", value: 300 },
  { name: "Grupo C", value: 300 },
  { name: "Grupo D", value: 200 },
];

const ChartDate = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Métricas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gráfico de Líneas */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Gráfico de Líneas</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ventas" stroke="#8884d8" />
                <Line type="monotone" dataKey="gastos" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Barras */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Gráfico de Barras</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventas" fill="#8884d8" />
                <Bar dataKey="gastos" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Área */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Gráfico de Área</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="beneficio"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico Circular */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Gráfico Circular</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataPie}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDate;
