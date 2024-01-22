import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { Client } from "@/pages/clients/client/client";
import { Clients } from "@/pages/clients/clients";
import { Layout } from "@/pages/layout/layout";

const publicRoutes: RouteObject[] = [
  {
    element: <div>Login</div>,
    path: "/login",
  },
];

const privateRoutes: RouteObject[] = [
  {
    element: <div>private</div>,
    path: "/",
  },
  {
    element: <Clients />,
    path: "/clients",
  },
  {
    element: <Client />,
    path: "/clients/:id",
  },
];

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
    ],
    element: <Layout />,
  },
  ...publicRoutes,
]);

function useAuthenticationCheck() {
  return false;
}
function PrivateRoutes() {
  const isAuthenticated = useAuthenticationCheck();

  return !isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
}

export const Router = () => {
  return <RouterProvider router={router} />;
};
