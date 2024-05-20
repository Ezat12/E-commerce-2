import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const found = state.find((p) => p.id === action.payload.id);

      if (found) {
        found.Quantity += 1;
      } else {
        if (action.payload.Quantity) {
          state.push(action.payload);
        } else {
          const product = { ...action.payload, Quantity: 1 };
          state.push(product);
        }
      }
    },
    deleteProduct: (state, action) => {
      const found = state.find((p) => p.id === action.payload.id);

      if (found.Quantity > 1) {
        found.Quantity -= 1;
      } else {
        return state.filter((p) => p.id !== action.payload.id);
      }
    },
    deletedProduct: (state, action) => {
      if (state.length === 2) {
        // let te = state;
        // te = te.filter(e => e.id === action.payload.id);
        // state = [];
        // state.push(te);
      } else {
        
        state = state.filter((el) => el.id !== action.payload.id);
      }
      return state;

    },
  },
});

export const { addProduct, deleteProduct, deletedProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
