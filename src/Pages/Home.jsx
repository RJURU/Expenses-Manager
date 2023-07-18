import React, { useState, useEffect } from "react";
import {
	SVGLeftArrowKey,
	SVGRightArrowKey,
	SVGEuro,
	SVGGBP,
} from "../Icons/index.js";

function Home({ data }) {
	const svgFill = "white";
	const svgSize = "100%";
	const [categories] = useState(() => {
		const storedCategories = localStorage.getItem(
			"RJ_Expenses_Manager_Categories"
		);
		if (storedCategories == null || storedCategories == []) return [];
		return JSON.parse(storedCategories);
	});

	const [amount, setAmount] = useState("");
	const [fixedAmount, setFixedAmount] = useState("");

	const [currency, setCurrency] = useState("£");

	const handleSetAmount = (e) => {
		let fix = parseFloat(e).toFixed(2);
		setAmount(e);
		setFixedAmount(fix);
	};

	const [selectedWeek, setSelectedWeek] = useState(data[0].weeks.length - 1);
	const [selectedWeekPos, setSelectedWeekPos] = useState("Newest");

	useEffect(() => {
		if (selectedWeek == data[0].weeks.length - 1) {
			setSelectedWeekPos("Newest");
		} else if (selectedWeek == 0) {
			setSelectedWeekPos("Oldest");
		} else {
			setSelectedWeekPos("");
		}
	}, [selectedWeek]);

	const handleChangeWeek = (e) => {
		if (e == "Add" && e !== data[0].weeks.length - 1) {
			setSelectedWeek(selectedWeek + 1);
		} else if (e == "Minus" && selectedWeek !== 0) {
			setSelectedWeek(selectedWeek - 1);
		} else return;
	};

	return (
		<div className="h-[calc(100%-7rem)] flex flex-col justify-center">
			<div className="flex flex-col gap-8 w-10/12 mx-auto">
				<div className="flex flex-row gap-4">
					<div className="h-full w-20 flex flex-row bg-gray-700 border border-gray-100 rounded-lg overflow-hidden text-center">
						<div
							className={`w-6/12 h-full flex items-center ${
								currency == "£" ? "bg-slate-400" : ""
							}`}
							onClick={() => setCurrency("£")}
						>
							<p className="w-full p-1">
								<SVGGBP fill={svgFill} size={svgSize}></SVGGBP>
							</p>
						</div>
						<div
							className={`w-6/12 h-full flex items-center ${
								currency == "€" ? "bg-slate-400" : ""
							}`}
							onClick={() => setCurrency("€")}
						>
							<p className="w-full p-1">
								<SVGEuro fill={svgFill} size={svgSize} />
							</p>
						</div>
					</div>
					<input
						placeholder="0.00"
						value={amount}
						onChange={(e) => handleSetAmount(e.target.value)}
						className="border w-full text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-100 placeholder-gray-400 text-white"
					/>
				</div>
				<div className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-100 placeholder-gray-400 text-white flex flex-row justify-between relative">
					<p
						onClick={() => handleChangeWeek("Minus")}
						className={`${
							selectedWeekPos == "Oldest"
								? "opacity-60 select-none pointer-events-none"
								: ""
						}`}
					>
						<SVGLeftArrowKey fill={svgFill} size={"24"} />
					</p>
					<p className="text-center text-base font-bold">
						{data[0].weeks[selectedWeek].week}
					</p>
					<p
						onClick={() => handleChangeWeek("Add")}
						className={`${
							selectedWeekPos == "Newest"
								? "opacity-60 select-none pointer-events-none"
								: ""
						}`}
					>
						<SVGRightArrowKey fill={svgFill} size={"24"} />
					</p>
					<div className="absolute bottom-[-3px] left-[50%] translate-x-[-50%] text-[0.7rem] opacity-60">
						{`${data[0].weeks[selectedWeek].beg} - ${data[0].weeks[selectedWeek].end}`}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
