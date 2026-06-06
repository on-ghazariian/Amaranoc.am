import React from "react";
import { Header } from "../components/header/header";
import { Main } from "../components/main/main";
import FooterForm from "../components/footer/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Main />
      <FooterForm />
    </div>
  );
}
