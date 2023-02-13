import { createStore } from "redux";

const initialState = {
  url: {
    path: "/",
    title: "BLE Tutorial",
  },
};

export default createStore(function (state = initialState, action) {
  switch (action.type) {
    case "URL":
      console.log("store", action.type, state, action);
      return { ...state, url: action.url };
    default:
      return state;
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
