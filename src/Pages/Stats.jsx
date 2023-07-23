import { useEffect, useState } from "react";
import { WeekSelector } from "../Components";

function Stats({ data }) {
    const [selectedWeek, setSelectedWeek] = useState(data.weeks.length - 1);
    const [weekSelector, setWeekSelector] = useState(false);

    const [totalPounds, setTotalPounds] = useState(0);
    const [totalEuros, setTotalEuros] = useState(0);
    const [total, setTotal] = useState(totalPounds + totalEuros);

    useEffect(() => {
        var totalPounds = 0;
        var totalEuros = 0;
        var total = 0;

        if (weekSelector) {
            let selectedWeekPayments = data.payments.filter(
                (payment) => payment.week == data.weeks[selectedWeek].week,
            );

            for (var i = 0; i < selectedWeekPayments.length; i++) {
                if (selectedWeekPayments[i].currency == "£") {
                    totalPounds =
                        parseFloat(totalPounds) +
                        parseFloat(selectedWeekPayments[i].amount);
                } else {
                    totalEuros =
                        parseFloat(totalEuros) +
                        parseFloat(selectedWeekPayments[i].amount);
                }
            }

            setTotalPounds(totalPounds.toFixed(2));
            setTotalEuros(totalEuros.toFixed(2));
            let eurosToPounds =
                parseFloat(totalEuros) / data.options.conversion;
            total = parseFloat(totalPounds) + parseFloat(eurosToPounds);
            setTotal(total.toFixed(2));
        } else {
            for (var i = 0; i < data.payments.length; i++) {
                if (data.payments[i].currency == "£") {
                    totalPounds =
                        parseFloat(totalPounds) +
                        parseFloat(data.payments[i].amount);
                } else {
                    totalEuros =
                        parseFloat(totalEuros) +
                        parseFloat(data.payments[i].amount);
                }
            }
            setTotalPounds(totalPounds.toFixed(2));
            setTotalEuros(totalEuros.toFixed(2));
            let eurosToPounds =
                parseFloat(totalEuros) / data.options.conversion;
            total = parseFloat(totalPounds) + parseFloat(eurosToPounds);
            setTotal(total.toFixed(2));
        }
    }, [data, weekSelector, selectedWeek]);

    return (
        <>
            <div className="mx-auto flex w-10/12 flex-col gap-2">
                <div className="flex flex-row">
                    <p
                        className={`w-full rounded-l-md border border-r-0 border-white p-2 text-center ${
                            weekSelector ? "bg-green-400" : ""
                        }`}
                        onClick={() => setWeekSelector(true)}
                    >
                        Enable
                    </p>
                    <p
                        className={`w-full rounded-r-md border border-l-0 border-white p-2 text-center ${
                            weekSelector ? "" : "bg-red-400"
                        }`}
                        onClick={() => setWeekSelector(false)}
                    >
                        Disable
                    </p>
                </div>
                <div
                    className={`${
                        weekSelector
                            ? ""
                            : "pointer-events-none select-none opacity-50"
                    }`}
                >
                    <WeekSelector
                        data={data}
                        setSelectedWeek={setSelectedWeek}
                    />
                </div>
            </div>
            <div className="mx-auto my-6 w-11/12 border-b opacity-60"></div>
            <div className="mx-auto mb-6 flex w-10/12 flex-col gap-6">
                <div className="flex w-full flex-col gap-3 rounded-md bg-slate-800 p-2">
                    <p className="text-center text-xl uppercase">Totals</p>
                    <div className="flex flex-row justify-evenly gap-3">
                        <div className="flex w-full flex-col">
                            <p className="text-center text-sm">Pounds</p>
                            <p className="w-full rounded-md bg-slate-900 p-2 text-center text-xl">{`${totalPounds}`}</p>
                        </div>
                        <div className="flex w-full flex-col">
                            <p className="text-center text-sm">Euros</p>
                            <p className="w-full rounded-md bg-slate-900 p-2 text-center text-xl">{`${totalEuros}`}</p>
                        </div>
                    </div>
                    <div className="flex w-full flex-col">
                        <p className="text-center text-sm">Overall</p>
                        <p className="w-full rounded-md bg-slate-900 p-2 text-center text-xl">{`£${total}`}</p>
                    </div>
                </div>
                {data.categories.groups.map((group) => {
                    var totalGroup = 0;
                    var payments = data.payments.filter(
                        (payment) => payment.group == group.name,
                    );
                    if (weekSelector) {
                        let newPayments = payments.filter(
                            (pay) => pay.week == data.weeks[selectedWeek].week,
                        );
                        for (var i = 0; i < newPayments.length; i++) {
                            totalGroup =
                                parseFloat(totalGroup) +
                                parseFloat(newPayments[i].amount);
                        }
                    } else {
                        for (var i = 0; i < payments.length; i++) {
                            totalGroup =
                                parseFloat(totalGroup) +
                                parseFloat(payments[i].amount);
                        }
                    }
                    return (
                        <div className="flex w-full flex-col gap-3 rounded-md bg-slate-800 p-2">
                            <p className="text-center text-xl uppercase">
                                {group.name}
                            </p>
                            <div className="flex flex-row justify-evenly gap-3">
                                <div className="flex w-full flex-col">
                                    <p className="text-center text-sm">Total</p>
                                    <p className="w-full rounded-md bg-slate-900 p-2 text-center text-xl">
                                        {`£${totalGroup.toFixed(2)}`}
                                    </p>
                                </div>
                            </div>

                            <div className="mx-auto my-2 w-11/12 border-b opacity-60"></div>
                            {data.categories.categories.map((category) => {
                                var totalCat = 0;
                                var payments = data.payments.filter(
                                    (payment) =>
                                        payment.category == category.name,
                                );
                                if (weekSelector) {
                                    let newPayments = payments.filter(
                                        (pay) =>
                                            pay.week ==
                                            data.weeks[selectedWeek].week,
                                    );
                                    for (
                                        var i = 0;
                                        i < newPayments.length;
                                        i++
                                    ) {
                                        totalCat =
                                            parseFloat(totalCat) +
                                            parseFloat(newPayments[i].amount);
                                    }
                                } else {
                                    for (var i = 0; i < payments.length; i++) {
                                        totalCat =
                                            parseFloat(totalCat) +
                                            parseFloat(payments[i].amount);
                                    }
                                }
                                if (category.group == group.name) {
                                    return (
                                        <div className="flex flex-row gap-3">
                                            <div className="flex w-6/12 items-center">
                                                <p className="w-full text-center text-sm">
                                                    {category.name}
                                                </p>
                                            </div>
                                            <p className="w-full rounded-md bg-slate-900 p-2 text-center text-xl">
                                                {`£${totalCat.toFixed(2)}`}
                                            </p>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Stats;
