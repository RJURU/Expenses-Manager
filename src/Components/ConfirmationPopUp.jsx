import React, { useEffect } from "react";

function ConfirmationPopUp({
    message,
    showPopUP,
    toggleShowPopUp,
    opperation,
    targetKey,
    func,
    type,
}) {
    useEffect(() => {
        if (showPopUP == true) {
            document.getElementById("popup-modal").showModal();
        } else {
            document.getElementById("popup-modal").close();
        }
    }, [showPopUP]);

    const handleFunc = (key, func, type = "all") => {
        func(key, type);
    };

    return (
        <>
            <dialog id="popup-modal" className="absolute z-50 bg-transparent">
                <div className="block w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-700 text-lg text-white placeholder-gray-400">
                    <div className="border-b">
                        <h2 className="bg-slate-800 p-2 text-center text-xl">
                            Are you sure you want to {opperation} this?
                        </h2>
                    </div>
                    <div>
                        <p className="p-2 text-sm">{message}</p>
                    </div>
                    <div className="flex flex-row justify-evenly border-t bg-slate-800 p-2 text-xl">
                        <h2
                            className="rounded-md bg-green-500 px-2 uppercase"
                            onClick={() => handleFunc(targetKey, func, type)}
                        >
                            Confirm
                        </h2>
                        <h2
                            className="rounded-md bg-red-500 px-2 uppercase"
                            onClick={() => toggleShowPopUp(!showPopUP)}
                        >
                            Cancel
                        </h2>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default ConfirmationPopUp;
