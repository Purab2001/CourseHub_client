import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function useAuthHook() {
  const { user } = useAuth();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return { user, ready };
}
