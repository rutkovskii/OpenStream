import React from "react";
import IssueSvg from "../svg/issue.svg";

const PageNotFound = (props) => {
	return (
		<div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 43, color: "#b7b7b7" }}>
				<img src={IssueSvg} style={{ height: "35px", width: "35px", marginRight: "10px", fill: "currentColor", color: "#b7b7b7" }} />
				404
			</div>
			<div style={{ fontSize: "17px", marginBottom: "10px", marginTop: "30px", color: "#444" }}>Page Not Found</div>
			<div style={{ fontSize: "13px", color: "#666" }}>Sorry! the page you are looking for does not exist</div>
		</div>
	);
};
export default PageNotFound;
