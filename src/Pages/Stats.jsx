import { useState } from "react";
import { WeekSelector } from "../Components/index.js";

function Stats({ data }) {
	const [selectedWeek, setSelectedWeek] = useState(data.weeks.length - 1);
	return (
		<>
			<div className="w-10/12 mx-auto">
				<WeekSelector data={data} setSelectedWeek={setSelectedWeek} />
			</div>
		</>
	);
}

export default Stats;
