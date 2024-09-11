# Checkout Page

This is a Checkout page component for an e-commerce application built with Next.js and React. It integrates a cart summary with discount code application and handles the checkout process.

## Features

- Displays the shopping cart items.
- Calculates the subtotal, discount, and total amounts.
- Applies discount codes with percentage or flat-rate discounts.
- Provides functionality to clear the cart and proceed to checkout.

## Getting Started

### Prerequisites
- Next.js
- React
- Tailwind CSS
- Sonner (for toasts)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/incruder1/profile_ecomerce
    ```

2. Navigate into the project directory:

    ```bash
    cd ecommerce
    ```

3. Install the dependencies:

    ```bash
    npm i
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

### Usage

1. **Fetching Products**: Products are fetched from a local JSON file (`/constant/products.json`).

2. **Cart Management**: The `CartContext` manages cart state and functionality, including adding, removing, and updating item quantities.

3. **Discount Codes**: Discount codes are predefined in the component. Users can enter a discount code to apply a discount to the cart.

4. **Checkout**: On clicking "Proceed to Checkout," a success toast is shown, and the cart is cleared.

### Component Details

#### `Page`

This is the main component for the checkout page.

- **State Management**: 
  - `products`: List of products in the cart.
  - `discountCode`: Current discount code applied.
  - `isDiscountCodeValid`: Validity of the discount code.
  - `cartSummary`: Object containing subtotal, discount, and total amounts.

- **Functions**:
  - `fetchProducts`: Fetches product data.
  - `calculateSubtotal`: Calculates the subtotal of the cart.
  - `applyDiscount`: Applies discount based on the discount code.
  - `updateCartSummary`: Updates the cart summary with subtotal, discount, and total.
  - `handleDiscountCodeKeyDown`: Handles the discount code input and applies it.
  - `handleDiscountCodeChange`: Clears the discount code if input is empty.
  - `handleCheckout`: Handles the checkout process, shows a success toast, and clears the cart.

#### `Header`

A header component that appears on top of the page.

### Styling

Tailwind CSS is used for styling. Ensure you have Tailwind CSS configured in your project.

### Testing

Run the application and navigate to the checkout page to test the functionality:

```bash
npm run dev
```
