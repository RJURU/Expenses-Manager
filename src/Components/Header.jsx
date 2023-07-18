import React from "react";

function Header({ header }) {
	return (
		<header className="p-2.5 text-white text-3xl text-center">
			{header}
		</header>
	);
}

export default Header;
