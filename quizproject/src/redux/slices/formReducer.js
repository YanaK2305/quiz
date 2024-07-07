import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    amount: "1",
    category: "",
    difficulty: "",
    type: "",
  },
};
export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.data = action.payload;
      // входящие данные, то что передаем при вызове из react
    },
  },
});
export default formSlice.reducer;
export const { setFormData } = formSlice.actions;
