import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SVGClose } from "../Icons";
import { ConfirmationPopUp } from "./";

function AddCategories({ data, setCategories }) {
    const [categoryGroup, setCategoryGroup] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [subCategories, setSubCategories] = useState(
        data.categories.categories,
    );
    const [categoryGroups, setCategoryGroups] = useState(
        data.categories.groups,
    );
    const [edit, toggleEdit] = useState(false);
    const [showDelete, toggleShowDelete] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState();
    const [operation, setOperation] = useState();
    const [deleteKey, setDeleteKey] = useState();
    const [type, setType] = useState();
    const [deleteName, setDeleteName] = useState();

    const handleDelete = (key, type, groupName) => {
        if (type == "group") {
            deleteCategoryGroup(key, groupName);
        } else if (type == "category") {
            deleteSubCategory(key);
        }
        toggleShowDelete(false);
        setDeleteKey();
        setType();
        setOperation();
        setDeleteMessage();
        setDeleteName();
    };

    const handleSetDelete = (key, message, type, name) => {
        setDeleteKey(key);
        setType(type);
        setOperation("delete");
        setDeleteName(name);
        setDeleteMessage(`Confirming will delete ${message}. Are you sure?`);
        if (type == "group") {
            setDeleteMessage(
                `Confirming will delete ${message}. Categories linked to this will also be deleted. Are you sure?`,
            );
        }
        toggleShowDelete(true);
    };

    const handleAddCategory = (group, category) => {
        var fixedGroupName = titleCase(group);
        var fixedCategoryName = titleCase(category);
        if (fixedGroupName !== "" && fixedCategoryName !== "") {
            var groupExists = false;
            var categoryExists = false;
            for (var i = 0; i < data.categories.groups.length; i++) {
                if (data.categories.groups[i].name === fixedGroupName) {
                    groupExists = true;
                }
            }
            for (var i = 0; i < data.categories.categories.length; i++) {
                if (data.categories.categories[i].name === fixedCategoryName) {
                    categoryExists = true;
                }
            }
            if (!groupExists) {
                handleAddCategoryGroup(fixedGroupName);
                handleAddSubCategory(fixedCategoryName, fixedGroupName);
            } else if (!categoryExists) {
                handleAddSubCategory(fixedCategoryName, fixedGroupName);
            } else {
                return;
            }
        }
    };

    useEffect(() => {
        setCategories({ groups: categoryGroups, categories: subCategories });
    }, [categoryGroups, subCategories]);

    const handleAddCategoryGroup = (groupName) => {
        if (categoryGroup !== "" || categoryGroup !== null) {
            setCategoryGroups((currentMainCategories) => {
                return [
                    ...currentMainCategories,
                    { key: uuidv4(), name: groupName },
                ];
            });
        }
        setCategoryGroup("");
    };
    const handleAddSubCategory = (categoryName, groupName) => {
        setSubCategories((currentSubCategories) => {
            return [
                ...currentSubCategories,
                {
                    key: uuidv4(),
                    name: categoryName,
                    group: groupName,
                },
            ];
        });
        setSubCategory("");
    };

    function titleCase(str) {
        var newStr = str.trim();
        var splitStr = newStr.split(" ");
        for (var i = 0; i < splitStr.length; i++) {
            if (splitStr[i].charAt(0) == "(") {
                splitStr[i].toLowerCase();
                splitStr[i] =
                    splitStr[i].charAt(0) +
                    splitStr[i].charAt(1).toUpperCase() +
                    splitStr[i].substring(2);
            } else if (splitStr[i].charAt(0) == ".") {
                splitStr[i];
                splitStr[i] = splitStr[i].charAt(1) + splitStr[i].substring(2);
            } else {
                splitStr[i].toLowerCase();
                splitStr[i] =
                    splitStr[i].charAt(0).toUpperCase() +
                    splitStr[i].substring(1);
            }
        }
        return splitStr.join(" ");
    }

    const deleteSubCategory = (key) => {
        setSubCategories((currentSubCategories) => {
            return currentSubCategories.filter(
                (category) => category.key !== key,
            );
        });
    };
    const deleteCategoryGroup = (key, groupName) => {
        setCategoryGroups((currentCategoryGroups) => {
            return currentCategoryGroups.filter((group) => group.key !== key);
        });
        setSubCategories((currentSubCategories) => {
            return currentSubCategories.filter(
                (category) => category.group !== groupName,
            );
        });
    };
    useEffect(() => {
        if (categoryGroups.length < 1) {
            toggleEdit(false);
        }
    }, [categoryGroups]);
    return (
        <>
            <h2 className="p-2.5 pt-0 text-center text-lg">Group</h2>
            <div className="mx-auto flex w-10/12 flex-col gap-3">
                <div className="flex h-12 w-full flex-row rounded-lg border border-gray-100 bg-gray-700 p-2.5 text-lg text-white placeholder-gray-400">
                    <input
                        className="w-full bg-transparent outline-none"
                        onChange={(e) => setCategoryGroup(e.target.value)}
                        value={categoryGroup}
                    />
                </div>
            </div>
            <h2 className="p-2.5 text-center text-lg">Category</h2>
            <div className="mx-auto flex w-10/12 flex-col gap-3">
                <div className="flex h-12 w-full flex-row rounded-lg border border-gray-100 bg-gray-700 p-2.5 text-lg text-white placeholder-gray-400">
                    <input
                        className="w-full bg-transparent outline-none"
                        onChange={(e) => setSubCategory(e.target.value)}
                        value={subCategory}
                    />
                </div>
                <p className="mx-auto w-11/12 select-none rounded-sm bg-gray-500 p-1 text-center text-tiny opacity-40">
                    Start name with a ' . ' to preserve capitalization
                </p>
                <div className="mx-auto flex w-10/12 flex-col items-center gap-3">
                    <p
                        className={`w-full rounded-md bg-green-400 p-2 text-center ${
                            categoryGroup.trim() == "" ||
                            subCategory.trim() == ""
                                ? "pointer-events-none select-none opacity-70"
                                : ""
                        }`}
                        onClick={() =>
                            handleAddCategory(categoryGroup, subCategory)
                        }
                    >
                        Add
                    </p>
                </div>
                <div className="mx-auto flex w-10/12 flex-col items-center gap-3">
                    <p
                        className={`w-full rounded-md bg-blue-400 p-2 text-center ${
                            categoryGroups.length < 1
                                ? "pointer-events-none opacity-50"
                                : ""
                        }`}
                        onClick={() => toggleEdit(!edit)}
                    >
                        {edit ? "Cancel" : "Remove"}
                    </p>
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
                {categoryGroups.map((group) => {
                    return (
                        <div
                            key={group.key}
                            className="mx-auto w-10/12 rounded-lg border border-gray-100 bg-gray-700 p-2.5 text-center text-lg text-white"
                        >
                            <h2 className="relative border-b-2 text-xl outline-none">
                                {group.name}
                                {edit && (
                                    <>
                                        <span
                                            className="absolute right-3 top-[10px] block h-fit w-fit translate-y-[-50%] rounded-md bg-red-400"
                                            onClick={() =>
                                                handleSetDelete(
                                                    group.key,
                                                    group.name + " group",
                                                    "group",
                                                    group.name,
                                                )
                                            }
                                        >
                                            <SVGClose
                                                fill={"white"}
                                                size={"24"}
                                            />
                                        </span>
                                    </>
                                )}
                            </h2>
                            <div className="mt-2 flex flex-col gap-2">
                                {subCategories.map((cat) => {
                                    if (cat.group == group.name) {
                                        return (
                                            <div key={cat.key}>
                                                <p className="relative rounded-md bg-gray-600 p-1 outline-none">
                                                    {cat.name}
                                                    {edit && (
                                                        <>
                                                            <span
                                                                className="absolute right-3 top-1/2 block h-fit w-fit translate-y-[-50%] rounded-md bg-red-400"
                                                                onClick={() =>
                                                                    handleSetDelete(
                                                                        cat.key,
                                                                        cat.name +
                                                                            " category from the " +
                                                                            group.name +
                                                                            " group",
                                                                        "category",
                                                                        group.name,
                                                                    )
                                                                }
                                                            >
                                                                <SVGClose
                                                                    fill={
                                                                        "white"
                                                                    }
                                                                    size={"24"}
                                                                />
                                                            </span>
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <ConfirmationPopUp
                showPopUp={showDelete}
                toggleShowPopUp={toggleShowDelete}
                targetKey={deleteKey}
                func={handleDelete}
                type={type}
                message={deleteMessage}
                opperation={operation}
                groupName={deleteName}
            />
        </>
    );
}

export default AddCategories;
