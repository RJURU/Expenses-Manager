import React, { useState, useEffect } from "react";
import { SVGDownload, SVGUpload } from "../Icons";
import { DataVisualizer, FileInput } from "./";

function ManageDataPopUp({ data, showPopUp, close }) {
    const [selectedFileData, setSelectedFileData] = useState();
    const [selectedOpt, setSelectedOpt] = useState("Download");
    const [visualizeData, setVisualizedData] = useState(data);
    var SVGSize = "24";
    var SVGFill = "white";
    console.log(selectedFileData);

    useEffect(() => {
        if (showPopUp == true) {
            document.getElementById("FileManagerModal").showModal();
        } else {
            document.getElementById("FileManagerModal").close();
        }
    }, [showPopUp]);

    const download = () => {
        const json_data = data;
        const fileName = "expenses_manager_data.json";
        const dataBlob = new Blob([JSON.stringify(json_data)], {
            type: "text/json",
        });
        const jsonURL = window.URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.href = jsonURL;
        link.setAttribute("download", fileName);
        link.click();
        document.body.removeChild(link);
        close();
    };

    const upload = () => {
        if (!!selectedFileData) {
            localStorage.setItem(
                "RJ_Expenses_Manager_Data",
                JSON.stringify(selectedFileData),
            );
            setSelectedFileData();
            close();
        }
    };

    useEffect(() => {
        if (selectedOpt == "Download") {
            setVisualizedData(data);
        } else {
            setVisualizedData(selectedFileData);
        }
    }, [selectedOpt, selectedFileData, data]);

    return (
        <dialog
            id="FileManagerModal"
            className="absolute z-50 w-full bg-transparent outline-none"
        >
            <div className="block w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-700 text-center text-lg text-white placeholder-gray-400">
                <div className="flex w-full flex-row p-2">
                    <div
                        className={`flex w-full justify-center rounded-l-md border-2 border-r-0 border-white p-2 ${
                            selectedOpt == "Download" ? "bg-green-400" : ""
                        }`}
                        onClick={() => setSelectedOpt("Download")}
                    >
                        <SVGDownload size={SVGSize} fill={SVGFill} />
                    </div>
                    <div
                        className={`flex w-full justify-center rounded-r-md border-2 border-l-0 border-white p-2 ${
                            selectedOpt == "Upload" ? "bg-blue-400" : ""
                        }`}
                        onClick={() => setSelectedOpt("Upload")}
                    >
                        <SVGUpload size={SVGSize} fill={SVGFill} />
                    </div>
                </div>
                <div className="flex flex-col gap-3 p-2">
                    {selectedOpt == "Upload" && (
                        <FileInput setSelectedFileData={setSelectedFileData} />
                    )}
                    <div>
                        <p>Data</p>
                        <div className="h-64 w-full rounded-md bg-slate-900 p-2 text-left">
                            <DataVisualizer data={visualizeData} />
                        </div>
                    </div>
                    {selectedOpt == "Download" && (
                        <p
                            className="w-full rounded-md bg-green-400 p-2 text-center"
                            onClick={download}
                        >
                            Download
                        </p>
                    )}
                    {selectedOpt == "Upload" && (
                        <>
                            <p
                                className={`w-full rounded-md bg-blue-400 p-2 text-center ${
                                    !!selectedFileData
                                        ? ""
                                        : "pointer-events-none select-none opacity-60"
                                }`}
                                onClick={upload}
                            >
                                Upload
                            </p>

                            <p className="mx-auto w-11/12 select-none rounded-sm bg-gray-500 p-1 text-center text-tiny opacity-40">
                                Reload Page To See New Data
                            </p>
                        </>
                    )}
                    <p
                        className="w-full rounded-md bg-red-400 p-2 text-center"
                        onClick={() => close()}
                    >
                        Cancel
                    </p>
                </div>
            </div>
        </dialog>
    );
}

export default ManageDataPopUp;
