import { useState } from "react";
import { AddCategories, Footer } from "../Components/index.js";

function Options({ setStartYear, data, setCategories }) {
	return (
		<>
			<AddCategories data={data} setCategories={setCategories} />
		</>
	);
}

export default Options;
