import React, { useState, useEffect } from "react";
import { SVGLeftArrowKey, SVGRightArrowKey } from "../Icons/index.js";

function WeekSelector({ data, setSelectedWeek }) {
	const svgFill = "white";
	const svgSize = "24";

	const [selectedWeek, updateSelectedWeek] = useState(data.weeks.length - 1);
	const [selectedWeekPos, setSelectedWeekPos] = useState("Newest");

	useEffect(() => {
		if (selectedWeek == data.weeks.length - 1) {
			setSelectedWeekPos("Newest");
		} else if (selectedWeek == 0) {
			setSelectedWeekPos("Oldest");
		} else {
			setSelectedWeekPos("");
		}
		if (setSelectedWeek !== null) {
			setSelectedWeek(selectedWeek);
		}
	}, [selectedWeek]);

	const handleChangeWeek = (e) => {
		if (e == "Add" && e !== data.weeks.length - 1) {
			updateSelectedWeek(selectedWeek + 1);
		} else if (e == "Minus" && selectedWeek !== 0) {
			updateSelectedWeek(selectedWeek - 1);
		} else return;
	};

	return (
		<div className="border text-sm rounded-lg p-2.5 h-12 bg-gray-700 border-gray-100 placeholder-gray-400 text-white flex flex-row justify-between relative">
			<p
				onClick={() => handleChangeWeek("Minus")}
				className={`${
					selectedWeekPos == "Oldest"
						? "opacity-60 select-none pointer-events-none"
						: ""
				}`}
			>
				<SVGLeftArrowKey fill={svgFill} size={svgSize} />
			</p>
			<p className="text-center text-base font-bold">
				{data.weeks[selectedWeek].week}
			</p>
			<p
				onClick={() => handleChangeWeek("Add")}
				className={`${
					selectedWeekPos == "Newest"
						? "opacity-60 select-none pointer-events-none"
						: ""
				}`}
			>
				<SVGRightArrowKey fill={svgFill} size={svgSize} />
			</p>
			<div className="absolute bottom-[-3px] left-[50%] translate-x-[-50%] text-[0.7rem] opacity-60">
				{`${data.weeks[selectedWeek].beg} - ${data.weeks[selectedWeek].end}`}
			</div>
		</div>
	);
}

export default WeekSelector;
