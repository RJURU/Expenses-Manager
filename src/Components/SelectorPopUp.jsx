import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function SelectorPopUp({
    showPopUp,
    toggleShowPopUp,
    selected,
    selectedGroup,
    func,
    data,
    allOption,
}) {
    const [selectedGroupNew, setSelectedGroup] = useState(() => {
        if (allOption) {
            return "All";
        } else {
            return selectedGroup;
        }
    });

    useEffect(() => {
        if (showPopUp == true) {
            document.getElementById("modalDialog").showModal();
        } else {
            document.getElementById("modalDialog").close();
        }
    }, [showPopUp]);
    const [categories] = useState(data.categories);

    const handleCategorySelect = (cat, group) => {
        func(cat, group);
        setSelectedGroup(group);
        toggleShowPopUp(false);
    };

    useEffect(() => {
        if (allOption) {
            func("All");
        }
    }, [allOption]);

    return (
        <dialog
            id="modalDialog"
            className="absolute z-50 mx-auto w-10/12 rounded-lg border border-gray-100 bg-gray-700  p-2.5 text-center text-lg text-white outline-none"
        >
            <div className="flex flex-col gap-6">
                {allOption && (
                    <div
                        key={uuidv4()}
                        className={`w-full rounded-md p-1 ${
                            selected == "All" ? "bg-green-400" : "bg-slate-600"
                        } `}
                        onClick={() => handleCategorySelect("All")}
                    >
                        All
                    </div>
                )}
                {categories.groups.map((group) => {
                    let groupCats = true;
                    for (var i = 0; i < categories.categories.length; i++) {
                        if (categories.categories[i].group == group.name) {
                            groupCats = true;
                            break;
                        } else {
                            groupCats = false;
                        }
                    }

                    if (groupCats == true) {
                        return (
                            <div
                                key={group.key}
                                className="flex flex-col gap-3"
                            >
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
                                                    selected == category.name &&
                                                    selectedGroupNew ==
                                                        group.name
                                                        ? "bg-green-400"
                                                        : "bg-slate-600"
                                                } `}
                                                onClick={() =>
                                                    handleCategorySelect(
                                                        category.name,
                                                        category.group,
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
                    }
                })}
            </div>
        </dialog>
    );
}

export default SelectorPopUp;
