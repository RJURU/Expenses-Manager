import { useState, useEffect } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid";

function App() {
	const [totalWeeks] = useState(calcWeeks());
	const [selectedWeek, setSelectedWeek] = useState(totalWeeks);
	const [selectedCurrency, toggleCurrency] = useState("£");
	const [inputAmount, setInputAmount] = useState("");
	const [inputAmountFixed, fixInputAmount] = useState("");
	const [selectedCategory, changeSelectedCategory] = useState("Petrol");
	const [categoryDropdownShow, toggleCategoryDropdown] = useState(false);
	const [payments, setPayments] = useState([]);
	const [paymentsEdit, togglePaymentsEdit] = useState(false);

	function calcWeeks() {
		let weekMs = 7 * 24 * 60 * 60 * 1000;
		let now = new Date().getTime();
		let yearStart = new Date("2023-04-03").getTime();
		let yearEnd = new Date("2023-04-05").getTime();
		let yearTime = now - yearStart;
		var weeks = 0;
		for (weeks; yearTime >= 0; weeks++) {
			yearTime = yearTime - weekMs;
		}
		return weeks;
	}

	const handleToggleCurrency = (e) => {
		toggleCurrency(e);
	};

	const handleSetInputAmount = (e) => {
		let newE = parseFloat(e).toFixed(2);
		setInputAmount(e);
		fixInputAmount(newE);
	};

	const handleChangeSelectedCategory = (e) => {
		changeSelectedCategory(e);
		toggleCategoryDropdown(!categoryDropdownShow);
	};

	const handleSetSelectedWeek = (e) => {
		setSelectedWeek(e);
	};
	const data = {
		cateogories: [
			{ id: "1", name: "Petrol", section: "Job" },
			{ id: "2", name: "Uniform", section: "Job" },
			{ id: "3", name: "Repair", section: "Job" },
			{ id: "4", name: "Rent", section: "Home" },
		],
		payments: payments,
	};

	const addPayment = () => {
		setInputAmount("");
		if (!inputAmount == "") {
			setPayments((currentPayments) => {
				return [
					...currentPayments,
					{
						key: uuidv4(),
						currency: selectedCurrency,
						amount: inputAmountFixed,
						category: selectedCategory,
						week: selectedWeek,
					},
				];
			});
		}
	};

	const handleDeletePayment = (key) => {
		deletePayment(key);
	};

	const deletePayment = (key) => {
		setPayments((currentPayments) => {
			return currentPayments.filter((payment) => payment.key !== key);
		});
	};

	return (
		<>
			<header className="flex flex-col gap-4">
				<div className="p-4">
					<h1 className="text-6xl text-center font-bold">Manager</h1>
				</div>
				<div className="w-10/12 mx-auto flex flex-col gap-4">
					<div className="w-full flex flex-row outline-2 outline-white outline rounded-2xl">
						<p
							onClick={() => handleToggleCurrency("£")}
							className={`block w-full text-2xl text-center p-2.5 transition-all duration-200 ease-in-out ${
								selectedCurrency == "£" ? "bg-slate-500" : ""
							}`}
						>
							£
						</p>
						<p
							onClick={() => handleToggleCurrency("€")}
							className={`block w-full text-2xl text-center p-2.5 transition-all duration-200 ease-in-out ${
								selectedCurrency == "€" ? "bg-slate-500" : ""
							}`}
						>
							€
						</p>
					</div>
					<input
						className="text-2xl w-full outline-2 outline-white outline rounded-2xl text-white bg-slate-700 p-2.5"
						placeholder="0.00"
						value={inputAmount}
						onChange={(e) => handleSetInputAmount(e.target.value)}
					/>
					<div className="relative">
						<h2
							onClick={() =>
								toggleCategoryDropdown(!categoryDropdownShow)
							}
							className="text-2xl text-center w-full outline-2 outline-white outline rounded-2xl text-white bg-slate-700 p-2.5 z-0 relative"
						>
							{selectedCategory}
							<span
								className={`absolute right-2 top-1 transition-all duration-300 ease-in-out ${
									categoryDropdownShow ? "rotate-180" : ""
								}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="48"
									height="48"
									fill="white"
									viewBox="0 -960 960 960"
								>
									<path d="M480-360 280-559h400L480-360Z" />
								</svg>
							</span>
						</h2>
						{categoryDropdownShow && (
							<div className="text-2xl text-center w-full outline-2 outline-white outline rounded-2xl text-white bg-slate-700 z-10 absolute top-[125%] max-h-96 overflow-y-auto">
								{data.cateogories.map((category) => {
									return (
										<p
											key={uuidv4()}
											onClick={() =>
												handleChangeSelectedCategory(
													category.name
												)
											}
											className={`text-2xl text-center w-full p-2.5 relative ${
												selectedCategory ==
												category.name
													? "bg-slate-500"
													: "bg-slate-700"
											}`}
										>
											{category.name}
											<span className="absolute top-2 left-2 text-xl">
												{category.section}
											</span>
										</p>
									);
								})}
							</div>
						)}
					</div>
					<div className="text-2xl text-center w-full outline-2 outline-white outline rounded-2xl text-white bg-slate-700 p-2.5 z-0 flex flex-row justify-evenly">
						<h2
							onClick={() =>
								handleSetSelectedWeek(selectedWeek - 1)
							}
							className={`${
								selectedWeek == 1
									? "pointer-events-none opacity-75"
									: ""
							}`}
						>
							&lt;
						</h2>
						<h2 className="">Week {selectedWeek}</h2>
						<h2
							onClick={() =>
								handleSetSelectedWeek(selectedWeek + 1)
							}
							className={`${
								selectedWeek == totalWeeks
									? "pointer-events-none opacity-75"
									: ""
							}`}
						>
							&gt;
						</h2>
					</div>
					<button
						onClick={() => addPayment()}
						className={`text-2xl w-full outline-2 outline-white outline rounded-2xl text-white bg-slate-700 p-2.5 ${
							inputAmount == ""
								? "opacity-75 pointer-events-none"
								: ""
						} `}
					>
						Add
					</button>
				</div>
			</header>
			<main className="flex flex-col mt-8">
				<header className="px-4 py-2 border-b-2">
					<h2 className="ml-2 text-2xl text-center">Payments</h2>
				</header>
				<div className="mb-20">
					<div className="flex flex-row p-2 items-start text-center text-2xl bg-slate-600 sticky top-0 z-50">
						<h2 className="w-6/12 p-2.5 text-left">Category</h2>
						<h2 className="w-4/12 p-2.5 text-right">Amount</h2>
						<div className="w-2/12 p-2.5 text-center"></div>
					</div>
					<div className="flex flex-col-reverse">
						{data.payments.map((payment) => {
							if (payment.week == selectedWeek) {
								return (
									<div
										key={payment.key}
										onClick={() =>
											togglePaymentsEdit(!paymentsEdit)
										}
										className="flex flex-row items-start text-left text-2xl p-2 border-b first-of-type:border-b-0"
									>
										<h2 className="w-6/12 p-2.5">
											{payment.category}
										</h2>
										<h2 className="w-4/12 p-2.5 text-right">
											{payment.currency}
											{payment.amount}
										</h2>
										<div className="w-2/12 p-2.5 text-center">
											<h2
												onClick={() =>
													handleDeletePayment(
														payment.key
													)
												}
												className="w-full text-center text-red-500 rounded-lg"
											>
												Del
											</h2>
										</div>
									</div>
								);
							}
						})}
						<h2 className="text-2xl text-center opacity-75 mt-5 hidden only:block">
							No Payments
						</h2>
					</div>
				</div>
			</main>
			<footer>
				<div className="flex flex-row text-center text-2xl p-2.5 fixed bottom-0 left-0 w-full bg-slate-500">
					<div className="w-full p-2 bg-slate-600">Home</div>
					<div className="w-full p-2">Stats</div>
					<div className="w-full p-2">Settings</div>
				</div>
			</footer>
		</>
	);
}

export default App;
