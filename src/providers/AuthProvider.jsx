import React from "react";
import { AuthProvider as Inner } from "../context/AuthContext";

export default function AuthProvider({ children }) {
  return <Inner>{children}</Inner>;
}
