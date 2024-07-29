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
import {DeliveryRoutes} from "@/pages/deliveryRoutes/deliveryRoutes";
import {DeliveryRoute} from "@/pages/deliveryRoutes/deliveryRoute/deliveryRoute";
import {TableInvoiceDR} from "@/pages/invoices/tableInvoiceDR";
import {Receipt} from "@/pages/receipt/receipt";
import { PurchasesSortWithDelivery } from "./pages/purchases/purchasesSortWithDelivery/PurchasesSortWithDelivery";


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
    element: <PurchasesSortWithDelivery />,
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
    path: "/invoices/receipt/:briefcase/:order"
  },
  {
    element: <DeliveryRoute />,
    path: "/deliveryRoutes/:id",
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
  return (<>
    {JSON.stringify(data)}
  </>);
  // if (data?.message === "Пользователь не авторизован") {
  //   return <Login />;
  // }
  // return <Outlet />;
}

export const Router = () => {
  return <RouterProvider router={router} />;
};
