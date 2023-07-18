import React, { useState, useEffect } from "react";

function Home() {
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
	return (
		<div className="h-[calc(100%-7rem)] flex flex-col justify-center">
			<div className="flex flex-col items-center gap-8">
				<div className="flex flex-row gap-4">
					<div className="h-full w-20 flex flex-row bg-gray-700 border border-gray-100 rounded-lg overflow-hidden text-center">
						<div
							className={`w-6/12 h-full flex items-center ${
								currency == "£" ? "bg-slate-400" : ""
							}`}
							onClick={() => setCurrency("£")}
						>
							<p className="w-full">£</p>
						</div>
						<div
							className={`w-6/12 h-full flex items-center ${
								currency == "€" ? "bg-slate-400" : ""
							}`}
							onClick={() => setCurrency("€")}
						>
							<p className="w-full">€</p>
						</div>
					</div>
					<input
						placeholder="0.00"
						value={amount}
						onChange={(e) => handleSetAmount(e.target.value)}
						className="border w-10/12 text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-100 placeholder-gray-400 text-white"
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
