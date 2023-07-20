import React from "react";

function SVGCheck({ fill, size }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height={size}
			width={size}
			fill={fill}
			viewBox="0 -960 960 960"
		>
			<path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
		</svg>
	);
}

export default SVGCheck;
