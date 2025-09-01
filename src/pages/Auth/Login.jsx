import React, { useState, useEffect } from "react";
import { GoogleButton, GitHubButton, Button } from "../../components/ui";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { user, loginUser, signInWithGoogle, signInWithGithub } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from location state, default to dashboard
  const from = location.state?.from || "/dashboard";

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // Save user to database
  const saveUserToDatabase = async (userData) => {
    try {
      const token = await userData.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: userData.displayName,
            email: userData.email,
            role: "student", // Default role for social login
            photo: userData.photoURL,
            status: "active",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save user data");
      }

      const result = await response.json();
      console.log("User data synced with database:", result);
    } catch (error) {
      console.error("Error saving user to database:", error);
      // Don't throw error here as login was successful
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await loginUser(email, password);

      // Sync user data with database
      await saveUserToDatabase(result.user);

      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      // Handle specific Firebase errors with user-friendly messages
      let errorMessage = "Login failed. Please try again.";

      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email address.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();

      // Save user to database with default student role
      await saveUserToDatabase(result.user);

      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google login error:", error);

      let errorMessage = "Google login failed. Please try again.";
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Login cancelled.";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Popup blocked. Please allow popups for this site.";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithGithub();

      // Save user to database with default student role
      await saveUserToDatabase(result.user);

      toast.success("Logged in with GitHub!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("GitHub login error:", error);

      let errorMessage = "GitHub login failed. Please try again.";
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Login cancelled.";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Popup blocked. Please allow popups for this site.";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200 py-6">
      <div className="w-full max-w-sm mx-auto card bg-base-100 shadow border border-base-300">
        <div className="card-body">
          <div className="py-4 flex justify-center">
            <Link to="/">
              <img
                src="/logo.svg"
                alt="CourseHub Logo"
                width="45"
                height="45"
                loading="lazy"
              />
            </Link>
          </div>
          <h1 className="mb-4 text-center text-2xl font-semibold text-base-content">
            Welcome back
          </h1>

          <form onSubmit={handleEmailLogin}>
            <div className="form-control mb-4 text-base-content">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                autoComplete="email"
                className="input input-bordered w-full bg-base-200 focus:input-primary"
                required
              />
            </div>
            <div className="form-control mb-4 text-base-content">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                className="input input-bordered w-full bg-base-200 focus:input-primary"
                required
              />
            </div>
            <div className="mb-2 text-right">
              <Link
                to="/forgot-password"
                className="link link-accent text-sm text-base-content/70"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              fullWidth
              type="submit"
              className="py-2.5"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="divider text-sm text-base-content/70">
            Or continue with
          </div>

          <GoogleButton
            className="w-full mb-2 font-medium"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Login with Google
          </GoogleButton>
          <GitHubButton
            className="w-full font-medium"
            onClick={handleGithubLogin}
            disabled={loading}
          >
            Login with GitHub
          </GitHubButton>

          <p className="mt-4 text-center text-sm text-base-content/70">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
