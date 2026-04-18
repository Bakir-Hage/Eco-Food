import { useSelector } from "react-redux";
import "./App.css";
import Cart from "./components/Cart";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  getUserCartDetails,
  updateCart,
  addToCart,
} from "./Config/firebaseLogic";

function App() {
  const user = useSelector((state: any) => state.user);
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const loadCart = async () => {
      if (!user.uid) {
        setCartItems([]);
        return;
      }

      const response = await getUserCartDetails(user.uid);
      if (response.success) {
        setCartItems(response.cartItems ?? []);
      } else {
        setCartItems([]);
        console.error("Failed to load cart items:", response.error);
      }
    };

    if (isCartOpen) {
      loadCart();
    }
  }, [user.uid, isCartOpen]);

  const handleRemoveItem = async (id: string) => {
    const newCartItems = cartItems.filter((item) => item.foodItem.id !== id);
    setCartItems(newCartItems);
    const itemsArray = newCartItems.flatMap((item) =>
      Array(item.quantity).fill(item.foodItem.id),
    );
    await updateCart(user.uid, itemsArray);
  };

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    const newCartItems = cartItems.map((item) =>
      item.foodItem.id === id ? { ...item, quantity } : item,
    );
    setCartItems(newCartItems);
    const itemsArray = newCartItems.flatMap((item) =>
      Array(item.quantity).fill(item.foodItem.id),
    );
    await updateCart(user.uid, itemsArray);
  };
  const handleAddToCart = async (item: FoodItem) => {
    if (!user.uid) {
      console.error("Cannot add to cart: user is not logged in.");
      return;
    }

    const response = await addToCart(user.uid, item.id);
    if (response.success) {
      const existingItem = cartItems.find(
        (cartItem) => cartItem.foodItem.id === item.id,
      );
      if (existingItem) {
        setCartItems((prev) =>
          prev.map((cartItem) =>
            cartItem.foodItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          ),
        );
      } else {
        setCartItems((prev) => [...prev, { foodItem: item, quantity: 1 }]);
      }
      console.log(`Added ${item.title} to cart for user ${user.uid}`);
    } else {
      console.error("Failed to add item to cart:", response.error);
    }
  };
  console.log("User state:", user);
  return (
    <>
      {user.isLoggedIn ? (
        <>
          <Outlet
            context={{
              handleAddToCart,
              cartItemCount: totalItems,
              onOpenCart: () => setIsCartOpen(true),
            }}
          />
          <Cart
            open={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </>
      ) : (
        <p>Please log in to continue.</p>
      )}
    </>
  );
}

export default App;
