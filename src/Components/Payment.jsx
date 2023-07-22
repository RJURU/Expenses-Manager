import React from "react";

function Payment({ payment, setOpenNote, openNote, handleSetDelete }) {
    return (
        <>
            <div
                className={`grid bg-gray-600 text-center transition-[grid-template-rows] duration-500 ease-in-out ${
                    openNote == payment.key
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="w-full p-2">
                        <p
                            className=" rounded-md bg-red-600"
                            onClick={() =>
                                handleSetDelete(
                                    payment.key,
                                    `the payment of ${payment.currency}${payment.amount} to the ${payment.category} category of the ${payment.group} group`,
                                )
                            }
                        >
                            Delete
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="flex flex-row justify-evenly border-t bg-gray-600 p-2 text-center last-of-type:border-t-0"
                onClick={() => setOpenNote(payment.key)}
            >
                <div className="w-full text-left">{payment.group}</div>
                <div className="w-full">{payment.category}</div>
                <div className="w-full text-right">
                    {payment.currency + payment.amount}
                </div>
            </div>
        </>
    );
}

export default Payment;
