import React from "react";

function SVGDownload({ size, fill }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            width={size}
            fill={fill}
            viewBox="0 -960 960 960"
        >
            <path d="M480-313 287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z" />
        </svg>
    );
}

export default SVGDownload;
