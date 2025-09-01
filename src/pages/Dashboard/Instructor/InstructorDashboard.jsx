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

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const monthlyRevenue = [
    { month: "Jan", revenue: 1200, students: 45 },
    { month: "Feb", revenue: 1800, students: 67 },
    { month: "Mar", revenue: 2200, students: 89 },
    { month: "Apr", revenue: 2600, students: 102 },
    { month: "May", revenue: 2840, students: 118 },
    { month: "Jun", revenue: 3200, students: 134 },
  ];

  const coursePerformance = [
    { name: "React Fundamentals", students: 145, revenue: 8700, rating: 4.8 },
    { name: "Advanced JavaScript", students: 98, revenue: 7840, rating: 4.6 },
    { name: "Node.js Backend", students: 76, revenue: 9120, rating: 4.9 },
    { name: "CSS Grid Mastery", students: 54, revenue: 3780, rating: 4.7 },
  ];

  const studentProgress = [
    { course: "React", completed: 85, inProgress: 60, total: 145 },
    { course: "JavaScript", completed: 60, inProgress: 38, total: 98 },
    { course: "Node.js", completed: 45, inProgress: 31, total: 76 },
    { course: "CSS", completed: 35, inProgress: 19, total: 54 },
  ];

  const recentActivity = [
    {
      type: "enrollment",
      message: "12 new students enrolled in React Fundamentals",
      time: "2 hours ago",
      icon: "👥",
    },
    {
      type: "review",
      message: "Sarah M. left a 5-star review on Node.js Backend",
      time: "4 hours ago",
      icon: "⭐",
    },
    {
      type: "completion",
      message: "25 students completed Advanced JavaScript",
      time: "6 hours ago",
      icon: "🎉",
    },
    {
      type: "question",
      message: "New Q&A question in CSS Grid Mastery",
      time: "8 hours ago",
      icon: "❓",
    },
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat bg-primary/10 border border-primary/20 rounded-lg">
          <div className="stat-figure text-primary">
            <span className="text-3xl">📚</span>
          </div>
          <div className="stat-title">Total Courses</div>
          <div className="stat-value text-primary">12</div>
          <div className="stat-desc">+2 this month</div>
        </div>

        <div className="stat bg-success/10 border border-success/20 rounded-lg">
          <div className="stat-figure text-success">
            <span className="text-3xl">👥</span>
          </div>
          <div className="stat-title">Total Students</div>
          <div className="stat-value text-success">373</div>
          <div className="stat-desc">+24 this week</div>
        </div>

        <div className="stat bg-warning/10 border border-warning/20 rounded-lg">
          <div className="stat-figure text-warning">
            <span className="text-3xl">💰</span>
          </div>
          <div className="stat-title">Monthly Revenue</div>
          <div className="stat-value text-warning">$3,200</div>
          <div className="stat-desc">+15% from last month</div>
        </div>

        <div className="stat bg-info/10 border border-info/20 rounded-lg">
          <div className="stat-figure text-info">
            <span className="text-3xl">⭐</span>
          </div>
          <div className="stat-title">Avg Rating</div>
          <div className="stat-value text-info">4.8</div>
          <div className="stat-desc">Based on 284 reviews</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Monthly Revenue & Students</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar
                    yAxisId="left"
                    dataKey="revenue"
                    fill="hsl(var(--p))"
                    name="Revenue ($)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="students"
                    stroke="hsl(var(--s))"
                    name="Students"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Course Performance */}
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Top Performing Courses</h2>
            <div className="space-y-4">
              {coursePerformance.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-base-200 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-base-content/70">
                      {course.students} students • ${course.revenue} revenue
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-warning">⭐</span>
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-3 bg-base-200 rounded-lg"
              >
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-base-content">
                    {activity.message}
                  </p>
                  <p className="text-sm text-base-content/70">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CreateCourseTab = () => {
    const [courseData, setCourseData] = useState({
      title: "",
      description: "",
      category: "",
      price: "",
      thumbnail: null,
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCourseData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
      setCourseData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Course data:", courseData);
      // Handle form submission
    };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-6">Create New Course</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Course Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={courseData.title}
                  onChange={handleInputChange}
                  placeholder="Enter course title"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Course Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Description *</span>
                </label>
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what students will learn..."
                  className="textarea textarea-bordered h-32"
                  required
                ></textarea>
              </div>

              {/* Category and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Category *</span>
                  </label>
                  <select
                    name="category"
                    value={courseData.category}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                    <option value="photography">Photography</option>
                    <option value="music">Music</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Price (USD) *
                    </span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={courseData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Course Thumbnail
                  </span>
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                />
                <label className="label">
                  <span className="label-text-alt">
                    Recommended size: 1280x720px
                  </span>
                </label>
              </div>

              {/* Preview */}
              {courseData.title && (
                <div className="card bg-base-200 border border-base-300">
                  <div className="card-body">
                    <h3 className="card-title text-lg">Course Preview</h3>
                    <div className="space-y-2">
                      <p>
                        <strong>Title:</strong> {courseData.title}
                      </p>
                      <p>
                        <strong>Category:</strong> {courseData.category}
                      </p>
                      <p>
                        <strong>Price:</strong> ${courseData.price}
                      </p>
                      {courseData.description && (
                        <p>
                          <strong>Description:</strong>{" "}
                          {courseData.description.substring(0, 100)}...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="form-control">
                <Button type="submit" variant="primary">
                  Create Course
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const AnalyticsTab = () => (
    <div className="space-y-6">
      {/* Student Progress Analytics */}
      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Student Progress by Course</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="completed"
                  stackId="a"
                  fill="hsl(var(--su))"
                  name="Completed"
                />
                <Bar
                  dataKey="inProgress"
                  stackId="a"
                  fill="hsl(var(--wa))"
                  name="In Progress"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Completion Rates */}
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Completion Rates</h2>
            <div className="space-y-4">
              {coursePerformance.map((course, index) => {
                const completionRate = Math.round(course.students * 0.7); // Mock completion rate
                const percentage = Math.round(
                  (completionRate / course.students) * 100
                );

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{course.name}</span>
                      <span className="text-sm text-base-content/70">
                        {percentage}%
                      </span>
                    </div>
                    <progress
                      className="progress progress-primary w-full"
                      value={percentage}
                      max="100"
                    ></progress>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Revenue Distribution</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={coursePerformance}
                    dataKey="revenue"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="hsl(var(--p))"
                  >
                    {coursePerformance.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`hsl(${200 + index * 40}, 70%, 60%)`}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "create", label: "Create Course", icon: "➕" },
    { id: "analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-base-content">
          Instructor Dashboard
        </h1>
        <p className="text-base-content/70">
          Manage your courses, track performance, and engage with students
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
        {activeTab === "create" && <CreateCourseTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
}
