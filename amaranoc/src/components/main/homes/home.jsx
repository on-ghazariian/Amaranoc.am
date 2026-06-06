import React from "react";
import CategorySlider from "./category";
import HomeCard from "./homeCard";

export default function Home() {
const db = [
  {
    id: 1,
    imgs: [
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1778157519385--0.07811423398741568image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1778157519405--0.05026637809007939image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1778157519463--0.8981119370067523image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1778157519463--0.8981119370067523image.webp&w=1920&q=75",
    ],
    loc: "Ծաղկաձոր",
    person: "3",
    price: "20,000",
  },
  {
    id: 2,
    imgs: [
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1777545735754--0.8638961725747214image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1777545735760--0.3677612492598319image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1777545735760--0.3677612492598319image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1777545735767--0.39304538841586156image.webp&w=1920&q=75"
    ],
    loc: "Ծաղկաձոր",
    person: "3",
    price: "20,000",
  },
  {
    id: 3,
    imgs: [
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1777470740203--0.9350354414738311image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1777470740256--0.0050842304836835606image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1777470740256--0.0050842304836835606image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1777470740256--0.0050842304836835606image.webp&w=1920&q=75"
    ],
    loc: "Ծաղկաձոր",
    person: "4",
    price: "15,000",
  },
  {
    id: 4,
    imgs: [
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1773222659964--0.06619236235759018image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1773222659966--0.7920217687732434image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1773222659969--0.5433884044976358image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1773222659972--0.792842691382114image.webp&w=1920&q=75"
    ],
    loc: "Ծաղկաձոր",
    person: "4",
    price: "15,000"
  },
  {
    id: 5,
    imgs: [
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1773221839519--0.7725620766183727image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1773221839521--0.10591152082937372image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1773221839526--0.82131410231966image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1773221839526--0.17730771201750328image.webp&w=1920&q=75"
    ],
    loc: "Ծաղկաձոր",
    person: "4",
    price: "17,000"
  },
  {
    id: 6,
    imgs: [
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1775816025451--0.5957494182792855image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1775816025464--0.8009034889657989image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1775816025488--0.019833363870789045image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1775816025488--0.019833363870789045image.webp&w=1920&q=75"
    ],
    loc: "Ծաղկաձոր",
    person: "2",
    price: "15,000"
  },
  {
    id: 7,
    imgs: [
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1771249274221--0.7634429117834363image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1771249274236--0.9254726048226354image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1771249274242--0.064054757354433image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1771249274244--0.5837253825181472image.webp&w=1920&q=75"
    ],
    loc: "Ծաղկաձոր",
    person: "4",
    price: "18,000"
  },
  {
    id: 8,
    imgs: [
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1768641139547--0.6791892095494163image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1768641139615--0.9034225357685606image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1768641139554--0.17709916825899352image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1768641139562--0.8925886620017309image.webp&w=1920&q=75"
    ],
    loc: "Ծաղկաձոր",
    person: "3",
    price: "17,000"
  },
  {
    id: 9,
    imgs: [
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1768640963174--0.15506439557103646image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1768640963197--0.32909267110135976image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1768640963197--0.32909267110135976image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1768640963241--0.050742387563268654image.webp&w=1920&q=75"
    ],
    loc: "Ծաղկաձոր",
    person: "2",
    price: "13,000"
  },
  {
    id: 10,
    imgs: [
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1766486517306--0.7526922729339423image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1766486517308--0.8066294284052291image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1766486517312--0.13162031001216645image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1766486517315--0.20132373100044387image.webp&w=1920&q=75"
    ],
    loc: "Դիլիջան",
    person: "5",
    price: "25,000"
  },
  {
    id: 11,
    imgs: [
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1766486517315--0.20132373100044387image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1766486517315--0.20132373100044387image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1766486517315--0.20132373100044387image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1766486517315--0.20132373100044387image.webp&w=1920&q=75"
    ],
    loc: "Ծաղկաձոր",
    person: "3",
    price: "35,000"
  },
  {
    id: 12,
    imgs: [
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1714474323654--0.8136682832781283image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1714474323659--0.6137468511885995image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1714474323659--0.6137468511885995image.webp&w=1920&q=75",
      "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1714474323659--0.6137468511885995image.webp&w=1920&q=75"
    ],
    loc: "Ծաղկաձոր",
    person: "6",
    price: "35,000"
  }
];

  return (
    <div className="w-full">
      <CategorySlider />

      {/* Վերնագրի և Թոգլերի հատվածը */}
      <div className="my-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#0f172a]">Սովորական առաջարկներ</h2>
        <div className="flex gap-1.5">
          <div className="flex cursor-pointer items-center gap-[3px] rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1.5">
            <span className="h-1.5 w-2.5 rounded-[1px] border-2 border-[#94a3b8]"></span>
            <span className="h-1.5 w-2.5 rounded-[1px] border-2 border-[#94a3b8]"></span>
          </div>
          <div className="flex cursor-pointer items-center gap-[3px] rounded-lg border border-[#0f172a] bg-[#0f172a] px-2.5 py-1.5">
            <span className="h-2.5 w-[3px] bg-white"></span>
            <span className="h-2.5 w-[3px] bg-white"></span>
            <span className="h-2.5 w-[3px] bg-white"></span>
          </div>
        </div>
      </div>

      {/* Տների Գրիդը (Ադապտիվ սյունակներով) */}
      <div className="grid grid-columns-1 gap-5 sm:grid-columns-2 lg:grid-columns-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {db.map((home, index) => (
           <HomeCard key={index} home={home} index={index}/>
        ))}
      </div>
    </div>
  );
}