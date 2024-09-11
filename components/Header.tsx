"use client";
import { useCart } from "@/context/CartContext"; // Import the context
import Link from "next/link";

export const Header = () => {
  const { cart } = useCart(); // Destructure the cart from context

  // Calculate the total quantity of products in the cart
  const totalItems = Object.values(cart).reduce((acc, quantity) => acc + quantity, 0);

  return (
    <div className="flex flex-row justify-around gap-4 text-xl my-5 ">
      <div>
        <Link href="/" className="flex flex-row items-center no-underline">
          <button className="font-semibold p-1 hover:underline">Home</button>
        </Link>
      </div>
      <div className="relative ">
        <Link href="/checkout"  className="flex no-underline flex-row items-center">
          <button className="font-semibold p-1 hover:underline">Cart</button>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 text-sm text-white w-6 h-6 flex items-center justify-center bg-red-600 rounded-full p-1">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};
