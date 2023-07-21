import React, { useEffect, useState } from "react";
import { SVGDropdown } from "../Icons";
import SelectorPopUp from "./SelectorPopUp";

function CategorySelector({ data, func, allOption, selectedCategory }) {
    const [allOpt, toggleAllOpt] = useState(allOption);
    const [selected, setSelected] = useState(selectedCategory);
    const [categoriesDropdown, toggleCategoriesDropdown] = useState(false);

    useEffect(() => {
        func(selected);
    }, [selected]);
    return (
        <>
            <div
                className="relative flex h-12 flex-row justify-between rounded-lg border border-gray-100 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400"
                onClick={() => toggleCategoriesDropdown(!categoriesDropdown)}
            >
                <p className="w-full text-center text-xl font-bold">
                    {selected}
                </p>
                <div className="absolute right-2 top-1/2 translate-y-[-50%]">
                    <SVGDropdown fill={"white"} size={24} />
                </div>
            </div>
            <SelectorPopUp
                showPopUp={categoriesDropdown}
                toggleShowPopUp={toggleCategoriesDropdown}
                func={setSelected}
                selected={selected}
                data={data}
            />
        </>
    );
}

export default CategorySelector;
