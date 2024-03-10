import classes from "./Header.module.scss";
import Logo from "../Logo/Logo";
import SearchInput from "../UI/SearchInput/SearchInput";

const Header = ({setSearchQuery}) => {
    
    return (
        <header className={classes.header + " container"}>
            <Logo />
            <SearchInput placeholder="Search" {...{setSearchQuery}} />
        </header>
    )
};

export default Header;
