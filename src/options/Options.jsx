import { useState } from "react";
import "../index.css";
import { AddCategories, Footer } from "../Components/index.js";

function Options() {
	return (
		<>
			<header className="bg-slate-500 text-white">
				Hello World from Options
			</header>
			<AddCategories />
			<Footer Page="Options" />
		</>
	);
}

export default Options;
