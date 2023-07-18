import { useState, useEffect } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import { Footer, Header } from "./Components/index.js";
import { Home, Payments, Stats, Options } from "./Pages/index.js";

function App() {
	const [page, setPage] = useState("Home");
	return (
		<>
			<Header header={page} />
			{page == "Home" && <Home />}
			{page == "Payments" && <Payments />}
			{page == "Stats" && <Stats />}
			{page == "Options" && <Options />}
			<Footer setPage={setPage} />
		</>
	);
}

export default App;
