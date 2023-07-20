import React, { useState, useEffect } from "react";
import { SVGEuro, SVGGBP } from "../Icons";
import { WeekSelector } from "../Components";

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
        <div className="flex h-full flex-col justify-center">
            <div className="mx-auto flex w-10/12 flex-col gap-8">
                <div className="flex flex-row gap-4">
                    <div className="flex h-full w-20 flex-row overflow-hidden rounded-lg  border border-gray-100 bg-gray-700 text-center">
                        <div
                            className={`flex h-full w-6/12 items-center ${
                                currency == "£" ? "bg-green-400" : ""
                            }`}
                            onClick={() => setCurrency("£")}
                        >
                            <p className="w-full p-1">
                                <SVGGBP fill={svgFill} size={svgSize}></SVGGBP>
                            </p>
                        </div>
                        <div
                            className={`flex h-full w-6/12 items-center ${
                                currency == "€" ? "bg-green-400" : ""
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
                        className="block h-12 w-full rounded-lg border border-gray-100 bg-gray-700 p-2.5 text-lg text-white placeholder-gray-400"
                    />
                </div>
                <WeekSelector data={data} setSelectedWeek={setSelectedWeek} />
            </div>
        </div>
    );
}

export default Home;
