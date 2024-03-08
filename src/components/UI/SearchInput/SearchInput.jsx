import { useState } from "react";
import classes from "./SearchInput.module.scss";

const SearchInput = (props) => {

    const [inputValue, setInputValue] = useState("");

    function handleInputChange (event) {
        setInputValue(event.target.value);
    }

    return (
        <div className={classes.searchInput}>
            <img 
                src="/search.svg" 
                alt="Search" 
                className={classes.searchIcon} 
            />
            <input
                type="text" 
                placeholder={props.placeholder}
                value={inputValue}
                onChange={handleInputChange}
            />
            <button 
                className={`${classes.btnClose} ${!Boolean(inputValue) && classes.hidden}`}
                onClick={() => setInputValue("")}
            >
                <img 
                    src="/cross.svg" 
                    alt="Close" 
                />
            </button>
        </div>
    )
};

export default SearchInput;
