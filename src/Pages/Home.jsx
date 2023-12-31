import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { SVGAddBox, SVGEuro, SVGGBP } from "../Icons";
import { CategorySelector, WeekSelector } from "../Components";

function Home({ data, reRoute, setPayments }) {
    const svgFill = "white";
    const svgSize = "100%";

    const [amount, setAmount] = useState("");
    const [fixedAmount, setFixedAmount] = useState("");

    const [currency, setCurrency] = useState("£");
    const [selectedWeek, setSelectedWeek] = useState(data.weeks.length - 1);

    const [selectedCategory, setSelectedCategory] = useState(() => {
        if (!data.categories.categories[0]) {
            return null;
        } else {
            return data.categories.categories[0].name;
        }
    });
    const [selectedGroup, setSelectedGroup] = useState(() => {
        if (!data.categories.categories[0]) {
            return null;
        }
        return data.categories.categories[0].group;
    });
    const [canAddPayment, setCanAddPayment] = useState(false);

    const checkKey = (e) => {
        if (e.key === "e" || e.key === "+" || e.key === "-" || e.key === "E") {
            e.preventDefault();
        }
    };

    useEffect(() => {
        setFixedAmount(parseFloat(amount).toFixed(2));
    }, [amount]);

    const addPayment = () => {
        if (canAddPayment) {
            let week = data.weeks[selectedWeek].week;
            setPayments((currentPayments) => {
                return [
                    ...currentPayments,
                    {
                        key: uuidv4(),
                        currency: currency,
                        amount: fixedAmount,
                        category: selectedCategory,
                        group: selectedGroup,
                        week: week,
                    },
                ];
            });
        }
        setAmount("");
    };

    const handleSetSelectedCategory = (cat, group) => {
        setSelectedCategory(cat);
        setSelectedGroup(group);
    };

    useEffect(() => {
        if (!selectedCategory || amount == null || amount == "") {
            setCanAddPayment(false);
        } else {
            setCanAddPayment(true);
        }
    }, [amount, selectedCategory]);

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
                        onKeyDown={(e) => checkKey(e)}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block h-12 w-full rounded-lg border border-gray-100 bg-gray-700 p-2.5 text-lg text-white placeholder-gray-400"
                    />
                </div>
                {selectedCategory !== null && (
                    <CategorySelector
                        data={data}
                        allOption={false}
                        func={handleSetSelectedCategory}
                        selectedCategory={selectedCategory}
                        selectedGroup={selectedGroup}
                    />
                )}
                {selectedCategory == null && (
                    <div
                        className="relative flex h-12 flex-row justify-between rounded-lg border border-gray-100 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400"
                        onClick={() => reRoute("Options")}
                    >
                        <p className="w-full text-center text-xl font-bold">
                            Add Categories
                        </p>
                        <div className="absolute right-2 top-1/2 translate-y-[-50%] ">
                            <SVGAddBox fill={"#4ade80"} size={24} />
                        </div>
                    </div>
                )}
                <WeekSelector data={data} setSelectedWeek={setSelectedWeek} />

                <div className="mx-auto flex w-10/12 flex-col items-center gap-3">
                    <p
                        className={`w-full rounded-md bg-green-400 p-2 text-center ${
                            !canAddPayment
                                ? "pointer-events-none select-none opacity-70"
                                : ""
                        }`}
                        onClick={() => addPayment()}
                    >
                        Add Payment
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;
