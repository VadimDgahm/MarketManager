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
import { Purchases } from "@/pages/purchases/purchases";

import { Login } from "@/pages/login/login";
import { useCheckAuthQuery } from "@/services/auth/auth.services";
import { DeliveryRoutes } from "@/pages/deliveryRoutes/deliveryRoutes";
import { DeliveryRoute } from "@/pages/deliveryRoutes/deliveryRoute/deliveryRoute";
import { TableInvoiceDR } from "@/pages/invoices/tableInvoiceDR";
import { Receipt } from "@/pages/receipt/receipt";
import { Purchases2 } from "./pages/purchases/purchase2/purchase2";
import {PrivateReport} from "@/pages/privateReport/PrivateReport";

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
    element: <Clients />,
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
    element: <Purchases2 />,
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
    element: <DeliveryRoutes />,
    path: "/deliveryRoutes",
  },
  {
    element: <TableInvoiceDR />,
    path: "/invoices/:id",
  },
  {
    element: <Receipt />,
    path: "/invoices/receipt/:briefcase/:order",
  },
  {
    element: <DeliveryRoute />,
    path: "/deliveryRoutes/:id",
  },
  {
    element: <Catalog />,
    path: "/catalog",
  },
  {
    element: <PrivateReport />,
    path: "/private-report"
  }
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
  },
]);

function PrivateRoutes() {
  const { data, isLoading } = useCheckAuthQuery();
  if (isLoading) {
    return (
      <>
        ...........................................ИДЕТ АВТОРИЗАЦИЯ
        ПОДОЖДИТЕ............................
      </>
    );
  }

  if (data?.message === "Пользователь не авторизован") {
    return <Login />;
  }
  return <Outlet />;
}

export const Router = () => {
  return <RouterProvider router={router} />;
};
