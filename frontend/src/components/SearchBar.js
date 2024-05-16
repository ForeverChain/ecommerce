import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="search-bar">
            <input type="text" placeholder="Хайх" value={searchTerm} onChange={handleSearchChange} onKeyDown={handleKeyDown} className="search-input" />
        </div>
    );
};

export default SearchBar;
