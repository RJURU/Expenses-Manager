import React, { useState } from "react";
import { SVGHome, SVGDollar, SVGBarChart, SVGCog } from "../Icons";

function Footer({ page, setPage }) {
    const navBtn = "w-full p-2.5 block flex flex-row justify-center";
    const disableBtn = "bg-green-400 select-none";
    const svgFill = "white";
    const svgSize = "36";

    return (
        <div className="absolute bottom-0 flex h-14 w-full flex-row justify-evenly bg-slate-800">
            <div className="w-full">
                <p
                    className={` ${navBtn} ${page == "Home" ? disableBtn : ""}`}
                    onClick={() => setPage("Home")}
                >
                    <SVGHome fill={svgFill} size={svgSize} />
                </p>
            </div>
            <div className="w-full">
                <p
                    className={` ${navBtn} ${
                        page == "Payments" ? disableBtn : ""
                    }`}
                    onClick={() => setPage("Payments")}
                >
                    <SVGDollar fill={svgFill} size={svgSize} />
                </p>
            </div>
            <div className="w-full">
                <p
                    className={` ${navBtn} ${
                        page == "Stats" ? disableBtn : ""
                    }`}
                    onClick={() => setPage("Stats")}
                >
                    <SVGBarChart fill={svgFill} size={svgSize} />
                </p>
            </div>
            <div className="w-full">
                <p
                    className={`${navBtn} ${
                        page == "Options" ? disableBtn : ""
                    }`}
                    onClick={() => setPage("Options")}
                >
                    <SVGCog fill={svgFill} size={svgSize} />
                </p>
            </div>
        </div>
    );
}

export default Footer;
