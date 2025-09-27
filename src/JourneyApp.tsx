import { useEffect, useState } from "react";
import AdminApp from "./components/AdminApp";
import Journey from "./components/Journey";

export default function JourneyApp() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    const search = window.location.search;
    if (
      pathname.includes("/admin") ||
      pathname === "/admin" ||
      search.includes("admin=true")
    ) {
      setIsAdminMode(true);
    }
  }, []);

  if (isAdminMode) {
    return <AdminApp />;
  }

  return <Journey />;
}
