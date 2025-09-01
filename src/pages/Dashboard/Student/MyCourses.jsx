import React, { useState } from "react";
import { MdGridView, MdViewList } from "react-icons/md";
import { Button } from "../../../components/ui";

export default function MyCourses() {
  const [viewMode, setViewMode] = useState("grid"); // grid or table

  // Mock data for enrolled courses
  const enrolledCourses = [
    {
      id: 1,
      title: "React Fundamentals",
      instructor: "John Smith",
      thumbnail: "https://via.placeholder.com/300x200?text=React+Course",
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      enrolledDate: "2024-01-15",
      category: "Programming",
      duration: "8 hours",
      status: "In Progress",
      lastAccessed: "2 days ago",
    },
    {
      id: 2,
      title: "Advanced CSS Grid",
      instructor: "Sarah Johnson",
      thumbnail: "https://via.placeholder.com/300x200?text=CSS+Course",
      progress: 100,
      totalLessons: 12,
      completedLessons: 12,
      enrolledDate: "2024-02-10",
      category: "Design",
      duration: "6 hours",
      status: "Completed",
      lastAccessed: "1 week ago",
    },
    {
      id: 3,
      title: "JavaScript ES6+",
      instructor: "Mike Chen",
      thumbnail: "https://via.placeholder.com/300x200?text=JavaScript+Course",
      progress: 45,
      totalLessons: 25,
      completedLessons: 11,
      enrolledDate: "2024-03-05",
      category: "Programming",
      duration: "10 hours",
      status: "In Progress",
      lastAccessed: "Yesterday",
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      instructor: "Alex Rivera",
      thumbnail: "https://via.placeholder.com/300x200?text=Node.js+Course",
      progress: 20,
      totalLessons: 30,
      completedLessons: 6,
      enrolledDate: "2024-03-20",
      category: "Programming",
      duration: "15 hours",
      status: "In Progress",
      lastAccessed: "3 days ago",
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      instructor: "Emma Davis",
      thumbnail: "https://via.placeholder.com/300x200?text=UI%2FUX+Course",
      progress: 60,
      totalLessons: 18,
      completedLessons: 11,
      enrolledDate: "2024-02-28",
      category: "Design",
      duration: "12 hours",
      status: "In Progress",
      lastAccessed: "Today",
    },
  ];

  const getStatusBadge = (status, progress) => {
    if (status === "Completed") {
      return <div className="badge badge-success">Completed</div>;
    } else if (progress > 50) {
      return <div className="badge badge-warning">In Progress</div>;
    } else {
      return <div className="badge badge-info">Just Started</div>;
    }
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {enrolledCourses.map((course) => (
        <div
          key={course.id}
          className="card bg-base-100 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <figure>
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
          </figure>
          <div className="card-body">
            <div className="flex justify-between items-start mb-2">
              <h3 className="card-title text-lg">{course.title}</h3>
              {getStatusBadge(course.status, course.progress)}
            </div>
            <p className="text-base-content/70 text-sm mb-3">
              by {course.instructor}
            </p>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <progress
                className="progress progress-primary w-full"
                value={course.progress}
                max="100"
              ></progress>
              <p className="text-xs text-base-content/60 mt-1">
                {course.completedLessons} of {course.totalLessons} lessons
                completed
              </p>
            </div>

            {/* Course Info */}
            <div className="flex justify-between items-center text-sm text-base-content/70 mb-4">
              <span>📚 {course.category}</span>
              <span>⏱️ {course.duration}</span>
            </div>

            {/* Last Accessed */}
            <p className="text-xs text-base-content/60 mb-4">
              Last accessed: {course.lastAccessed}
            </p>

            {/* Actions */}
            <div className="card-actions justify-end">
              {course.status === "Completed" ? (
                <Button variant="outline" size="sm">
                  View Certificate
                </Button>
              ) : (
                <Button variant="primary" size="sm">
                  Continue Learning
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const TableView = () => (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Course</th>
            <th>Instructor</th>
            <th>Progress</th>
            <th>Status</th>
            <th>Last Accessed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.map((course) => (
            <tr key={course.id} className="hover">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={course.thumbnail} alt={course.title} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{course.title}</div>
                    <div className="text-sm opacity-50">{course.category}</div>
                  </div>
                </div>
              </td>
              <td>{course.instructor}</td>
              <td>
                <div className="flex items-center gap-2">
                  <progress
                    className="progress progress-primary w-20"
                    value={course.progress}
                    max="100"
                  ></progress>
                  <span className="text-sm">{course.progress}%</span>
                </div>
              </td>
              <td>{getStatusBadge(course.status, course.progress)}</td>
              <td className="text-sm">{course.lastAccessed}</td>
              <td>
                {course.status === "Completed" ? (
                  <Button variant="outline" size="xs">
                    Certificate
                  </Button>
                ) : (
                  <Button variant="primary" size="xs">
                    Continue
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">My Courses</h1>
          <p className="text-base-content/70">
            Track your learning progress and continue your journey
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/70">View:</span>
          <div className="join">
            <Button
              className={`join-item ${viewMode === "grid" ? "btn-active" : ""}`}
              variant={viewMode === "grid" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <MdGridView className="w-4 h-4" />
            </Button>
            <Button
              className={`join-item ${
                viewMode === "table" ? "btn-active" : ""
              }`}
              variant={viewMode === "table" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              <MdViewList className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Total Courses</div>
          <div className="stat-value text-primary">
            {enrolledCourses.length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Completed</div>
          <div className="stat-value text-success">
            {enrolledCourses.filter((c) => c.status === "Completed").length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">In Progress</div>
          <div className="stat-value text-warning">
            {enrolledCourses.filter((c) => c.status === "In Progress").length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Avg. Progress</div>
          <div className="stat-value text-info">
            {Math.round(
              enrolledCourses.reduce(
                (acc, course) => acc + course.progress,
                0
              ) / enrolledCourses.length
            )}
            %
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <div className="card-body">
          {viewMode === "grid" ? <GridView /> : <TableView />}
        </div>
      </div>
    </div>
  );
}
