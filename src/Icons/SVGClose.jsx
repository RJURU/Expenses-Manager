import React from "react";

function SVGClose({ fill, size }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height={size}
			width={size}
			fill={fill}
			viewBox="0 -960 960 960"
		>
			<path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
		</svg>
	);
}

export default SVGClose;
