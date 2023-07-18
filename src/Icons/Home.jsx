import React from "react";

function SVGHome({ fill }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="36"
			width="36"
			viewBox="0 -960 960 960"
			fill={fill}
		>
			<path d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z" />
		</svg>
	);
}

export default SVGHome;
