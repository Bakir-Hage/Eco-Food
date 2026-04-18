import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFoodItems } from "../Config/firebaseLogic";

type FoodItem = {
  id: string;
  title: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  expiresAt: string;
  description: string;
  vendor?: string;
  image?: string;
};

export const fetchFoodItems = createAsyncThunk<FoodItem[]>(
  "food/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAllFoodItems();
      if (result.success && result.foodItems) {
        return result.foodItems as FoodItem[];
      } else {
        return rejectWithValue(result.error || "Failed to fetch food items");
      }
    } catch (error) {
      return rejectWithValue("Failed to fetch food items");
    }
  },
);
