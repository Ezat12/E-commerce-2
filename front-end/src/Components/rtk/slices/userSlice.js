import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  image: "",
  email: "",
  password: "",
  cardData : [],
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const payload = action.payload;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.email = payload.email;
      state.password = payload.password;
      state.image = payload.image;
      state.cardData = payload.cardData;
      // console.log(state);
    },
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
