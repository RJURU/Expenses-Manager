import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import { Footer, Header } from "./Components/index.js";
import { Home, Payments, Stats, Options } from "./Pages/index.js";

function App() {
    const [page, setPage] = useState("Home");
    const [conversion, setConversion] = useState(() => {
        const storedData = localStorage.getItem("RJ_Expenses_Manager_Data");
        if (storedData == null || storedData == {}) {
            return "1.16";
        }
        var tempData = JSON.parse(storedData);
        return tempData.options.conversion;
    });
    const [startDate] = useState(() => {
        const storedData = localStorage.getItem("RJ_Expenses_Manager_Data");
        if (storedData == null || storedData == {}) {
            return "2023-04-03";
        }
        var tempData = JSON.parse(storedData);
        return tempData.options.startDate;
    });
    const [options, setOptions] = useState(() => {
        const storedData = localStorage.getItem("RJ_Expenses_Manager_Data");
        if (storedData == null || storedData == {}) {
            return { startDate: startDate, conversion: conversion };
        }
        var tempData = JSON.parse(storedData);
        setConversion(tempData.options.conversion);
        return tempData.options;
    });
    const [weeks] = useState(() => {
        const from = new Date(startDate);
        const to = new Date();

        const buildDateString = (date) => {
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        };

        const increaseDays = (date, amount) =>
            new Date(date.setDate(date.getDate() + amount));

        const buildWeeks = (start, end) => {
            const tempWeeks = [];
            let current = new Date(start);
            var tempTotalWeeks = 1;
            while (current < end) {
                const beginOfWeek = new Date(
                    current.getTime() + current.getTimezoneOffset(),
                );
                let endOfWeek = increaseDays(current, 6);
                endOfWeek = new Date(
                    endOfWeek.getTime() - 1 + endOfWeek.getTimezoneOffset(),
                );

                tempWeeks.push({
                    key: uuidv4(),
                    week: "Week " + tempTotalWeeks,
                    beg: buildDateString(beginOfWeek),
                    end: buildDateString(endOfWeek),
                });
                tempTotalWeeks += 1;
                current = increaseDays(current, 1);
            }
            tempTotalWeeks - 1;
            return tempWeeks;
        };

        const tempWeeks = buildWeeks(from, to);
        return tempWeeks;
    });
    const [categories, setCategories] = useState(() => {
        const storedData = localStorage.getItem("RJ_Expenses_Manager_Data");
        if (storedData == null || storedData == {}) {
            return { groups: [], categories: [] };
        }
        var tempData = JSON.parse(storedData);
        return tempData.categories;
    });
    const [payments, setPayments] = useState(() => {
        const storedData = localStorage.getItem("RJ_Expenses_Manager_Data");
        if (storedData == null || storedData == {}) {
            return [];
        }
        var tempData = JSON.parse(storedData);
        return tempData.payments;
    });
    const [data, updateData] = useState(() => {
        const storedData = localStorage.getItem("RJ_Expenses_Manager_Data");
        if (storedData == null || storedData == {}) {
            return { weeks: weeks, categories: categories, options: options };
        }
        return JSON.parse(storedData);
    });

    useEffect(() => {
        setOptions({
            startDate: startDate,
            conversion: conversion,
        });
    }, [startDate, conversion]);

    useEffect(() => {
        let dataNew = {
            weeks: weeks,
            categories: categories,
            payments: payments,
            options: options,
        };
        updateData(dataNew);
    }, [weeks, categories, payments, options]);

    useEffect(() => {
        localStorage.setItem("RJ_Expenses_Manager_Data", JSON.stringify(data));
    }, [data]);

    return (
        <>
            <Header header={page} />
            <div
                className={`h-[calc(100%-7rem)] w-screen overflow-y-auto ${
                    page == "Options" ? "py-6" : ""
                } ${page == "Payments" || page == "Stats" ? "pt-6" : ""}`}
            >
                {page == "Home" && <Home data={data} reRoute={setPage} />}
                {page == "Payments" && <Payments data={data} />}
                {page == "Stats" && <Stats data={data} />}
                {page == "Options" && (
                    <Options
                        setCategories={setCategories}
                        data={data}
                        setOptions={setOptions}
                        setConversion={setConversion}
                    />
                )}
            </div>
            <Footer setPage={setPage} page={page} />
        </>
    );
}

export default App;
