import { useEffect, useState } from "react";
import { AddCategories, ExchangeRate, DataManager } from "../Components";

function Options({ data, setCategories, setOptions, setConversion }) {
    return (
        <>
            <ExchangeRate data={data} func={setConversion} />
            <div className="mx-auto my-6 w-11/12 border-b opacity-60"></div>
            <AddCategories data={data} setCategories={setCategories} />
            <div className="mx-auto my-6 w-11/12 border-b opacity-60"></div>
            <DataManager data={data} />
        </>
    );
}

export default Options;
