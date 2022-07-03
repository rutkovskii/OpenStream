import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StoreProvider from "./context/context";

import App from "./app";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<>
		<StoreProvider>
			<ToastContainer />
			<App />
		</StoreProvider>
	</>
);
