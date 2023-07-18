import React, { useState } from "react";
import { SVGHome, SVGDollar, SVGBarChart, SVGCog } from "../Icons/index.js";

function Footer({ Page }) {
	const navBtn =
		"p-2.5 block hover:bg-slate-500 flex flex-row justify-center";
	const disableBtn = "bg-slate-400 pointer-events-none";
	const svgFill = "white";
	const [selected] = useState(Page);

	return (
		<div className="absolute bottom-0 w-full flex flex-row justify-evenly bg-slate-800">
			<div className="w-full">
				<a
					className={` ${navBtn} ${
						selected == "Home" ? disableBtn : ""
					}`}
					href="/"
				>
					<SVGHome fill={svgFill} />
				</a>
			</div>
			<div className="w-full">
				<a
					className={` ${navBtn} ${
						selected == "Payments" ? disableBtn : ""
					}`}
					href="/payments/"
				>
					<SVGDollar fill={svgFill} />
				</a>
			</div>
			<div className="w-full">
				<a
					className={` ${navBtn} ${
						selected == "Stats" ? disableBtn : ""
					}`}
					href="/stats/"
				>
					<SVGBarChart fill={svgFill} />
				</a>
			</div>
			<div className="w-full">
				<a
					className={` ${navBtn} ${
						selected == "Options" ? disableBtn : ""
					}`}
					href="/options/"
				>
					<SVGCog fill={svgFill} />
				</a>
			</div>
		</div>
	);
}

export default Footer;
