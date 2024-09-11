"use client";
import { ItemsProps } from "@/types/index";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useRef } from "react"; // Import useState, useRef for managing state and DOM references
import img1 from "@/public/assets/img1.jpg";
import Modal from "@/components/Modal";
import { useCart } from "@/context/CartContext";

export const Items = ({ item }: ItemsProps) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const quantity = cart[item.id] || 0;
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs for image and hidden cart icon
  const imgRef = useRef<HTMLImageElement>(null);
  const cartIconRef = useRef<HTMLDivElement>(null); // Set a ref for the hidden cart icon

  // Handle modal open/close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle add to cart and animation
  const handleAddToCart = () => {
    addToCart(item.id);
    animateFlyToCart();
  };

  const animateFlyToCart = () => {
    if (!imgRef.current || !cartIconRef.current) return;

    const img = imgRef.current;
    const cartIcon = cartIconRef.current;
    
    // Clone the image for animation
    const flyingImg = img.cloneNode(true) as HTMLImageElement;
    flyingImg.style.position = "absolute";
    flyingImg.style.zIndex = "1000";
    flyingImg.style.transition = "transform 2s ease-in-out";
    
    // Append flying image to the body
    document.body.appendChild(flyingImg);

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    // Set initial position of the flying image
    flyingImg.style.left = `${imgRect.left}px`;
    flyingImg.style.top = `${imgRect.top}px`;
    flyingImg.style.width = `${imgRect.width}px`;
    flyingImg.style.height = `${imgRect.height}px`;

    // Trigger the animation to the hidden cart icon in the top-right
    setTimeout(() => {
      flyingImg.style.transform = `translate(${cartRect.left-imgRect.left  }px, ${
        cartRect.top - imgRect.top
      }px) scale(0.2)`;
    }, 100); // Small delay for smooth transition

    // Clean up after animation completes
    setTimeout(() => {
      document.body.removeChild(flyingImg);
    }, 1000);
  };

  return (
    <>
      <div
        className="flex w-full flex-col items-center rounded-lg bg-neutral-200 p-2 shadow-sm border-2 transition duration-300 ease-in-out transform hover:shadow-xl"
      >
        <Image
          ref={imgRef} // Reference to the image for animation
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
              onClick={() => updateQuantity(item.id, quantity - 1)}
              className="px-4 py-2 bg-red-500 text-white rounded-l"
            >
              -
            </button>
            <span className="px-4 py-2 bg-gray-200">{quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, quantity + 1)}
              className="px-4 py-2 bg-green-500 text-white rounded-r"
            >
              +
            </button>
            <button
              onClick={() => router.push("/checkout")}
              className="px-4 py-2 ml-2 bg-blue-500 text-white rounded"
            >
              View Cart
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} item={item} />

      {/* Hidden Cart icon placeholder at the top right */}
      <div
        ref={cartIconRef}
        className="fixed top-4 right-20 invisible p-4 bg-gray-800 text-white rounded-full"
      >
        🛒
      </div>
    </>
  );
};
