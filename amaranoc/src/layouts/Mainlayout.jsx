import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import FooterForm from "../components/footer/footer";

export default function MainLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <FooterForm />
    </>
  );
}