import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./Components/ScrollToTop";
import swDev from "./swDev";

const store= configureStore({
    reducer: rootReducer,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
    <BrowserRouter>
    <ScrollToTop/>
    <App />
    <Toaster/>
    </BrowserRouter>
    </Provider>
);
swDev();
