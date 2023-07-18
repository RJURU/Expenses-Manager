import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function AddCategories() {
	const [categories, setCategories] = useState(() => {
		const storedCategories = localStorage.getItem(
			"RJ_Expenses_Manager_Categories"
		);
		if (storedCategories == null || storedCategories == []) return [];
		return JSON.parse(storedCategories);
	});

	useEffect(() => {
		localStorage.setItem(
			"RJ_Expenses_Manager_Categories",
			JSON.stringify(categories)
		);
	}, [categories]);

	const addCategory = () => {
		setCategories((currentCategories) => {
			return [
				...currentCategories,
				{
					key: uuidv4(),
					section: "One",
					category: "One-One",
				},
			];
		});
	};
	return (
		<>
			<div className="cursor-pointer block" onClick={() => addCategory()}>
				Add Category
			</div>
		</>
	);
}

export default AddCategories;
