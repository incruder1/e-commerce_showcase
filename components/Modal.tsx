// components/Modal.tsx
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import img1 from "@/public/assets/img1.jpg";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-auto md:h-[60%] md:w-[90%] flex items-center justify-center z-50 bg-transparent bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-5 relative lg:max-w-4xl  gap-1 md: mx-10 flex flex-col lg:flex-row items-center justify-center "
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-3 text-xl text-red-500"
        >
          &times;
        </button>
        <div className="flex-shrink-0 w-[80%] h-auto lg:w-1/2 lg:pr-4">
          <Image
            src={img1}
            alt={item.title}
            width={500}
            height={300}
            className="object-cover"
          />
        </div>
        <div className="flex-grow lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
          <p className={`text-lg mb-4 `} >
            {item.description}
          </p>
          {/* {!isExpanded && item.description.length > 50 && (
            <button
              onClick={handleExpandText}
              className="text-blue-500"
            >
              Read more
            </button>
          )} */}
          <p className="text-xl font-semibold">{`$${item.price}`}</p>
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
      </div>
    </div>
  );
};

export default Modal;
