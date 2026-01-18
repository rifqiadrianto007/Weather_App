// import { useState } from "react";

export default function SearchBar({ onSearch }) {
    return (
        <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
                type="text"
                placeholder="Search city"
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSearch(e.target.value);
                }}
            />
        </div>
    );
}

