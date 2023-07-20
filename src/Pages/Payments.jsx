import { useState } from "react";
import { WeekSelector } from "../Components";

function Payments({ data }) {
    const [selectedWeek, setSelectedWeek] = useState(data.weeks.length - 1);
    return (
        <>
            <div className="mx-auto w-10/12">
                <WeekSelector data={data} setSelectedWeek={setSelectedWeek} />
            </div>
        </>
    );
}

export default Payments;
