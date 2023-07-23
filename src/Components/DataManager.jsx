import React, { useState } from "react";
import { ManageDataPopUp } from "./";

function DataManager({ data }) {
    const [showPopUp, setShowPopUp] = useState(false);

    return (
        <>
            <div className="mx-auto flex w-10/12 flex-col items-center gap-3">
                <p
                    className="w-full rounded-md bg-green-400 p-2 text-center"
                    onClick={() => {
                        setShowPopUp(!showPopUp);
                    }}
                >
                    Manage Data
                </p>
            </div>
            <ManageDataPopUp
                data={data}
                showPopUp={showPopUp}
                close={() => setShowPopUp(false)}
            />
        </>
    );
}

export default DataManager;
