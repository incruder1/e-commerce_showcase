import React from 'react'
import { Product } from '@/types/index'
import Image from 'next/image'
import img1 from "@/public/assets/img1.jpg";

type Props = {}

export const CardItem = ({product,
  quantity,
  updateQuantity,
  removeItem,}: {
    product: Product;
    quantity: number;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
  }) => {
  return (
    <div className="flex items-center space-x-5 lg:h-20  sm:h-auto w-full border rounded-md bg-slate-100  ">
    <Image
      src={img1}
      alt={product.title}
      className="w-16 h-16 object-cover rounded-lg"
      width={64}
      height={64}
    />
    <div className="flex flex-col sm:flex-row w-full gap-2">
      {/* title and price container */}
      <div className="flex justify-evenly sm:flex-col  w-full ">
        <h2 className="text-sm sm:text-sm font-medium">{product.title}</h2>
        {/* cost of the product (with quantity) */}
        <p className="text-base">
          ${product.price * quantity}
          <span className="text-my-text-300 sm:invisible"> (${product.price} each)</span>
        </p>
      </div>
      {/* cart item controls */}
      <div className="flex items-center justify-between w-full sm:w-auto space-x-4 text-my-text-300">
        {/* quantity controls */}
        <div className="flex gap-4">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="bg-my-primary-800 hover:bg-my-primary-600 transition-colors duration-300  hover:text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xl disabled:opacity-50  disabled:hover:bg-my-primary-800 disabled:hover:text-my-text-100"
            disabled={quantity === 1}
          >
            -
          </button>
          <span className="text-sm font-semibold">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="bg-my-primary-800 hover:bg-my-primary-600 transition-colors duration-300  hover:text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xl"
          >
            +
          </button>
        </div>
        <button
          onClick={() => removeItem(product.id)}
          className=" hover:text-red-500 font-semibold transition-colors duration-300"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

          
        </button>
      </div>
    </div>
  </div>
  )
}