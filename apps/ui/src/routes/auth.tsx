import { useEffect } from "react";
import {
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/auth") {
      navigate({
        to: "login",
      });
    }
  });

  return (
    <div>
      <Outlet />
    </div>
  );
}
