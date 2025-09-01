import React, { useState } from "react";
import {
  MdMoreVert,
  MdKeyboardArrowDown,
  MdViewList,
  MdGridView,
} from "react-icons/md";
import { Button } from "../../../components/ui/Button";

export default function Payments() {
  const [viewMode, setViewMode] = useState("table");

  // Mock payment data
  const payments = [
    {
      id: "TXN001",
      date: "2024-03-15",
      courseName: "React Fundamentals",
      instructor: "John Smith",
      amount: 89.99,
      status: "Completed",
      paymentMethod: "Credit Card",
      transactionId: "stripe_1234567890",
    },
    {
      id: "TXN002",
      date: "2024-02-28",
      courseName: "Advanced CSS Grid",
      instructor: "Sarah Johnson",
      amount: 69.99,
      status: "Completed",
      paymentMethod: "PayPal",
      transactionId: "paypal_abcd123456",
    },
    {
      id: "TXN003",
      date: "2024-02-10",
      courseName: "JavaScript ES6+",
      instructor: "Mike Chen",
      amount: 99.99,
      status: "Completed",
      paymentMethod: "Credit Card",
      transactionId: "stripe_9876543210",
    },
    {
      id: "TXN004",
      date: "2024-01-22",
      courseName: "Node.js Backend Development",
      instructor: "Alex Rivera",
      amount: 129.99,
      status: "Completed",
      paymentMethod: "Debit Card",
      transactionId: "stripe_1122334455",
    },
    {
      id: "TXN005",
      date: "2024-01-15",
      courseName: "UI/UX Design Principles",
      instructor: "Emma Davis",
      amount: 79.99,
      status: "Completed",
      paymentMethod: "Credit Card",
      transactionId: "stripe_5566778899",
    },
  ];

  const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const averagePayment = totalSpent / payments.length;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <div className="badge badge-success">Completed</div>;
      case "Pending":
        return <div className="badge badge-warning">Pending</div>;
      case "Failed":
        return <div className="badge badge-error">Failed</div>;
      default:
        return <div className="badge badge-info">{status}</div>;
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "Credit Card":
        return "💳";
      case "Debit Card":
        return "💳";
      case "PayPal":
        return "🏛️";
      default:
        return "💰";
    }
  };

  const TableView = () => (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Course</th>
            <th>Instructor</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Transaction ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="hover">
              <td className="font-mono text-sm">
                {new Date(payment.date).toLocaleDateString()}
              </td>
              <td>
                <div className="font-medium">{payment.courseName}</div>
              </td>
              <td className="text-sm text-base-content/70">
                {payment.instructor}
              </td>
              <td className="font-bold text-lg">
                ${payment.amount.toFixed(2)}
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {getPaymentMethodIcon(payment.paymentMethod)}
                  </span>
                  <span className="text-sm">{payment.paymentMethod}</span>
                </div>
              </td>
              <td>{getStatusBadge(payment.status)}</td>
              <td className="font-mono text-xs text-base-content/60">
                {payment.transactionId}
              </td>
              <td>
                <div className="dropdown dropdown-end">
                  <Button tabIndex={0} role="button" variant="ghost" size="xs">
                    <MdMoreVert className="w-4 h-4" />
                  </Button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a href="#" className="text-sm">
                        Download Receipt
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm">
                        View Course
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm">
                        Request Refund
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="card bg-base-100 border border-base-300 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="card-body">
            <div className="flex justify-between items-start mb-4">
              <div className="text-xs text-base-content/60 font-mono">
                {new Date(payment.date).toLocaleDateString()}
              </div>
              {getStatusBadge(payment.status)}
            </div>

            <h3 className="card-title text-lg mb-2">{payment.courseName}</h3>
            <p className="text-base-content/70 text-sm mb-4">
              by {payment.instructor}
            </p>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-base-content/70">Amount:</span>
                <span className="font-bold text-xl text-primary">
                  ${payment.amount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-base-content/70">Payment:</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {getPaymentMethodIcon(payment.paymentMethod)}
                  </span>
                  <span className="text-sm">{payment.paymentMethod}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-base-content/70">Transaction:</span>
                <span className="font-mono text-xs text-base-content/60">
                  {payment.transactionId}
                </span>
              </div>
            </div>

            <div className="card-actions justify-end mt-4">
              <div className="dropdown dropdown-end">
                <Button tabIndex={0} role="button" variant="outline" size="sm">
                  Actions
                  <MdKeyboardArrowDown className="w-4 h-4 ml-1" />
                </Button>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a href="#" className="text-sm">
                      Download Receipt
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm">
                      View Course
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm">
                      Request Refund
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">
            Payment History
          </h1>
          <p className="text-base-content/70">
            View your course purchases and transaction details
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/70">View:</span>
          <div className="join">
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
            <Button
              className={`join-item ${viewMode === "card" ? "btn-active" : ""}`}
              variant={viewMode === "card" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("card")}
            >
              <MdGridView className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-primary/10 border border-primary/20 rounded-lg">
          <div className="stat-title">Total Spent</div>
          <div className="stat-value text-primary">
            ${totalSpent.toFixed(2)}
          </div>
          <div className="stat-desc">Across {payments.length} courses</div>
        </div>
        <div className="stat bg-success/10 border border-success/20 rounded-lg">
          <div className="stat-title">Total Courses</div>
          <div className="stat-value text-success">{payments.length}</div>
          <div className="stat-desc">Successfully purchased</div>
        </div>
        <div className="stat bg-warning/10 border border-warning/20 rounded-lg">
          <div className="stat-title">Average Payment</div>
          <div className="stat-value text-warning">
            ${averagePayment.toFixed(2)}
          </div>
          <div className="stat-desc">Per course</div>
        </div>
        <div className="stat bg-info/10 border border-info/20 rounded-lg">
          <div className="stat-title">This Month</div>
          <div className="stat-value text-info">2</div>
          <div className="stat-desc">New purchases</div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card bg-base-100 border border-base-300 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4">Transaction History</h2>
              {viewMode === "table" ? <TableView /> : <CardView />}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Payment Methods */}
          <div className="card bg-base-100 border border-base-300 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4">Payment Methods</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💳</span>
                    <div>
                      <div className="font-medium">Credit Card</div>
                      <div className="text-sm text-base-content/70">
                        **** 1234
                      </div>
                    </div>
                  </div>
                  <div className="badge badge-primary">Primary</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏛️</span>
                    <div>
                      <div className="font-medium">PayPal</div>
                      <div className="text-sm text-base-content/70">
                        user@email.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Add Payment Method
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card bg-base-100 border border-base-300 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button variant="outline" fullWidth className="justify-start">
                  <span className="text-lg mr-2">📄</span>
                  Download All Receipts
                </Button>
                <Button variant="outline" fullWidth className="justify-start">
                  <span className="text-lg mr-2">📊</span>
                  Spending Report
                </Button>
                <Button variant="outline" fullWidth className="justify-start">
                  <span className="text-lg mr-2">🔄</span>
                  Request Refund
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
