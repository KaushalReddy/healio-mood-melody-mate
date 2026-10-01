import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="py-20 text-center text-muted-foreground">Loading…</div>;
  if (!user) return <Navigate to={`/auth?next=${encodeURIComponent(location.pathname)}`} replace />;
  return <>{children}</>;
};

export default RequireAuth;
