"use client";
import { Header } from "@/components/Header";
import Head from "next/head";
import Image from "next/image";
import items from "@/constant/products.json";
import { useState, useEffect } from "react"; 
import { Items } from "@/components/items";

export default function Home() {
  const [loading, setLoading] = useState(true); // Add a loading state

  // useEffect to simulate rendering completion
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after the component has mounted
    }, 1000); // Simulate a delay (e.g., 1 second)

    return () => clearTimeout(timeout); // Cleanup timeout if the component unmounts
  }, []);

  // A simple loading spinner or placeholder
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
        {/* Alternatively, you can replace this with a custom loading spinner */}
        <style jsx>{`
          .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Main content after loading
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-5">
        {items.map((item: any) => (
          <Items key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}