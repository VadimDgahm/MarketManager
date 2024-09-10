import { Outlet } from "react-router-dom";
import { Footer } from "@/components/ui/footer/footer";
import { Header } from "@/components/ui/header";
import s from "./layout.module.scss";
import {
  ForwardButton,
  GoBackButton,
} from "@/components/ui/goBackButton/goBackButton";

export const Layout = () => {
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
      <div className={s.content}>
        <div className={s.buttonNav}>
          <GoBackButton />
          ...
          <ForwardButton />
        </div>

        <Outlet />
      </div>
    </main>
  );
};
