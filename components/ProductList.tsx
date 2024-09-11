// components/ProductList.tsx
import React from 'react';
import { Product } from '@/types';
import { CardItem } from '@/components/CardItem.component';
import { useCart } from "@/context/CartContext";

type Props = {
  products: Product[];
};

const ProductList: React.FC<Props> = ({ products }) => {
  const { cart, updateQuantity, removeItem } = useCart();

  return (
    <div className="space-y-2 w-full lg:w-3/5 bg-my-accent-950 rounded-lg p-3 overflow-x-hidden max-h-[calc(100vh-10rem)] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar-thumb]:bg-my-primary-600 [&::-webkit-scrollbar-track]:bg-my-accent-950 border">
      {products.map((product) => {
        const quantity = cart[product.id];
        return (
          <CardItem
            key={product.id}
            product={product}
            quantity={quantity}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
