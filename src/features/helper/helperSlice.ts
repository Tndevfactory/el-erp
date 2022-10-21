import { createSlice } from "@reduxjs/toolkit";

interface HelperState {
  lang: "ar" | "fr" | "en";
}
const initialState = {
  lang: "ar",
} as HelperState;

const helperSlice = createSlice({
  name: "helpers",
  initialState,
  reducers: {
    changeLangArabic: (state, action) => {
      state.lang = "ar";
    },
    changeLangFrench: (state) => {
      state.lang = "fr";
    },
    changeLangEnglish: (state, action) => {
      state.lang = "en";
    },
  },
});

export const { changeLangArabic, changeLangFrench, changeLangEnglish } =
  helperSlice.actions;

export default helperSlice.reducer;
