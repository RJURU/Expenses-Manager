import { useState } from "react";
import "../index.css";
import { v4 as uuidv4 } from "uuid";
import { Footer } from "../Components/index.js";

function Payments() {
	return (
		<>
			<header className="bg-slate-500 text-white">
				Hello World from Payments
			</header>
			<Footer Page="Payments" />
		</>
	);
}

export default Payments;
