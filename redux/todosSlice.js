import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { updateLocalStorage } from "../utils";

// Initial state
const initialState = {
  todos: [],
};

// Actual Slice
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setInitState(state, action) {
      state.todos = JSON.parse(localStorage.getItem("todos")) || [];
    },
    // Action to set the authentication status
    addTodo(state, action) {
      state.todos = [...state.todos, action.payload];
      updateLocalStorage("todos", state.todos);
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      updateLocalStorage("todos", state.todos);
    },
    editTodo(state, action) {
      let targetIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[targetIndex] = {
        ...state.todos[targetIndex],
        ...action.payload,
      };
      updateLocalStorage("todos", state.todos);
    },
    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...action.payload,
        };
      },
    },
  },
});

export const { addTodo, deleteTodo, editTodo, setInitState } =
  todosSlice.actions;

export const selectTodosState = (state) => state.todos.todos;

export default todosSlice.reducer;
