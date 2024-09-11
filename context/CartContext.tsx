"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface CartContextType {
  cart: { [key: number]: number };
  addToCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  // check if localStorage is not undefined
  if (typeof window !== "undefined") {
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart =
        localStorage.getItem("cart") === null
          ? "{}"
          : (localStorage.getItem("cart") as string);

      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localCart = JSON.parse(localStorage.getItem("cart") as string);

      localStorage.setItem(
        "cart",
        // by having "cart" before "localCart", it will prevent adding existing products when clicked on "Add to cart"
        JSON.stringify({
          ...cart,
          ...localCart,
        })
      );
    }
  }, [cart]);

  const addToCart = (productId: number) => {
    try {
      setCart((prevCart) => ({
        ...prevCart,
        [productId]: (prevCart[productId] || 0) + 1,
      }));
      toast.success("Product added to cart",{
        duration: 500,
        position:"top-center"
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart",{
        position:"top-center"

      });
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (quantity <= 0) {
        // filter out the product
        const filteredCart = Object.fromEntries(
          Object.entries(updatedCart).filter(
            ([key]) => key !== productId.toString()
          )
        );

        localStorage.setItem("cart", JSON.stringify(filteredCart));
        return filteredCart;
      } else {
        const newCart = {
          ...updatedCart,
          [productId]: quantity,
        };

        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      }
    });
  };

  const removeItem = (productId: number) => {
    try {
      // save a copy of cart for undo
      const tempCart = { ...cart };
      setCart((prevCart) => {
        const { [productId]: _, ...rest } = prevCart;

        localStorage.setItem("cart", JSON.stringify(rest));
        return rest;
      });

      toast.success("Product removed from cart", {
        duration: 500,
        position:"top-center",
        action: {
          label: "Undo",
          onClick: () => {
            setCart(tempCart);
            localStorage.setItem("cart", JSON.stringify(tempCart));
          },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product from cart");
    }
  };

  // button for clearing the cart
  const clearCart = () => {
    try {
      // save a copy of cart for undo
      const tempCart = { ...cart };
      setCart({});
      localStorage.removeItem("cart");
      toast.success("Cart cleared", {
        duration: 500,
        position:"top-center",
        action: {
          label: "Undo",
          onClick: () => {
            setCart(tempCart);
            localStorage.setItem("cart", JSON.stringify(tempCart));
          },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
