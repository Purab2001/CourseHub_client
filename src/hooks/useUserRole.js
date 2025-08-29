import { useState, useEffect } from "react";

export default function useUserRole(user) {
  const [role, setRole] = useState("guest");
  useEffect(() => {
    if (!user) {
      setRole("guest");
      return;
    }
    // placeholder: determine role from user
    setRole(user?.role || "student");
  }, [user]);
  return role;
}
