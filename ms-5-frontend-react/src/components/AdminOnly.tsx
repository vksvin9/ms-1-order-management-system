import type { ReactNode } from "react";
import authService from "../services/authService";

interface AdminOnlyProps {
  children: ReactNode;
}

function AdminOnly({ children }: AdminOnlyProps) {
  if (!authService.isAdmin()) {
    return null;
  }

  return <>{children}</>;
}

export default AdminOnly;