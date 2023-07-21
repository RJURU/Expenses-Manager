import React, { useEffect, useState } from "react";

function SelectorPopUp({ showPopUp, toggleShowPopUp, selected, func, data }) {
    useEffect(() => {
        if (showPopUp == true) {
            document.getElementById("modalDialog").showModal();
        } else {
            document.getElementById("modalDialog").close();
        }
    }, [showPopUp]);
    const [categories] = useState(data.categories);

    const handleCategorySelect = (e) => {
        func(e);
        toggleShowPopUp(false);
    };

    return (
        <dialog
            id="modalDialog"
            className="absolute z-50 mx-auto w-10/12 rounded-lg border border-gray-100 bg-gray-700  p-2.5 text-center text-lg text-white outline-none"
        >
            <div className="flex flex-col gap-6">
                {categories.groups.map((group) => {
                    return (
                        <div key={group.key} className="flex flex-col gap-3">
                            <div className="border-b">
                                <h2 className="pb-0 text-2xl font-bold">
                                    {group.name}
                                </h2>
                            </div>
                            {categories.categories.map((category) => {
                                if (category.group == group.name) {
                                    return (
                                        <div
                                            key={category.key}
                                            className={`w-full rounded-md p-1 ${
                                                selected == category.name
                                                    ? "bg-green-400"
                                                    : "bg-slate-600"
                                            } `}
                                            onClick={() =>
                                                handleCategorySelect(
                                                    category.name,
                                                )
                                            }
                                        >
                                            {category.name}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    );
                })}
            </div>
        </dialog>
    );
}

export default SelectorPopUp;
