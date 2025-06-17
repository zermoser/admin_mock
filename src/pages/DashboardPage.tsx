import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import Card from '../components/Card';

export default function DashboardPage() {
  // Mock data for charts
  const userGrowthData = [
    { month: 'Jan', users: 400 },
    { month: 'Feb', users: 600 },
    { month: 'Mar', users: 800 },
    { month: 'Apr', users: 1000 },
    { month: 'May', users: 1200 },
    { month: 'Jun', users: 1500 },
  ];

  const threadActivityData = [
    { day: 'Mon', threads: 30 },
    { day: 'Tue', threads: 45 },
    { day: 'Wed', threads: 50 },
    { day: 'Thu', threads: 70 },
    { day: 'Fri', threads: 65 },
    { day: 'Sat', threads: 80 },
    { day: 'Sun', threads: 55 },
  ];

  const categoryDistribution = [
    { name: 'General', value: 400 },
    { name: 'News', value: 300 },
    { name: 'Discussion', value: 300 },
    { name: 'Feedback', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Users">
          <span className="text-3xl font-semibold text-blue-600">1,524</span>
        </Card>
        <Card title="Total Threads">
          <span className="text-3xl font-semibold text-green-600">4,321</span>
        </Card>
        <Card title="Active Today">
          <span className="text-3xl font-semibold text-purple-600">189</span>
        </Card>
        <Card title="New Signups">
          <span className="text-3xl font-semibold text-red-600">73</span>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart: User Growth */}
        <Card title="User Growth (Monthly)">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart: Thread Activity */}
        <Card title="Thread Activity (Weekly)">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={threadActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="threads" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart: Category Distribution */}
        <Card title="Category Distribution" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
);
}
