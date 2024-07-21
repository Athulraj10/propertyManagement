import React from "react";
import { AppRouter } from "./routes/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";
import './app.css'


export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
