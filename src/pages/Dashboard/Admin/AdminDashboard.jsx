import React, { useState } from "react";
import { Button } from "../../../components/ui/Button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const platformGrowth = [
    { month: "Jan", users: 890, courses: 45, revenue: 12500 },
    { month: "Feb", users: 1120, courses: 52, revenue: 16800 },
    { month: "Mar", users: 1380, courses: 61, revenue: 22400 },
    { month: "Apr", users: 1650, courses: 73, revenue: 28900 },
    { month: "May", users: 1920, courses: 84, revenue: 35600 },
    { month: "Jun", users: 2247, courses: 89, revenue: 42300 },
  ];

  const userDistribution = [
    { role: "Students", count: 1856, color: "#10b981" },
    { role: "Instructors", count: 134, color: "#3b82f6" },
    { role: "Admins", count: 12, color: "#f59e0b" },
  ];

  const pendingCourses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "John Smith",
      category: "Programming",
      price: 129.99,
      submittedDate: "2024-06-15",
      status: "Pending",
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      instructor: "Sarah Johnson",
      category: "Marketing",
      price: 89.99,
      submittedDate: "2024-06-14",
      status: "Pending",
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Mike Chen",
      category: "Programming",
      price: 149.99,
      submittedDate: "2024-06-13",
      status: "Under Review",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Alex Rivera",
      email: "alex@example.com",
      role: "Student",
      joinDate: "2024-06-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Emma Davis",
      email: "emma@example.com",
      role: "Instructor",
      joinDate: "2024-06-14",
      status: "Active",
    },
    {
      id: 3,
      name: "David Kim",
      email: "david@example.com",
      role: "Student",
      joinDate: "2024-06-14",
      status: "Active",
    },
    {
      id: 4,
      name: "Lisa Wang",
      email: "lisa@example.com",
      role: "Student",
      joinDate: "2024-06-13",
      status: "Pending",
    },
  ];

  const recentTransactions = [
    {
      id: "TXN1001",
      student: "Alex Rivera",
      course: "React Fundamentals",
      amount: 89.99,
      date: "2024-06-15",
      status: "Completed",
    },
    {
      id: "TXN1002",
      student: "Emma Davis",
      course: "Advanced CSS",
      amount: 69.99,
      date: "2024-06-15",
      status: "Completed",
    },
    {
      id: "TXN1003",
      student: "David Kim",
      course: "JavaScript ES6+",
      amount: 99.99,
      date: "2024-06-14",
      status: "Completed",
    },
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat bg-primary/10 border border-primary/20 rounded-lg">
          <div className="stat-figure text-primary">
            <span className="text-3xl">👥</span>
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">2,247</div>
          <div className="stat-desc">+127 this month</div>
        </div>

        <div className="stat bg-success/10 border border-success/20 rounded-lg">
          <div className="stat-figure text-success">
            <span className="text-3xl">📚</span>
          </div>
          <div className="stat-title">Total Courses</div>
          <div className="stat-value text-success">89</div>
          <div className="stat-desc">+16 this month</div>
        </div>

        <div className="stat bg-warning/10 border border-warning/20 rounded-lg">
          <div className="stat-figure text-warning">
            <span className="text-3xl">💰</span>
          </div>
          <div className="stat-title">Monthly Revenue</div>
          <div className="stat-value text-warning">$42.3K</div>
          <div className="stat-desc">+18% from last month</div>
        </div>

        <div className="stat bg-info/10 border border-info/20 rounded-lg">
          <div className="stat-figure text-info">
            <span className="text-3xl">🎓</span>
          </div>
          <div className="stat-title">Active Instructors</div>
          <div className="stat-value text-info">134</div>
          <div className="stat-desc">+8 this month</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Growth */}
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Platform Growth</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={platformGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(var(--p))"
                    name="Users"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="courses"
                    stroke="hsl(var(--s))"
                    name="Courses"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* User Distribution */}
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">User Distribution</h2>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userDistribution}
                    dataKey="count"
                    nameKey="role"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="hsl(var(--p))"
                  >
                    {userDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {userDistribution.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">{item.role}</span>
                  </div>
                  <div className="text-lg font-bold">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4 text-warning">
              Pending Course Approvals
            </h2>
            <div className="space-y-3">
              {pendingCourses.slice(0, 3).map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-2 bg-base-200 rounded"
                >
                  <div>
                    <div className="font-medium text-sm">{course.title}</div>
                    <div className="text-xs text-base-content/70">
                      by {course.instructor}
                    </div>
                  </div>
                  <div className="badge badge-warning badge-sm">
                    {course.status}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              View All ({pendingCourses.length})
            </Button>
          </div>
        </div>

        {/* Recent Users */}
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4 text-info">
              New User Registrations
            </h2>
            <div className="space-y-3">
              {recentUsers.slice(0, 3).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 bg-base-200 rounded"
                >
                  <div>
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-base-content/70">
                      {user.role}
                    </div>
                  </div>
                  <div className="text-xs text-base-content/60">
                    {user.joinDate}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              View All Users
            </Button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4 text-success">
              Recent Transactions
            </h2>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-2 bg-base-200 rounded"
                >
                  <div>
                    <div className="font-medium text-sm">
                      {transaction.course}
                    </div>
                    <div className="text-xs text-base-content/70">
                      {transaction.student}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      ${transaction.amount}
                    </div>
                    <div className="badge badge-success badge-xs">
                      {transaction.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              View All Transactions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button variant="primary">Add New User</Button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Total Students</div>
          <div className="stat-value text-success">1,856</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Total Instructors</div>
          <div className="stat-value text-info">134</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Pending Users</div>
          <div className="stat-value text-warning">8</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-12">
                            <span className="text-xl">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                          <div className="text-sm opacity-50">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-outline">{user.role}</div>
                    </td>
                    <td>{user.joinDate}</td>
                    <td>
                      <div
                        className={`badge ${
                          user.status === "Active"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {user.status}
                      </div>
                    </td>
                    <td>
                      <div className="dropdown dropdown-end">
                        <Button
                          tabIndex={0}
                          role="button"
                          variant="ghost"
                          size="xs"
                        >
                          Actions
                        </Button>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <a>Make Instructor</a>
                          </li>
                          <li>
                            <a>Ban User</a>
                          </li>
                          <li>
                            <a>View Profile</a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const CoursesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <div className="flex gap-2">
          <Button variant="outline">Export Data</Button>
          <Button variant="primary">Course Analytics</Button>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Published Courses</div>
          <div className="stat-value text-success">89</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Pending Approval</div>
          <div className="stat-value text-warning">12</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Rejected</div>
          <div className="stat-value text-error">3</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-info">$42.3K</div>
        </div>
      </div>

      {/* Pending Courses Table */}
      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <div className="card-body">
          <h3 className="card-title mb-4">Courses Pending Approval</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Instructor</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingCourses.map((course) => (
                  <tr key={course.id}>
                    <td className="font-medium">{course.title}</td>
                    <td>{course.instructor}</td>
                    <td>
                      <div className="badge badge-outline">
                        {course.category}
                      </div>
                    </td>
                    <td className="font-bold">${course.price}</td>
                    <td>{course.submittedDate}</td>
                    <td>
                      <div className="flex gap-1">
                        <Button variant="success" size="xs">
                          Approve
                        </Button>
                        <Button variant="error" size="xs">
                          Reject
                        </Button>
                        <Button variant="info" size="xs">
                          Review
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const TransactionsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transaction Management</h2>
        <Button variant="outline">Download Report</Button>
      </div>

      {/* Transaction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Total Transactions</div>
          <div className="stat-value text-primary">1,247</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-success">$42,350</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">This Month</div>
          <div className="stat-value text-info">$8,450</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Failed Payments</div>
          <div className="stat-value text-error">12</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="font-mono text-sm">{transaction.id}</td>
                    <td>{transaction.student}</td>
                    <td>{transaction.course}</td>
                    <td className="font-bold">${transaction.amount}</td>
                    <td>{transaction.date}</td>
                    <td>
                      <div className="badge badge-success">
                        {transaction.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "courses", label: "Courses", icon: "📚" },
    { id: "transactions", label: "Transactions", icon: "💰" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-base-content">
          Admin Dashboard
        </h1>
        <p className="text-base-content/70">
          Manage users, courses, and monitor platform performance
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab gap-2 ${activeTab === tab.id ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "users" && <UsersTab />}
        {activeTab === "courses" && <CoursesTab />}
        {activeTab === "transactions" && <TransactionsTab />}
      </div>
    </div>
  );
}
