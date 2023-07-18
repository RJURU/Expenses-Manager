import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import { Footer, Header } from "./Components/index.js";
import { Home, Payments, Stats, Options } from "./Pages/index.js";

function App() {
	const [page, setPage] = useState("Home");
	const [startYear, setStartYear] = useState("2023-04-03");
	const [weeks] = useState(() => {
		const from = new Date(startYear);
		const to = new Date();

		const buildDateString = (date) => {
			const day = date.getDate().toString().padStart(2, "0");
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const year = date.getFullYear();

			return `${day}/${month}/${year}`;
		};

		const increaseDays = (date, amount) =>
			new Date(date.setDate(date.getDate() + amount));

		const buildWeeks = (start, end) => {
			const weeks = [];
			let current = new Date(start);
			var totalWeeks = 1;
			while (current < end) {
				const beginOfWeek = new Date(
					current.getTime() + current.getTimezoneOffset()
				);
				let endOfWeek = increaseDays(current, 6);
				endOfWeek = new Date(
					endOfWeek.getTime() - 1 + endOfWeek.getTimezoneOffset()
				);

				weeks.push({
					key: uuidv4(),
					week: "Week " + totalWeeks,
					beg: buildDateString(beginOfWeek),
					end: buildDateString(endOfWeek),
				});

				totalWeeks += 1;
				current = increaseDays(current, 1);
			}

			return weeks;
		};

		const weeks = buildWeeks(from, to);
		return weeks;
	});
	const [data, updateData] = useState([{ weeks: weeks }]);
	useEffect(() => {
		let dataNew = [
			{
				weeks: weeks,
			},
		];
		updateData(dataNew);
	}, [weeks]);

	return (
		<>
			<Header header={page} />
			{page == "Home" && <Home data={data} />}
			{page == "Payments" && <Payments />}
			{page == "Stats" && <Stats />}
			{page == "Options" && <Options setStartYear={setStartYear} />}
			<Footer setPage={setPage} />
		</>
	);
}

export default App;
