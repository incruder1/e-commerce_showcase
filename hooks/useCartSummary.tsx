// hooks/useCartSummary.ts
import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { useCart } from "@/context/CartContext";

const DISCOUNT_TYPES = {
  PERCENTAGE: "percentage",
  FLAT: "flat",
};

const discountData = [
  {
    code: "Profile",
    discountType: DISCOUNT_TYPES.PERCENTAGE,
    discount: 50,
  },
  {
    code: "OFF20",
    discountType: DISCOUNT_TYPES.PERCENTAGE,
    discount: 20,
  },
  {
    code: "HBD26",
    discountType: DISCOUNT_TYPES.FLAT,
    discount: 200,
  },
];

const useCartSummary = (products: Product[], discountCode: string) => {
  const [cartSummary, setCartSummary] = useState({
    subTotal: 0,
    discount: 0,
    total: 0,
    deliveryCharge: 0,
  });
  const { cart } = useCart();

  const calculateSubtotal = (): number => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
    return products.reduce((total, product) => {
      const quantity = cartData[product.id] || 0;
      return total + product.price * quantity;
    }, 0);
  };

  const applyDiscount = (subTotal: number, disCode: string = ""): number => {
    const discObj = discountData.find((item) => item.code === disCode);
    let discount = 0;

    if (discObj) {
      switch (discObj.discountType) {
        case DISCOUNT_TYPES.PERCENTAGE:
          discount = subTotal * (discObj.discount / 100);
          break;
        case DISCOUNT_TYPES.FLAT:
          discount = discObj.discount;
          if (discount > subTotal) {
            discount = subTotal;
          }
          break;
        default:
          discount = 0;
          break;
      }
    }

    return discount;
  };

  const applyDeliveryCharge = (subTotal: number): number => {
    return subTotal > 75 ? 0 : 50;
  };

  useEffect(() => {
    const subTotal = calculateSubtotal();
    const discount = applyDiscount(subTotal, discountCode);
    const deliveryCharge = applyDeliveryCharge(subTotal);
    const total = subTotal - discount + deliveryCharge;

    setCartSummary({ subTotal, discount, deliveryCharge, total });
  }, [products, discountCode]);

  return cartSummary;
};

export default useCartSummary;
