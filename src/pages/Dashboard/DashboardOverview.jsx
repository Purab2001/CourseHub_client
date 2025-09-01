import React from "react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Button } from "../../components/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function DashboardOverview() {
  const { user } = useAuth();

  // Mock user role - simulate different roles for demo
  const [userRole, setUserRole] = useState("student"); // Change to test different roles

  // Mock data for charts
  const monthlyProgress = [
    { month: "Jan", enrolled: 2, completed: 1, hours: 15 },
    { month: "Feb", enrolled: 3, completed: 2, hours: 25 },
    { month: "Mar", enrolled: 4, completed: 2, hours: 30 },
    { month: "Apr", enrolled: 5, completed: 3, hours: 35 },
    { month: "May", enrolled: 5, completed: 4, hours: 40 },
    { month: "Jun", enrolled: 6, completed: 5, hours: 45 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 1800 },
    { month: "Mar", revenue: 2200 },
    { month: "Apr", revenue: 2600 },
    { month: "May", revenue: 2840 },
    { month: "Jun", revenue: 3200 },
  ];

  const courseCategories = [
    { name: "Programming", value: 40, color: "#cf4434" },
    { name: "Design", value: 30, color: "#ea9b92" },
    { name: "Business", value: 20, color: "#e7695a" },
    { name: "Marketing", value: 10, color: "#ff9999" },
  ];

  // Role-based stats and content
  const getStatsForRole = () => {
    switch (userRole) {
      case "student":
        return [
          {
            label: "Courses Enrolled",
            value: 8,
            change: "+2 this month",
            icon: "📚",
            color: "text-primary",
            bgColor: "bg-primary/10",
          },
          {
            label: "Courses Completed",
            value: 5,
            change: "+1 this week",
            icon: "✅",
            color: "text-success",
            bgColor: "bg-success/10",
          },
          {
            label: "Certificates Earned",
            value: 3,
            change: "Recent: React Basics",
            icon: "🏆",
            color: "text-warning",
            bgColor: "bg-warning/10",
          },
          {
            label: "Total Study Hours",
            value: 127,
            change: "+8 hours this week",
            icon: "⏱️",
            color: "text-info",
            bgColor: "bg-info/10",
          },
        ];
      case "instructor":
        return [
          {
            label: "Courses Created",
            value: 12,
            change: "+2 this month",
            icon: "📖",
            color: "text-primary",
            bgColor: "bg-primary/10",
          },
          {
            label: "Total Students",
            value: 342,
            change: "+24 this week",
            icon: "👥",
            color: "text-success",
            bgColor: "bg-success/10",
          },
          {
            label: "Monthly Revenue",
            value: "$2,840",
            change: "+15% from last month",
            icon: "💰",
            color: "text-warning",
            bgColor: "bg-warning/10",
          },
          {
            label: "Course Rating",
            value: "4.8",
            change: "Based on 156 reviews",
            icon: "⭐",
            color: "text-info",
            bgColor: "bg-info/10",
          },
        ];
      case "admin":
        return [
          {
            label: "Total Users",
            value: 1247,
            change: "+45 this week",
            icon: "👤",
            color: "text-primary",
            bgColor: "bg-primary/10",
          },
          {
            label: "Total Courses",
            value: 89,
            change: "12 pending approval",
            icon: "📚",
            color: "text-success",
            bgColor: "bg-success/10",
          },
          {
            label: "Monthly Revenue",
            value: "$18,450",
            change: "+22% from last month",
            icon: "💎",
            color: "text-warning",
            bgColor: "bg-warning/10",
          },
          {
            label: "Active Instructors",
            value: 34,
            change: "+3 this month",
            icon: "🎓",
            color: "text-info",
            bgColor: "bg-info/10",
          },
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  const getRoleDisplayName = () => {
    return userRole.charAt(0).toUpperCase() + userRole.slice(1);
  };

  return (
    <div className="space-y-8 p-1">
      {/* Header with role switcher for demo */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-base-content mb-2">
            Welcome back, {user?.displayName || "User"}! 👋
          </h1>
          <p className="text-lg text-base-content/70">
            {userRole === "student" &&
              "Ready to continue your learning journey?"}
            {userRole === "instructor" &&
              "Ready to inspire more students today?"}
            {userRole === "admin" && "Here's your platform overview."}
          </p>
        </div>

        {/* Role switcher for demo purposes */}
        <div className="card bg-base-200 p-4">
          <div className="text-sm font-medium mb-2">Demo: Switch Role</div>
          <div className="flex gap-2">
            {["student", "instructor", "admin"].map((role) => (
              <Button
                key={role}
                onClick={() => setUserRole(role)}
                variant={userRole === role ? "primary" : "outline"}
                size="sm"
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card bg-base-100 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div
                    className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-base-content mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-base-content/70 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-base-300">
                <p className={`text-sm ${stat.color} font-medium`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress/Revenue Chart */}
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">📊</span>
              {userRole === "student" && "Learning Progress"}
              {userRole === "instructor" && "Monthly Revenue"}
              {userRole === "admin" && "Platform Growth"}
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {userRole === "instructor" ? (
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Revenue"]}
                      labelStyle={{ color: "black" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--p))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--p))", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip labelStyle={{ color: "black" }} />
                    <Bar
                      dataKey="enrolled"
                      fill="hsl(var(--p))"
                      name="Enrolled"
                    />
                    <Bar
                      dataKey="completed"
                      fill="hsl(var(--s))"
                      name="Completed"
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">🎯</span>
              Course Categories
            </h2>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {courseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Percentage"]}
                    labelStyle={{ color: "black" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {courseCategories.map((category, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm text-base-content/70">
                    {category.name} ({category.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">⚡</span>
              Quick Actions
            </h2>
            <div className="space-y-3">
              {userRole === "student" && (
                <>
                  <Button
                    variant="primary"
                    fullWidth
                    className="justify-start group"
                  >
                    <span className="text-lg mr-2 group-hover:scale-110 transition-transform">
                      🔍
                    </span>
                    Browse Courses
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    className="justify-start group"
                  >
                    <span className="text-lg mr-2 group-hover:scale-110 transition-transform">
                      📊
                    </span>
                    View Progress
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    className="justify-start group"
                  >
                    <span className="text-lg mr-2 group-hover:scale-110 transition-transform">
                      🏆
                    </span>
                    My Certificates
                  </Button>
                </>
              )}
              {userRole === "instructor" && (
                <>
                  <Button
                    variant="primary"
                    fullWidth
                    className="justify-start group"
                  >
                    <span className="text-lg mr-2 group-hover:scale-110 transition-transform">
                      ➕
                    </span>
                    Create Course
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    className="justify-start group"
                  >
                    <span className="text-lg mr-2 group-hover:scale-110 transition-transform">
                      👥
                    </span>
                    View Students
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    className="justify-start group"
                  >
                    <span className="text-lg mr-2 group-hover:scale-110 transition-transform">
                      📈
                    </span>
                    Sales Analytics
                  </Button>
                </>
              )}
              {userRole === "admin" && (
                <>
                  <Button
                    variant="primary"
                    fullWidth
                    className="justify-start group"
                  >
                    <span className="text-lg mr-2 group-hover:scale-110 transition-transform">
                      ✅
                    </span>
                    Approve Courses
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    className="justify-start group"
                  >
                    <span className="text-lg mr-2 group-hover:scale-110 transition-transform">
                      👤
                    </span>
                    Manage Users
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    className="justify-start group"
                  >
                    <span className="text-lg mr-2 group-hover:scale-110 transition-transform">
                      💰
                    </span>
                    View Transactions
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 border border-base-300 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">📈</span>
                Recent Activity
              </h2>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {userRole === "student" && (
                  <>
                    <div className="flex items-start space-x-4 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors">
                      <div className="w-10 h-10 bg-success/20 text-success rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">✅</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-base-content">
                          Completed "Introduction to React Hooks"
                        </p>
                        <p className="text-sm text-base-content/70">
                          Course by John Smith • 2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors">
                      <div className="w-10 h-10 bg-info/20 text-info rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">📚</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-base-content">
                          Enrolled in "Advanced CSS Grid Layout"
                        </p>
                        <p className="text-sm text-base-content/70">
                          Course by Sarah Johnson • 1 day ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors">
                      <div className="w-10 h-10 bg-warning/20 text-warning rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">🏆</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-base-content">
                          Earned certificate for "JavaScript Fundamentals"
                        </p>
                        <p className="text-sm text-base-content/70">
                          3 days ago
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {userRole === "instructor" && (
                  <>
                    <div className="flex items-start space-x-4 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors">
                      <div className="w-10 h-10 bg-success/20 text-success rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">👥</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-base-content">
                          12 new students enrolled in "React Mastery"
                        </p>
                        <p className="text-sm text-base-content/70">Today</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors">
                      <div className="w-10 h-10 bg-info/20 text-info rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">⭐</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-base-content">
                          New 5-star review on "Node.js Fundamentals"
                        </p>
                        <p className="text-sm text-base-content/70">
                          By Alex Chen • 2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors">
                      <div className="w-10 h-10 bg-warning/20 text-warning rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">📖</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-base-content">
                          Published "Advanced TypeScript Patterns"
                        </p>
                        <p className="text-sm text-base-content/70">
                          Yesterday
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {userRole === "admin" && (
                  <>
                    <div className="flex items-start space-x-4 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors">
                      <div className="w-10 h-10 bg-success/20 text-success rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">✅</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-base-content">
                          Approved 3 new courses for publication
                        </p>
                        <p className="text-sm text-base-content/70">
                          30 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors">
                      <div className="w-10 h-10 bg-info/20 text-info rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">👤</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-base-content">
                          15 new user registrations today
                        </p>
                        <p className="text-sm text-base-content/70">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors">
                      <div className="w-10 h-10 bg-warning/20 text-warning rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">💰</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-base-content">
                          Monthly revenue target achieved (105%)
                        </p>
                        <p className="text-sm text-base-content/70">
                          Yesterday
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
