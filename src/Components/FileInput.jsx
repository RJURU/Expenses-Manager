import React from "react";

const readJsonFile = (file) =>
    new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            if (event.target) {
                resolve(JSON.parse(event.target.result));
            }
        };

        fileReader.onerror = (error) => reject(error);
        fileReader.readAsText(file);
    });

const FileInput = ({ setSelectedFileData }) => {
    const onChange = async (event) => {
        if (event.target.files) {
            const parsedData = await readJsonFile(event.target.files[0]);

            setSelectedFileData(parsedData);
        }
    };

    return (
        <input
            className="block w-full text-sm text-gray-400
            outline-none file:mr-4 file:rounded-md file:border-0
            file:bg-blue-400 file:px-4 file:py-2
            file:text-sm file:font-semibold
            file:text-white hover:file:bg-blue-500"
            type="file"
            onChange={onChange}
        ></input>
    );
};

export default FileInput;
