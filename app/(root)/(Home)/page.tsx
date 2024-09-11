import { Header } from "@/components/Header";
import Head from "next/head";
import Image from "next/image";
import items from "@/constant/products.json";
import { Items } from "@/components/items";

export default function Home() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-5    ">
        {items.map((item:any) => (
          <Items key={item.id} item={item} />
        ))}
      </div>
{/* </main> */}
    </>
  );
}
