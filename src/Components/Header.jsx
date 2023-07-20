import React from "react";

function Header({ header }) {
    return (
        <header className="bg-slate-800 p-2.5 text-center text-3xl text-white">
            {header}
        </header>
    );
}

export default Header;
