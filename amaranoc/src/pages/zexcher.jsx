import React from "react";
import Zexch from "../components/zexch/zexch";
import { Header } from "../components/header/header";
import FooterForm from "../components/footer/footer";
import NverCard from "../components/zexch/nverCard";
import PriceZone from "../components/zexch/priceZone";
import Home from "../components/zexch/home";

export default function Zexcher() {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <Zexch />
      <NverCard />
      <PriceZone />
      <div className="w-2/3">
        <Home />
      </div>
    </div>
  );
}
