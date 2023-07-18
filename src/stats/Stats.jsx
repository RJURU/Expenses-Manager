import { useState } from "react";
import "../index.css";
import { v4 as uuidv4 } from "uuid";
import { Footer } from "../Components/index.js";

function Stats() {
	return (
		<>
			<header className="bg-slate-500 text-white">
				Hello World from Stats
			</header>
			<Footer Page="Stats" />
		</>
	);
}

export default Stats;
