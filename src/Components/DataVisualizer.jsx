import React, { useEffect, useState } from "react";

function DataVisualizer({ data }) {
    const [totalWeeks, setTotalWeeks] = useState(() => {
        if (!!data) {
            return data.weeks.length;
        }
        return 0;
    });
    const [start, setStart] = useState(() => {
        if (!!data) {
            return data.weeks[0].beg;
        }
        return 0;
    });
    const [end, setEnd] = useState(() => {
        if (!!data) {
            return data.weeks[data.weeks.length - 1].end;
        }
        return 0;
    });
    const [conversion, setConversion] = useState(() => {
        if (!!data) {
            return data.options.conversion;
        }
        return 0;
    });
    const [groups, setGroups] = useState(() => {
        if (!!data) {
            return data.categories.groups.length;
        }
        return 0;
    });
    const [categories, setCategories] = useState(() => {
        if (!!data) {
            return data.categories.categories.length;
        }
        return 0;
    });
    const [payments, setPayments] = useState(() => {
        if (!!data) {
            return data.payments.length;
        }
        return 0;
    });

    useEffect(() => {
        if (!!data) {
            setTotalWeeks(data.weeks.length);
            setStart(data.weeks[0].beg);
            setEnd(data.weeks[data.weeks.length - 1].end);
            setConversion(data.options.conversion);
            setGroups(data.categories.groups.length);
            setCategories(data.categories.categories.length);
            setPayments(data.payments.length);
        } else {
            setTotalWeeks(0);
            setStart(0);
            setEnd(0);
            setConversion(0);
            setGroups(0);
            setCategories(0);
            setPayments(0);
        }
    }, [data]);

    return (
        <div className="flex h-full flex-col justify-evenly">
            <p>{`Weeks: ${totalWeeks}`}</p>
            <p>{`Start Date: ${start}`}</p>
            <p>{`End Date: ${end}`}</p>
            <p>{`Conversion: ${conversion}`}</p>
            <p>{`Groups: ${groups}`}</p>
            <p>{`Categories: ${categories}`}</p>
            <p>{`Payments: ${payments}`}</p>
        </div>
    );
}

export default DataVisualizer;
