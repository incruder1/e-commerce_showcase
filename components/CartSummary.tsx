// components/CartSummary.tsx
import React from 'react';
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useCart } from "@/context/CartContext";
import { Product } from '@/types';
import Link from 'next/link';

type Props = {
  products: Product[];
  cartSummary: {
    subTotal: number;
    discount: number;
    total: number;
    deliveryCharge: number;
  };
  discountCode: string;
  isDiscountCodeValid: boolean | null;
  handleDiscountCodeKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleDiscountCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearCart: () => void;
};

const CartSummary: React.FC<Props> = ({
  products,
  cartSummary,
  discountCode,
  isDiscountCodeValid,
  handleDiscountCodeKeyDown,
  handleDiscountCodeChange,
  clearCart
}) => {
  return (
    <div className="w-full lg:w-2/5 space-y-5">
      <div className="mt-0 bg-my-background-500 p-4 md:p-8 rounded-lg shadow-lg h-max text-lg">
        <h1 className="text-2xl font-semibold text-my-text-950 mb-4">Cart Summary</h1>
        <div className="flex items-center justify-between mb-8 text-my-text-950 gap-4 relative">
          <p className="font-normal whitespace-nowrap text-base">Discount Code</p>
          <div className="relative">
            <input
              type="text"
              onKeyDown={handleDiscountCodeKeyDown}
              onChange={handleDiscountCodeChange}
              placeholder="coupon code"
              className="bg-my-background-900 text-my-text-100 px-2 md:px-4 py-1 rounded-full font-normal text-sm md:text-base uppercase placeholder:text-xs relative"
              maxLength={10}
            />
            <span className="text-sm text-my-text-800 absolute right-1/2 translate-x-1/2 top-8 md:top-10 whitespace-nowrap">(Press Enter to apply)</span>
          </div>
          {isDiscountCodeValid !== null && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xl rounded-full [&_svg]:rounded-full [&_svg]:w-5 [&_svg]:h-5 [&_svg]:p-1 ">
              {isDiscountCodeValid ? (
                <CheckIcon className="bg-green-600" />
              ) : (
                <XMarkIcon className="bg-red-600" />
              )}
            </span>
          )}
        </div>
        <p className="text-base mb-4 text-my-text-950 flex items-center justify-between">
          Subtotal <p>${cartSummary.subTotal}</p>
        </p>
        <p className="text-base mb-4 text-my-text-950 flex items-center justify-between">
          Discount <p>${cartSummary.discount}</p>
        </p>
        <p className="mb-4 text-my-text-950 flex items-center justify-between text-xl">
          Total <p>${cartSummary.total}</p>
        </p>
        <p className="text-xs mb-4 text-my-text-950">
          * Delivery Charges may apply based on the amount.
        </p>
        <div className="flex flex-col gap-2">
          <button
            className="bg-my-primary-600 hover:bg-my-primary-500 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 disabled:bg-my-primary-400"
            onClick={clearCart}
          >
            Clear Cart
          </button>
          <Link
            href="/checkout"
            className="bg-my-primary-600 hover:bg-my-primary-500 text-white font-semibold py-2 px-4 rounded-full text-center transition-colors duration-300"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
