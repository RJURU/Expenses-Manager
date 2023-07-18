import React from "react";

function SVGLeftArrowKey({ fill, size }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height={size}
			width={size}
			fill={fill}
			viewBox="0 -960 960 960"
		>
			<path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z" />
		</svg>
	);
}

export default SVGLeftArrowKey;
