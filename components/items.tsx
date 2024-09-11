"use client";
import { ItemsProps } from "@/types/index";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react"; // Import useState for managing state
import img1 from "@/public/assets/img1.jpg";
import Modal from "@/components/Modal";

export const Items = ({ item }: ItemsProps) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const quantity = cart[item.id] || 0;
  const router = useRouter();

  // State to manage the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart(item.id);
  };

  const handleIncreaseQuantity = () => {
    if (quantity >= 20) {
      toast.error("Sorry! Only 20 items allowed at a time", {
        position: "top-center",
        duration: 500,
      });
      return;
    }
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity >= 1) {
      updateQuantity(item.id, quantity - 1);
    }
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="flex w-full flex-col items-center rounded-lg bg-neutral-200 p-2 shadow-sm border-2 transition duration-300 ease-in-out transform hover:shadow-xl"
       // Open modal on card click
      >
        <Image
          src={img1}
          alt={item.title}
          width={50}
          height={50}
          quality={100}
          layout="responsive"
          priority={true}
          className="min-h-[10rem] object-cover"
          onClick={openModal} 
        />
        <p className="base-semibold mt-4">
          {item.title.length > 30
            ? item.title.slice(0, 30) + "..."
            : item.title}
        </p>
        <p className="h3-bold m-2">{`$${item.price}`}</p>
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="my-4 py-2 w-full mx-2 bg-red-400 text-white hover:bg-red-600"
          >
            Add To Cart
          </button>
        ) : (
          <div className="flex items-center justify-center my-4 w-full">
            <button
              onClick={handleDecreaseQuantity}
              className="px-4 py-2 bg-red-500 text-white rounded-l"
            >
              -
            </button>
            <span className="px-4 py-2 bg-gray-200">{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="px-4 py-2 bg-green-500 text-white rounded-r"
            >
              +
            </button>
            <button
              onClick={() => {
                router.push("/checkout");
              }}
              className="px-4 py-2 ml-2 bg-blue-500 text-white rounded"
            >
              View Cart
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} item={item} />
    </>
  );
};
