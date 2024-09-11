 export interface props {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
  }
  
  export interface ItemsProps {
    item:props;
  }
  export type Product = {
    id: number;
    title: string;
    price: number; // Updated to number
    category: string;
    description: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };
  
  export interface Discount {
    code: string;
    discountType: string;
    discount: number;
  }
  