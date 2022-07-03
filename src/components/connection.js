import React, { memo, useEffect, useState } from "react";

import IssueSvg from "../svg/issue.svg";

const Connection = () => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		window.addEventListener("offline", () => setIsOnline(false));
		window.addEventListener("online", () => setIsOnline(true));
		return () => {
			window.removeEventListener("offline");
			window.removeEventListener("online");
		};
	}, []);

	return (
		<>
			{!isOnline ? (
				<div className="bg-danger py-1 px-4 text-center text-white text-sm flex items-center justify-center">
					<img src={IssueSvg} style={{ height: "15px", width: "15px", marginRight: "10px", fill: "currentColor", color: "#b7b7b7" }} />
					<div>
						<span className="font-medium">You are offline! </span> Please check your internet
					</div>
				</div>
			) : null}
		</>
	);
};

export default memo(Connection);
