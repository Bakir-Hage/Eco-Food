import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const user = useSelector((state: any) => state.user);
  type OrderStatus = "Pending" | "Ready for Pickup" | "Completed" | "Cancelled";
  type FoodItem = {
    id: string;
    title: string;
    vendor: string;
    image: string;
    originalPrice: number;
    discountedPrice: number;
    expiresAt: Date;
    quantity: number;
    category: string;
    pickupLocation: string;
    description?: string;
  };
  type CartItem = {
    foodItem: FoodItem;
    quantity: number;
  };

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  console.log("User state:", user);
  return (
    <>
      {user.isLoggedIn ? (
        <Navbar cartItemCount={totalItems} />
      ) : (
        <p>Please log in to continue.</p>
      )}
    </>
  );
}

export default App;
