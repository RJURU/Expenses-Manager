import { useEffect, useState } from "react";
import { ConfirmationPopUp, WeekSelector } from "../Components";
import { SVGAddBox } from "../Icons";
import { CategorySelector, Payment } from "../Components";

function Payments({ data, reRoute, setPayments, payments }) {
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
    const handleSetSelectedCategory = (cat, group) => {
        setSelectedCategory(cat);
        setSelectedGroup(group);
    };
    const [openNote, setOpenNote] = useState();

    const handleSetOpenNote = (e) => {
        if (e == openNote) {
            setOpenNote();
        } else {
            setOpenNote(e);
        }
    };

    const [showDelete, toggleShowDelete] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState();
    const [operation, setOperation] = useState();
    const [deleteKey, setDeleteKey] = useState();

    const handleSetDelete = (key, message) => {
        setDeleteKey(key);
        setOperation("delete");
        setDeleteMessage(`Confirming will delete ${message}. Are you sure?`);
        toggleShowDelete(true);
    };

    const handleDelete = (key) => {
        deletePayment(key);
        toggleShowDelete(false);
        setDeleteKey();
        setOperation();
        setDeleteMessage();
    };

    const deletePayment = (key) => {
        setPayments((currentPayments) => {
            return currentPayments.filter((payment) => payment.key !== key);
        });
    };

    return (
        <>
            <div className="mx-auto flex w-10/12 flex-col gap-6 pt-6">
                <WeekSelector data={data} setSelectedWeek={setSelectedWeek} />
                {selectedCategory !== null && (
                    <CategorySelector
                        data={data}
                        allOption={true}
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
            </div>
            <div className="mx-auto my-6 w-11/12 border-b opacity-60"></div>
            <div className="sticky left-0 top-[-1px]">
                <div className="mx-auto flex w-10/12 flex-row justify-evenly bg-slate-800 p-2 text-center">
                    <div className="w-full text-left">Group</div>
                    <div className="w-full">Category</div>
                    <div className="w-full text-right">Amount</div>
                </div>
            </div>
            <div className="mx-auto flex w-10/12 flex-col-reverse pb-6">
                <div className="hidden border-b bg-slate-600 p-2 text-center only:block last-of-type:border-b-0">
                    <div className="w-full text-center">No Payments</div>
                </div>
                {payments.map((payment) => {
                    if (payment.week == data.weeks[selectedWeek].week) {
                        if (selectedCategory == "All") {
                            return (
                                <Payment
                                    key={payment.key}
                                    payment={payment}
                                    openNote={openNote}
                                    setOpenNote={handleSetOpenNote}
                                    handleSetDelete={handleSetDelete}
                                />
                            );
                        } else {
                            if (
                                payment.group == selectedGroup &&
                                payment.category == selectedCategory
                            ) {
                                return (
                                    <Payment
                                        key={payment.key}
                                        payment={payment}
                                        openNote={openNote}
                                        setOpenNote={handleSetOpenNote}
                                        handleSetDelete={handleSetDelete}
                                    />
                                );
                            }
                        }
                    }
                })}
            </div>
            <ConfirmationPopUp
                showPopUp={showDelete}
                toggleShowPopUp={toggleShowDelete}
                targetKey={deleteKey}
                func={handleDelete}
                message={deleteMessage}
                opperation={operation}
            />
        </>
    );
}

export default Payments;
