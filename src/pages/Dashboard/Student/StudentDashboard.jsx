import React from "react";
import { Link } from "react-router";
import { Button } from "../../../components/ui";

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-base-content">Student Hub</h1>
        <p className="text-base-content/70">
          Quick access to your learning journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/dashboard/my-courses"
          className="card bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="text-5xl">📚</div>
              <div>
                <h2 className="card-title text-2xl">My Courses</h2>
                <p className="text-base-content/70">
                  View and manage your enrolled courses, track progress, and
                  continue learning.
                </p>
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <Button variant="primary">View Courses</Button>
            </div>
          </div>
        </Link>

        <Link
          to="/dashboard/payments"
          className="card bg-gradient-to-br from-success/10 to-success/5 border border-success/20 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="text-5xl">💳</div>
              <div>
                <h2 className="card-title text-2xl">Payment History</h2>
                <p className="text-base-content/70">
                  View your purchase history, download receipts, and manage
                  payment methods.
                </p>
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <Button variant="secondary">View Payments</Button>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-primary">
            <span className="text-3xl">📖</span>
          </div>
          <div className="stat-title">Enrolled Courses</div>
          <div className="stat-value text-primary">5</div>
          <div className="stat-desc">2 in progress</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-success">
            <span className="text-3xl">✅</span>
          </div>
          <div className="stat-title">Completed</div>
          <div className="stat-value text-success">2</div>
          <div className="stat-desc">40% completion rate</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-warning">
            <span className="text-3xl">🏆</span>
          </div>
          <div className="stat-title">Certificates</div>
          <div className="stat-value text-warning">2</div>
          <div className="stat-desc">Earned this month</div>
        </div>
      </div>
    </div>
  );
}
