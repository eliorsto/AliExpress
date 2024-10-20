import { configureStore, createSlice } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";

const initialState = {
  cards: [],
  token: "",
  fullName: "",
  showAuth: false,
  currentSearch: "",
  loadPlaceholder: false,
  shoppingCartItems: localStorage.getItem("clone_cart")
    ? JSON.parse(localStorage.getItem("clone_cart") as string)
    : [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setShowAuth: (state, action) => {
      state.showAuth = action.payload;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    setCurrentSearch: (state, action) => {
      state.currentSearch = action.payload;
    },
    setShoppingCartItems: (state, action) => {
      state.shoppingCartItems = action.payload;
    },
  },
});

export const {
  setToken,
  setFullName,
  setShowAuth,
  setCards,
  setCurrentSearch,
  setShoppingCartItems,
} = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = ty;
