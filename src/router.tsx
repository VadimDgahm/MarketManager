import {
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
    element: <Activation />,
    path: "/activation",
  },
  {
    element: <Login />,
    path: "/login",
  },
];

const privateRoutes: RouteObject[] = [
  {
    element: <div>ГЛАВНАЯ</div>,
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
  {
    children: [...publicRoutes],
    element: <Layout />,
  },
]);

function PrivateRoutes() {
  const { data } = useCheckAuthQuery();

  if (data?.message === "Пользователь не авторизован") {
    return <Login />;
  }
  return <Outlet />;
}

export const Router = () => {
  return <RouterProvider router={router} />;
};
