import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { Activation } from "@/pages/activation/activation";
import { Briefcase } from "@/pages/briefcase/briefcase/briefcase";
import { Briefcases } from "@/pages/briefcase/briefcases";
import { Catalog } from "@/pages/catalog/catalog";
import { Client } from "@/pages/clients/client/client";
import { Clients } from "@/pages/clients/clients";
import { Layout } from "@/pages/layout/layout";
import { Purchase } from "@/pages/purchases/purchase/purchase";
import { Purchases } from "@/pages/purchases/purchases";

import { Login } from "@/pages/login/login";
import { useCheckAuthQuery } from "@/services/auth/auth.services";

const publicRoutes: RouteObject[] = [
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Activation />,
    path: "/activation",
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
    element: <Purchases />,
    path: "/purchases",
  },
  {
    element: <Purchase />,
    path: "/purchases/:id",
  },
  {
    element: <Client />,
    path: "/clients/:id",
  },
  {
    element: <Briefcases />,
    path: "/briefcases",
  },
  {
    element: <Briefcase />,
    path: "/briefcases/:id",
  },
  {
    element: <Catalog />,
    path: "/catalog",
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

function PrivateRoutes() {
  const { isLoading, data } = useCheckAuthQuery();
  if (isLoading) return <div>Loading</div>;
  return data.message === "Пользователь не авторизован" ? (
    <Navigate to={"/login"} />
  ) : (
    <Outlet />
  );
}

export const Router = () => {
  return <RouterProvider router={router} />;
};
