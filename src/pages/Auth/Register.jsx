import React, { useState, useEffect } from "react";
import { GoogleButton, GitHubButton, Button } from "../../components/ui";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    photo: "",
  });
  const [errors, setErrors] = useState({});

  const {
    user,
    createUser,
    signInWithGoogle,
    signInWithGithub,
    setUserProfile,
  } = useAuth();
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

  // Image upload to server (which then uploads to ImgBB)
  const uploadImageToServer = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setImageUploading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload/imgbb`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        return data.url;
      } else {
        throw new Error(data.message || "Image upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image. Please try again.");
      return null;
    } finally {
      setImageUploading(false);
    }
  };

  // Handle image selection
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload to server (which uploads to ImgBB)
    const imageUrl = await uploadImageToServer(file);
    if (imageUrl) {
      setFormData((prev) => ({
        ...prev,
        photo: imageUrl,
      }));
      toast.success("Image uploaded successfully!");
    }
  };

  // Password validation function
  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUppercase,
      hasSpecialChar,
      isValid: minLength && hasUppercase && hasSpecialChar,
    };
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordValidation.isValid) {
      newErrors.password =
        "Password must be at least 6 characters with uppercase letter and special character";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
            name: userData.displayName || formData.name,
            email: userData.email,
            role: formData.role,
            photo: userData.photoURL || formData.photo || null,
            status: "active",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save user data");
      }

      const result = await response.json();
      console.log("User saved to database:", result);
    } catch (error) {
      console.error("Error saving user to database:", error);
      // Don't throw error here as user creation was successful
      toast.error(
        "Account created but there was an issue saving additional data"
      );
    }
  };

  // Handle email registration
  const handleEmailRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create user with Firebase
      const result = await createUser(formData.email, formData.password);

      // Update user profile with name and photo
      await setUserProfile({
        displayName: formData.name,
        photoURL: formData.photo || null,
      });

      // Save user to database
      await saveUserToDatabase(result.user);

      toast.success("Account created successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific Firebase errors
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "This email is already registered" });
      } else if (error.code === "auth/weak-password") {
        setErrors({ password: "Password is too weak" });
      } else {
        toast.error(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google registration
  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();

      // Save user to database with default student role
      const userData = {
        ...result.user,
        getIdToken: () => result.user.getIdToken(),
      };

      // Override role to student for social login
      const originalRole = formData.role;
      setFormData((prev) => ({ ...prev, role: "student" }));

      await saveUserToDatabase(userData);

      toast.success("Account created with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google registration error:", error);
      toast.error("Google registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle GitHub registration
  const handleGithubRegister = async () => {
    setLoading(true);
    try {
      const result = await signInWithGithub();

      // Save user to database with default student role
      const userData = {
        ...result.user,
        getIdToken: () => result.user.getIdToken(),
      };

      // Override role to student for social login
      const originalRole = formData.role;
      setFormData((prev) => ({ ...prev, role: "student" }));

      await saveUserToDatabase(userData);

      toast.success("Account created with GitHub!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("GitHub registration error:", error);
      toast.error("GitHub registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData.password);

  return (
    <div className="bg-base-200 py-6 min-h-screen">
      <div className="w-full max-w-2xl mx-auto card bg-base-100 shadow border border-base-300">
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
          <h1 className="mb-6 text-center text-2xl font-semibold text-base-content">
            Create your account
          </h1>

          <form onSubmit={handleEmailRegister}>
            {/* Profile Photo Upload */}
            <div className="form-control mb-6 text-base-content">
              <label className="label">
                <span className="label-text font-medium">Profile Photo</span>
              </label>
              <div className="flex flex-col items-center space-y-4">
                <div className="avatar">
                  <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {imagePreview || formData.photo ? (
                      <img
                        src={imagePreview || formData.photo}
                        alt="Profile preview"
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-base-300 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-base-content/40"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs"
                    disabled={imageUploading}
                  />
                  {imageUploading && (
                    <span className="loading loading-spinner loading-sm text-primary"></span>
                  )}
                </div>
                <p className="text-xs text-base-content/60 text-center">
                  Upload a profile photo (optional). Max size: 5MB
                </p>
              </div>
            </div>

            {/* Two Column Layout for Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Name Field */}
              <div className="form-control text-base-content">
                <label className="label" htmlFor="name">
                  <span className="label-text font-medium">Full Name *</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`input input-bordered w-full bg-base-200 focus:input-primary ${
                    errors.name ? "input-error" : ""
                  }`}
                  required
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.name}
                    </span>
                  </label>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control text-base-content">
                <label className="label" htmlFor="email">
                  <span className="label-text font-medium">Email *</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  autoComplete="email"
                  className={`input input-bordered w-full bg-base-200 focus:input-primary ${
                    errors.email ? "input-error" : ""
                  }`}
                  required
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.email}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Role Selection - Full Width */}
            <div className="form-control mb-4 text-base-content">
              <label className="label" htmlFor="role">
                <span className="label-text font-medium">
                  I want to join as *
                </span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="select select-bordered w-full bg-base-200 focus:select-primary"
                required
              >
                <option value="student">
                  Student - Access courses and content
                </option>
                <option value="instructor">
                  Instructor - Create and manage courses
                </option>
              </select>
            </div>

            {/* Two Column Layout for Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Password Field */}
              <div className="form-control text-base-content">
                <label className="label" htmlFor="password">
                  <span className="label-text font-medium">Password *</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  autoComplete="new-password"
                  className={`input input-bordered w-full bg-base-200 focus:input-primary ${
                    errors.password ? "input-error" : ""
                  }`}
                  required
                />
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.password}
                    </span>
                  </label>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="form-control text-base-content">
                <label className="label" htmlFor="confirmPassword">
                  <span className="label-text font-medium">
                    Confirm Password *
                  </span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  className={`input input-bordered w-full bg-base-200 focus:input-primary ${
                    errors.confirmPassword ? "input-error" : ""
                  }`}
                  required
                />
                {errors.confirmPassword && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.confirmPassword}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Password Requirements */}
            {formData.password && (
              <div className="mb-6 p-4 bg-base-200 rounded-lg">
                <p className="text-sm font-medium text-base-content mb-2">
                  Password Requirements:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div
                    className={`text-xs flex items-center ${
                      passwordValidation.minLength
                        ? "text-success"
                        : "text-base-content/60"
                    }`}
                  >
                    <span className="mr-1">
                      {passwordValidation.minLength ? "✓" : "•"}
                    </span>
                    At least 6 characters
                  </div>
                  <div
                    className={`text-xs flex items-center ${
                      passwordValidation.hasUppercase
                        ? "text-success"
                        : "text-base-content/60"
                    }`}
                  >
                    <span className="mr-1">
                      {passwordValidation.hasUppercase ? "✓" : "•"}
                    </span>
                    One uppercase letter
                  </div>
                  <div
                    className={`text-xs flex items-center ${
                      passwordValidation.hasSpecialChar
                        ? "text-success"
                        : "text-base-content/60"
                    }`}
                  >
                    <span className="mr-1">
                      {passwordValidation.hasSpecialChar ? "✓" : "•"}
                    </span>
                    One special character
                  </div>
                </div>
              </div>
            )}

            <Button
              fullWidth
              type="submit"
              className="py-3 font-medium text-base"
              disabled={loading || imageUploading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="divider text-sm text-base-content/70 my-6">
            Or continue with
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <GoogleButton
              className="w-full font-medium"
              onClick={handleGoogleRegister}
              disabled={loading || imageUploading}
            >
              Sign up with Google
            </GoogleButton>
            <GitHubButton
              className="w-full font-medium"
              onClick={handleGithubRegister}
              disabled={loading || imageUploading}
            >
              Sign up with GitHub
            </GitHubButton>
          </div>

          <p className="mt-6 text-center text-sm text-base-content/70">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
