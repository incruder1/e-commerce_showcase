"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Toaster, toast } from "sonner";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { CardItem } from "@/components/CardItem.component";
import productItem from "@/constant/products.json";
import { Header } from "@/components/Header";

import { useRouter } from "next/navigation";
type Props = {};
const DISCOUNT_TYPES = {
  PERCENTAGE: "percentage",
  FLAT: "flat",
};

const discountData = [
  {
    code: "PROFILE",
    discountType: DISCOUNT_TYPES.PERCENTAGE,
    discount: 50,
  },
  {
    code: "DEVJOHRI",
    discountType: DISCOUNT_TYPES.PERCENTAGE,
    discount: 20,
  },
  {
    code: "ARPITBHAIYAOP",
    discountType: DISCOUNT_TYPES.FLAT,
    discount: 200,
  },
];

const Page = (props: Props) => {
  const router = useRouter(); 
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountCodeValid, setIsDiscountCodeValid] = useState<
    boolean | null
  >(null);
  const [cartSummary, setCartSummary] = useState({
    subTotal: 0,
    discount: 0,
    total: 0,
 
  });

  const fetchProducts = async () => {
    try {
      return productItem;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };
  const calculateSubtotal = (): number => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    const subtotal = products.reduce((total, product) => {
      const quantity = cart[product.id] || 0;
      const price = parseFloat(product.price.toString());  
      return total + price * quantity;
    }, 0);
  
    return parseFloat(subtotal.toFixed(1)); 
  };

  const applyDiscount = (subTotal: number, disCode: string = ""): number => {
    const discObj = discountData.find((item) => item.code === disCode);
    let discount = 0;

    if (discObj) {
      switch (discObj.discountType) {
        case DISCOUNT_TYPES.PERCENTAGE:
          discount = subTotal * (discObj.discount / 100);
          setIsDiscountCodeValid(true);
          break;
        case DISCOUNT_TYPES.FLAT:
          discount = discObj.discount;
          if (discount > subTotal) {
            discount = subTotal;
          }
          setIsDiscountCodeValid(true);
          break;
        default:
          discount = 0;
          break;
      }
    } else if (disCode !== "") {
      setIsDiscountCodeValid(false);
    }

    return discount;
  };

 
  const updateCartSummary = (disCode:any) => {
    const subTotal = calculateSubtotal();
    const discount = applyDiscount(subTotal, disCode);
    // const deliveryCharge = applyDeliveryCharge(subTotal);
    const total = (subTotal - discount).toFixed(1);

    setCartSummary({ subTotal, discount, total: parseFloat(total) });
  };

  const handleDiscountCodeKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      const code = e.currentTarget.value.trim().toUpperCase();
      const discObj = discountData.find((item) => item.code === code);

      switch (discObj?.discountType) {
        case DISCOUNT_TYPES.PERCENTAGE:
          toast.success(
            `Coupon successfully applied for ${discObj.discount}% 🎉!`
          );
          setIsDiscountCodeValid(true);
          break;
        case DISCOUNT_TYPES.FLAT:
        setIsDiscountCodeValid(true);
          break;
        default:
          toast.error("Invalid discount coupon!");
          setIsDiscountCodeValid(false);
          break;
      }

      setDiscountCode(code);
    }
  };

  const handleDiscountCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().toUpperCase() === "") {
      setDiscountCode("");
      setIsDiscountCodeValid(null);
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");
      const productIds = Object.keys(cart);

      if (productIds.length > 0) {
        const products = await fetchProducts();
        const filteredProducts = products.filter(
          (product: Product) => productIds.includes(product.id.toString()) // Ensure ID comparison is correct
        );

        setProducts(filteredProducts);
      } else {
        setProducts([]);
      }
    };

    fetchCartData();
  }, [cart]);

  useEffect(() => {
    if (products.length > 0) {
      updateCartSummary(discountCode);
    }
  }, [products, discountCode]);
  const handleCheckout = () => {
  toast.success("Thank You for buying from us", {
    duration: 1000,
    position: "top-center",
  });
clearCart();
}


  return (
    <>
      <Header />
      <div className="min-h-screen bg-my-background-1000 text-my-text-100">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-12 flex flex-col sm:flex-row items-center gap-2 whitespace-nowrap justify-center font-bold">
            Shopping Cart
          </h1>
          {products.length === 0 ? (
            <div
              className={cn(
                ["flex flex-col gap-6 items-center justify-center"],
                products.length === 0
                  ? "animate-in fade-in-0"
                  : "animate-out fade-out-0"
              )}
            >
              <p className="text-xl">Your cart is empty.</p>
              <Link
                href="/"
                className="mt-4 inline-block text-white bg-slate-500 hover:bg-slate-500 px-6 py-2 rounded-full font-semibold transition-colors duration-300"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div
              className={cn(
                ["flex flex-col gap-16 lg:flex-row"],
                products.length === 0
                  ? "animate-in fade-in-0"
                  : "animate-out fade-out-0"
              )}
            >
              <div className="space-y-2 w-full lg:w-3/5 bg-my-accent-950 rounded-lg p-3 overflow-y-auto max-h-[70vh] h-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-track]:bg-slate-500 border">
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

              <div className="w-full lg:w-2/5 space-y-5">
                <div className="mt-0 bg-my-background-500 p-4 md:p-8 rounded-lg shadow-lg h-max text-sm	 ">
                  <div className="flex items-center justify-center">
                    <h1 className="text-2xl font-semibold text-my-text-950 mb-4 text-center">
                      Discounts
                    </h1>
                  </div>
                  <p className="mb-4 text-my-text-950 flex items-center justify-between text-sm font-bold">
                    ARPITBHAIYAOP <p>200%</p>
                   
                  </p>
                  <p className="mb-4 text-my-text-950 flex items-center justify-between text-sm font-bold">
                  PROFILE <p>50%</p>
                   
                  </p>
                  <p className="mb-4 text-my-text-950 flex items-center justify-between text-sm font-bold">
                  DEVJOHRI <p>20%</p>
                   
                  </p>
                  
                </div>
                <div className="mt-0 bg-my-background-500 p-4 md:p-8 rounded-lg shadow-lg h-max  text-lg ">
                  <div className="flex items-center justify-center">
                    <h1 className="text-2xl font-semibold text-my-text-950 mb-4 text-center">
                      Cart Summary
                    </h1>
                  </div>
                  <div className="flex items-center justify-between mb-8 text-my-text-950 gap-4 relative">
                    <p className="whitespace-nowrap text-base font-medium	">
                      Discount Code
                    </p>
                    <div className="relative">
                      <input
                        type="text"
                        onKeyDown={handleDiscountCodeKeyDown}
                        onChange={handleDiscountCodeChange}
                        placeholder="coupon code"
                        className="bg-my-background-900 text-my-text-100 px-2 md:px-4 py-1 rounded-full font-normal text-sm md:text-base uppercase placeholder:text-xs relative"
                        maxLength={20}
                      />
                      <span className="text-sm text-my-text-800 absolute right-1/2 translate-x-1/4 top-8 md:top-10 whitespace-nowrap font-medium text-sm">
                        (Press Enter to apply)
                      </span>
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
                  <p className="text-base mb-4 text-my-text-950 flex items-center justify-between font-medium	">
                    Subtotal <p>${cartSummary.subTotal}</p>
                  </p>
                  <p className="text-base font-medium	 mb-4 text-my-text-950 flex items-center justify-between">
                    Discount <p>${cartSummary.discount}</p>
                  </p>
                  <p className="mb-4 flex items-center justify-between text-base font-medium	">
                    Total <p>${cartSummary.total}</p>
                  </p>
                  <div className="flex flex-row gap-2 justify-around	 ">
                    <button
                      className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 disabled:bg-slate-400"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </button>
                    <Link
                      href="/checkout"
                      onClick={handleCheckout}

                      className="bg-slate-600 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded-full text-center transition-colors duration-300"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="bottom-center" expand={true} />
    </>
  );
};

export default Page;
