import { Outlet } from "react-router-dom";

import { Footer } from "@/components/ui/footer/footer";
import { Header } from "@/components/ui/header";
import { Navigate } from "@/components/ui/navigate/navigate";
import { Preloader } from "@/components/ui/preloader";
import { useAuthenticationCheck } from "@/router";
import { useCheckAuthQuery } from "@/services/auth/auth.services";

import s from "./layout.module.scss";
export const Layout = () => {
  // if(isLoading) return <Preloader/>
  return (
    <div className={s.container}>
      <div className={s.app}>
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
};
const Main = () => {
  return (
    <main className={s.main}>
      <Navigate />
      <div className={s.content}>
        <Outlet />
      </div>
    </main>
  );
};
