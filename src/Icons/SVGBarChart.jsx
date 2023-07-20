import React from "react";

function SVGBarChart({ fill, size }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height={size}
			width={size}
			viewBox="0 -960 960 960"
			fill={fill}
		>
			<path d="M160-160v-440h140v440H160Zm250 0v-640h140v640H410Zm250 0v-280h140v280H660Z" />
		</svg>
	);
}

export default SVGBarChart;
