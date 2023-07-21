import React from "react";

function SVGDropdown({ fill, size }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            width={size}
            fill={fill}
            viewBox="0 -960 960 960"
        >
            <path d="M480-360 280-559h400L480-360Z" />
        </svg>
    );
}

export default SVGDropdown;
