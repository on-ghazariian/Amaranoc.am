import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../header/header";
import FooterForm from "../../footer/footer";

export default function HomePage() {
  const { id } = useParams();

  return (
    <>
      <Header />

      <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold text-[#0f172a] mb-4">
            Տան Մանրամասն Էջ
          </h1>
          <p className="text-sm text-gray-500">
            Տան ID-ն բազայում՝{" "}
            <span className="font-mono text-orange-600 font-bold">{id}</span>
          </p>
        </div>
      </div>
      <FooterForm/>
    </>
  );
}
