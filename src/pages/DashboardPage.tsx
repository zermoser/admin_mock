import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip as ReTooltip, CartesianGrid,
  BarChart, Bar,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { User, MessageCircle, CalendarClock, TrendingUp } from 'lucide-react';

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

  // Animated counters for summary cards
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalThreads, setTotalThreads] = useState(0);
  const [activeToday, setActiveToday] = useState(0);
  const [newSignups, setNewSignups] = useState(0);

  useEffect(() => {
    // Function to animate numbers from 0 to target
    const animateValue = (setter: React.Dispatch<React.SetStateAction<number>>, end: number, duration = 1000) => {
      let start = 0;
      const increment = end / (duration / 50);
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          setter(end);
          clearInterval(interval);
        } else {
          setter(Math.floor(start));
        }
      }, 50);
    };
    animateValue(setTotalUsers, 1524);
    animateValue(setTotalThreads, 4321);
    animateValue(setActiveToday, 189);
    animateValue(setNewSignups, 73);
  }, []);

  // Reusable animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
  };

  const chartVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <motion.h2
        className="text-3xl font-extrabold text-gray-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Dashboard
      </motion.h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <User size={20} className="text-blue-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            </div>
            <motion.p
              className="text-3xl font-bold text-blue-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {totalUsers}
            </motion.p>
            <div className="mt-2 flex items-center text-sm text-green-500">
              <TrendingUp size={16} className="mr-1" />
              <span>+12.5% since last month</span>
            </div>
          </Card>
        </motion.div>

        {/* Total Threads */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-green-100 rounded-full">
                <MessageCircle size={20} className="text-green-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Threads</h3>
            </div>
            <motion.p
              className="text-3xl font-bold text-green-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {totalThreads}
            </motion.p>
            <div className="mt-2 flex items-center text-red-500">
              {/* Suppose threads dropped */}
              <svg className="w-4 h-4 text-red-500 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>-4.2% since last week</span>
            </div>
          </Card>
        </motion.div>

        {/* Active Today */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-full">
                <CalendarClock size={20} className="text-purple-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Active Today</h3>
            </div>
            <motion.p
              className="text-3xl font-bold text-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {activeToday}
            </motion.p>
            <div className="mt-2 flex items-center text-green-500">
              <TrendingUp size={16} className="mr-1" />
              <span>+8.1% vs yesterday</span>
            </div>
          </Card>
        </motion.div>

        {/* New Signups */}
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-red-100 rounded-full">
                <User size={20} className="text-red-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">New Signups</h3>
            </div>
            <motion.p
              className="text-3xl font-bold text-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {newSignups}
            </motion.p>
            <div className="mt-2 flex items-center text-green-500">
              <TrendingUp size={16} className="mr-1" />
              <span>+5.6% since last week</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Area Chart */}
        <motion.div
          variants={chartVariants}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">User Growth (Monthly)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <ReTooltip contentStyle={{ borderRadius: '8px' }} />
                <Area type="monotone" dataKey="users" stroke="#8884d8" fill="url(#colorUsers)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Thread Activity Bar Chart */}
        <motion.div
          variants={chartVariants}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Thread Activity (Weekly)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={threadActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <ReTooltip contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="threads" fill="#34d399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Category Distribution Pie Chart */}
        <motion.div
          className="lg:col-span-2"
          variants={chartVariants}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={4}  // เปลี่ยนจาก padAngle มาเป็น paddingAngle
                  label={({ name, percent }) => `${name}: ${(percent! * 100).toFixed(0)}%`}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <ReTooltip contentStyle={{ borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
