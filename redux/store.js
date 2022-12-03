import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
// import rootReducer from "./reducers";
import { reducer } from "./reducer";

// initial states here

// creating store
export const store = createStore(reducer);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
