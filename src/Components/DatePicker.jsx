import React, { useEffect, useState } from "react";

function DatePicker({ setNewStartDate }) {
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [date, setDate] = useState("2023-04-03");

    const handleSetDay = (e) => {
        if (e <= 0) {
            setDay(1);
        } else if (e > new Date(year, month, 0).getDate()) {
            setDay(new Date(year, month, 0).getDate());
        } else {
            setDay(e);
        }
    };
    const handleSetMonth = (e) => {
        if (e <= 0) {
            setMonth(1);
        } else if (e > 12) {
            setMonth(12);
        } else {
            setMonth(e);
        }
    };
    const handleSetYear = (e) => {
        if (e <= 1959) {
            setYear(1960);
        } else if (e > new Date().getFullYear()) {
            setYear(new Date().getFullYear());
        } else {
            setYear(e);
        }
    };

    const save = () => {
        let newDay = day;
        let newMonth = month;
        if (day < 10) {
            newDay = "0" + day;
        }
        if (month < 10) {
            newMonth = "0" + month;
        }
        let date = `${year}-${newMonth}-${newDay}`;
        setDate(date);
    };

    useEffect(() => {
        setNewStartDate(date);
    }, [date]);

    return (
        <>
            <div className="mx-auto flex w-10/12 flex-col gap-3">
                <div className="flex flex-row gap-3">
                    <input
                        type="number"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        onBlur={(e) => handleSetDay(e.target.value)}
                        className="flex h-12 w-3/12 min-w-[60px] flex-row rounded-lg border border-gray-100 bg-gray-700 p-2.5 text-lg text-white placeholder-gray-400"
                    />
                    <input
                        type="number"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        onBlur={(e) => handleSetMonth(e.target.value)}
                        className="flex h-12 w-3/12 min-w-[60px] flex-row rounded-lg border border-gray-100 bg-gray-700 p-2.5 text-lg text-white placeholder-gray-400"
                    />
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        onBlur={(e) => handleSetYear(e.target.value)}
                        className="flex h-12 w-6/12 min-w-[60px] flex-row rounded-lg border border-gray-100 bg-gray-700 p-2.5 text-lg text-white placeholder-gray-400"
                    />
                </div>

                <div className="mx-auto flex w-10/12 flex-col items-center gap-3">
                    <p
                        className={`w-full rounded-md bg-green-400 p-2 text-center`}
                        onClick={() => save()}
                    >
                        Save
                    </p>
                </div>
            </div>
        </>
    );
}

export default DatePicker;
