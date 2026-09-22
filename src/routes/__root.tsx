import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const RootLayout = () => (
  <React.Suspense>
    <Outlet />
    <TanStackRouterDevtools position="bottom-left" />
    <ReactQueryDevtools buttonPosition="bottom-right" />
  </React.Suspense>
);

export const Route = createRootRoute({ component: RootLayout });
