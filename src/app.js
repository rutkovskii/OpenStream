import React from "react";

import AppRoutes from "./components/app-routes";
import Connection from "./components/connection";
import Header from "./components/header";

const App = () => {
	return (
		<>
			<div className=" h-screen">
				<div>
					<Connection />
					<Header />
					<AppRoutes />
				</div>
			</div>
		</>
	);
};

export default App;
