import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Dummy image data
const images = [
  "/assets/img1.jpg",
  "/assets/img2.jpg", // Add more image paths as needed
  "/assets/img3.jpg",
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any; // Replace with the correct type for your item
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const quantity = cart[item.id] || 0;
  const router = useRouter();

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

  const [isExpanded, setIsExpanded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleExpandText = () => {
    setIsExpanded(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Manage current image index

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-auto lg:w-full flex items-center justify-center z-50 bg-transparent bg-opacity-50 w-auto">
      <div
        ref={modalRef}
        className="relative bg-white p-5 lg:max-w-4xl gap-2 mx-4 flex flex-col lg:flex-row items-center rounded-lg border-rose-900 border-2 justify-between lg:justify-center shadow-lg overflow-hidden w-[70%]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-3 text-3xl text-red-500"
        >
          &times;
        </button>

        {/* Carousel with image */}
        <div className="relative flex-shrink-0 pt-1 w-full h-auto lg:w-1/2 lg:pr-4">
          <Image
            src={images[currentImageIndex]} // Show current image
            alt={item.title}
            width={500}
            height={500}
            className="object-cover w-full lg:h-full rounded-lg shadow-lg"
          />

          {/* Previous and Next buttons */}
          <button
            onClick={handlePrevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full"
          >
            &gt;
          </button>
        </div>

        <div className="flex-col lg:w-1/2">
          <h2 className="lg:text-2xl font-bold text-[1.2rem] justify-center items-center w-fit">{item.title}</h2>
          <p className="lg:text-base md:text-base text-[0.8rem] justify-center items-center w-fit">
            {item.description}
          </p>
          <p className="text-xl font-semibold">{`$${item.price}`}</p>
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="py-2 w-full mx-2 bg-red-400 text-white hover:bg-red-600"
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
      </div>
    </div>
  );
};

export default Modal;
