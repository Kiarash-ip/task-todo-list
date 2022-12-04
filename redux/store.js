import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todosSlice from "./todosSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      todos: todosSlice,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
