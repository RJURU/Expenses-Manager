import React, { useState } from "react";

function ExchangeRate({ data, func }) {
    const [conv, setConv] = useState(data.options.conversion);
    const handleChangeConv = (e) => {
        setConv(e);
    };

    const save = () => {
        func(conv);
    };
    return (
        <>
            <div className="mx-auto flex w-10/12 flex-col gap-3">
                <div className="mb-[-12px] flex w-full flex-row gap-3 text-center">
                    <h2 className="w-2/12 min-w-[60px]">GBP</h2>
                    <p className="flex items-center opacity-0">=</p>
                    <h2 className="w-full min-w-[60px]">Euro</h2>
                </div>
                <div className="flex w-full flex-row gap-3 text-center">
                    <h2 className="h-12 w-2/12 min-w-[60px] rounded-lg p-2.5 text-lg">
                        1
                    </h2>
                    <p className="flex items-center">=</p>
                    <input
                        type="number"
                        value={conv}
                        onChange={(e) => handleChangeConv(e.target.value)}
                        className="h-12 w-full min-w-[60px] rounded-lg border border-gray-100 bg-gray-700 p-2.5 text-center text-lg text-white placeholder-gray-400"
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

export default ExchangeRate;
