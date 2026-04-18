import { createSlice } from "@reduxjs/toolkit";
import { fetchFoodItems } from "./FoodThunk";

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

type FoodStateType = {
  items: FoodItem[];
  loading: boolean;
  error: string | null;
};

const initialState: FoodStateType = {
  items: [],
  loading: false,
  error: null,
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFoodItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
