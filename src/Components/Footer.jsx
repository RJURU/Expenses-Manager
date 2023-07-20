import React, { useState } from "react";
import { SVGHome, SVGDollar, SVGBarChart, SVGCog } from "../Icons";

function Footer({ setPage }) {
    const navBtn = "w-full p-2.5 block flex flex-row justify-center";
    const disableBtn = "bg-green-400 select-none";
    const svgFill = "white";
    const svgSize = "36";
    const [selected, updatePage] = useState("Home");

    const handleUpdatePage = (e) => {
        updatePage(e);
        setPage(e);
    };

    return (
        <div className="absolute bottom-0 flex h-14 w-full flex-row justify-evenly bg-slate-800">
            <div className="w-full">
                <p
                    className={` ${navBtn} ${
                        selected == "Home" ? disableBtn : ""
                    }`}
                    onClick={() => handleUpdatePage("Home")}
                >
                    <SVGHome fill={svgFill} size={svgSize} />
                </p>
            </div>
            <div className="w-full">
                <p
                    className={` ${navBtn} ${
                        selected == "Payments" ? disableBtn : ""
                    }`}
                    onClick={() => handleUpdatePage("Payments")}
                >
                    <SVGDollar fill={svgFill} size={svgSize} />
                </p>
            </div>
            <div className="w-full">
                <p
                    className={` ${navBtn} ${
                        selected == "Stats" ? disableBtn : ""
                    }`}
                    onClick={() => handleUpdatePage("Stats")}
                >
                    <SVGBarChart fill={svgFill} size={svgSize} />
                </p>
            </div>
            <div className="w-full">
                <p
                    className={`${navBtn} ${
                        selected == "Options" ? disableBtn : ""
                    }`}
                    onClick={() => handleUpdatePage("Options")}
                >
                    <SVGCog fill={svgFill} size={svgSize} />
                </p>
            </div>
        </div>
    );
}

export default Footer;
