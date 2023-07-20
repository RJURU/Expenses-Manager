import React, { useState, useEffect } from "react";
import { SVGLeftArrowKey, SVGRightArrowKey } from "../Icons";

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
        if (e == "Add" && selectedWeekPos !== "Newest") {
            updateSelectedWeek(selectedWeek + 1);
        } else if (e == "Minus" && selectedWeekPos !== "Oldest") {
            updateSelectedWeek(selectedWeek - 1);
        } else return;
    };

    return (
        <div className="relative flex h-12 flex-row justify-between rounded-lg border border-gray-100 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400">
            <p
                onClick={() => handleChangeWeek("Minus")}
                className={`${
                    selectedWeekPos == "Oldest"
                        ? "pointer-events-none select-none opacity-60"
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
                        ? "pointer-events-none select-none opacity-60"
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
