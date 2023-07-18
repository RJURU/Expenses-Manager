import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddCategories({ data, setCategories }) {
	const [categoryGroup, setCategoryGroup] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [subCategories, setSubCategories] = useState(
		data.categories.categories
	);
	const [categoryGroups, setCategoryGroups] = useState(
		data.categories.groups
	);

	const handleAddCategory = (group, category) => {
		var groupExists = false;
		var i;
		for (i = 0; i < data.categories.groups.length; i++) {
			if (data.categories.groups[i].name === group) {
				groupExists = true;
			}
		}
		console.log(groupExists);
		if (groupExists) {
			console.log("exists");
			handleAddSubCategory(category, group);
		} else {
			console.log("Notexists");
			handleAddCategoryGroup(group);
			handleAddSubCategory(category, group);
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
				{ key: uuidv4(), name: categoryName, group: groupName },
			];
		});
		setSubCategory("");
	};
	return (
		<>
			<h2 className="text-lg p-2.5 text-center">Group</h2>
			<div className="w-10/12 mx-auto flex flex-col gap-3">
				<div className="border h-12 text-lg w-full rounded-lg p-2.5 bg-gray-700 border-gray-100 placeholder-gray-400 text-white flex flex-row">
					<input
						className="bg-transparent outline-none w-full"
						onChange={(e) => setCategoryGroup(e.target.value)}
						value={categoryGroup}
					/>
				</div>
			</div>
			<h2 className="text-lg p-2.5 text-center">Category</h2>
			<div className="w-10/12 mx-auto flex flex-col gap-3">
				<div className="border h-12 text-lg w-full rounded-lg p-2.5 bg-gray-700 border-gray-100 placeholder-gray-400 text-white flex flex-row">
					<input
						className="bg-transparent outline-none w-full"
						onChange={(e) => setSubCategory(e.target.value)}
						value={subCategory}
					/>
				</div>
				<div className="w-10/12 mx-auto flex flex-col gap-3 items-center">
					<p
						className={`bg-green-400 p-2 rounded-md w-full text-center ${
							categoryGroup == "" || subCategory == ""
								? "select-none pointer-events-none opacity-70"
								: ""
						}`}
						onClick={() =>
							handleAddCategory(
								categoryGroup.trim(),
								subCategory.trim()
							)
						}
					>
						Add
					</p>
				</div>
			</div>

			{categoryGroups.map((group) => {
				return (
					<div
						key={group.key}
						className="border text-lg w-10/12 mx-auto rounded-lg p-2.5 bg-gray-700 border-gray-100 text-white text-center"
					>
						<h2 className="text-xl underline">{group.name}</h2>
						{subCategories.map((cat) => {
							if (cat.group == group.name) {
								return <p key={cat.key}>{cat.name}</p>;
							}
						})}
					</div>
				);
			})}
		</>
	);
}

export default AddCategories;
