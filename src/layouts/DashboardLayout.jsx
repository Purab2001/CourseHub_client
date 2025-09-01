import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  MdDashboard,
  MdMenuBook,
  MdPayment,
  MdAdd,
  MdPeople,
  MdPerson,
  MdSchool,
  MdAccountBalance,
  MdClose,
  MdMenu,
  MdLogout,
} from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { Button } from "../components/ui";
import ThemeSwitch from "../shared/ThemeSwitch";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState("student"); // Default to student
  const [isLoadingRole, setIsLoadingRole] = useState(true);
  const { user, userLogOut } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch user role from database
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          setIsLoadingRole(true);
          const response = await axiosSecure.get("/api/auth/profile");
          if (response.data?.user?.role) {
            setUserRole(response.data.user.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          // Keep default role if fetch fails
        } finally {
          setIsLoadingRole(false);
        }
      }
    };

    fetchUserRole();
  }, [user?.email, axiosSecure]);

  const handleLogout = async () => {
    try {
      await userLogOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getMenuItems = () => {
    const baseItems = [
      {
        path: "/dashboard",
        label: "Overview",
        icon: <MdDashboard className="w-5 h-5" />,
      },
    ];

    switch (userRole) {
      case "student":
        return [
          ...baseItems,
          {
            path: "/dashboard/my-courses",
            label: "My Courses",
            icon: <MdMenuBook className="w-5 h-5" />,
          },
          {
            path: "/dashboard/payments",
            label: "Payments",
            icon: <MdPayment className="w-5 h-5" />,
          },
        ];
      case "instructor":
        return [
          ...baseItems,
          {
            path: "/dashboard/add-course",
            label: "Add Course",
            icon: <MdAdd className="w-5 h-5" />,
          },
          {
            path: "/dashboard/my-courses",
            label: "My Courses",
            icon: <MdMenuBook className="w-5 h-5" />,
          },
          {
            path: "/dashboard/students",
            label: "Students",
            icon: <MdPeople className="w-5 h-5" />,
          },
        ];
      case "admin":
        return [
          ...baseItems,
          {
            path: "/dashboard/all-users",
            label: "All Users",
            icon: <MdPerson className="w-5 h-5" />,
          },
          {
            path: "/dashboard/all-courses",
            label: "All Courses",
            icon: <MdSchool className="w-5 h-5" />,
          },
          {
            path: "/dashboard/transactions",
            label: "Transactions",
            icon: <MdAccountBalance className="w-5 h-5" />,
          },
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  // Show loading spinner while fetching user role
  if (isLoadingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Mobile menu overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 h-screen bg-base-200 border-r border-base-300 transform transition-transform duration-200 ease-in-out lg:translate-x-0 flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo/Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-200 flex-shrink-0">
          <NavLink to="/" className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="ml-2 text-lg font-bold">
              <span className="text-primary">C</span>OURSE
              <span className="text-primary">H</span>UB
            </span>
          </NavLink>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden btn btn-ghost btn-sm"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors font-medium ${
                      isActive
                        ? "bg-primary text-primary-content shadow-md"
                        : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="ml-3 truncate">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User info and logout */}
        <div className="p-4 border-t border-base-300 bg-base-200 flex-shrink-0">
          <div className="flex items-center mb-3 space-x-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/20 text-primary rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold">
                      {user?.displayName?.charAt(0)?.toUpperCase() ||
                        user?.email?.charAt(0)?.toUpperCase() ||
                        "U"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-base-content truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-base-content/60 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="md"
            fullWidth
            className="flex items-center"
          >
            <MdLogout className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Top bar */}
        <header className="bg-base-100 border-b border-base-300 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden btn btn-ghost btn-sm"
            >
              <MdMenu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-base-content lg:ml-0 ml-2">
              Dashboard
            </h1>
            <div className="flex items-center space-x-2">
              <ThemeSwitch />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
