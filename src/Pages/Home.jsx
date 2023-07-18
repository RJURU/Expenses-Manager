import React, { useState, useEffect } from "react";
import { SVGEuro, SVGGBP } from "../Icons/index.js";
import { WeekSelector } from "../Components/index.js";

function Home({ data }) {
	const svgFill = "white";
	const svgSize = "100%";

	const [amount, setAmount] = useState("");
	const [fixedAmount, setFixedAmount] = useState("");

	const [currency, setCurrency] = useState("£");
	const [selectedWeek, setSelectedWeek] = useState(data.weeks.length - 1);

	useEffect(() => {
		setFixedAmount(parseFloat(amount).toFixed(2));
	}, [amount]);

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
						type="number"
						step="0.01"
						min="0.01"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						className="border h-12 text-lg w-full rounded-lg block p-2.5 bg-gray-700 border-gray-100 placeholder-gray-400 text-white"
					/>
				</div>
				<WeekSelector data={data} setSelectedWeek={setSelectedWeek} />
			</div>
		</div>
	);
}

export default Home;
