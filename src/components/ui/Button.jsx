import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) {
  const baseClasses =
    "active:scale-95 transition rounded font-medium cursor-pointer border-none";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-content hover:bg-secondary/90",
    accent: "bg-accent text-accent-content hover:bg-accent/90",
    outline:
      "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
    ghost: "bg-transparent text-primary hover:bg-primary/10",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
