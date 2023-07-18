import { useState, useEffect } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import { Footer, Payment } from "./Components/index.js";

function Home() {
	const [categories] = useState(() => {
		const storedCategories = localStorage.getItem(
			"RJ_Expenses_Manager_Categories"
		);
		if (storedCategories == null || storedCategories == []) return [];
		return JSON.parse(storedCategories);
	});

	return (
		<>
			<header className="bg-slate-500 text-white">Hello World</header>
			<Footer Page="Home" />
		</>
	);
}

export default Home;
