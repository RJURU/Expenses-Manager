import React, { useState } from "react";
import { SVGHome, SVGDollar, SVGBarChart, SVGCog } from "../Icons";

function Footer({ page, setPage }) {
    const navBtn = "w-full p-2.5 flex flex-row justify-center";
    const disableBtn = "bg-green-400 select-none";
    const svgFill = "white";
    const svgSize = "36";

    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="absolute bottom-0 flex h-14 w-full flex-row justify-evenly bg-slate-800">
            <div className="w-full">
                <p
                    className={` ${navBtn} ${page == "Home" ? disableBtn : ""}`}
                    onClick={() => handlePageChange("Home")}
                >
                    <SVGHome fill={svgFill} size={svgSize} />
                </p>
            </div>
            <div className="w-full">
                <p
                    className={` ${navBtn} ${
                        page == "Payments" ? disableBtn : ""
                    }`}
                    onClick={() => handlePageChange("Payments")}
                >
                    <SVGDollar fill={svgFill} size={svgSize} />
                </p>
            </div>
            <div className="w-full">
                <p
                    className={` ${navBtn} ${
                        page == "Stats" ? disableBtn : ""
                    }`}
                    onClick={() => handlePageChange("Stats")}
                >
                    <SVGBarChart fill={svgFill} size={svgSize} />
                </p>
            </div>
            <div className="w-full">
                <p
                    className={`${navBtn} ${
                        page == "Options" ? disableBtn : ""
                    }`}
                    onClick={() => handlePageChange("Options")}
                >
                    <SVGCog fill={svgFill} size={svgSize} />
                </p>
            </div>
        </div>
    );
}

export default Footer;
