import { forwardRef } from "react";
import classes from "./IconButton.module.scss";

const IconButton = forwardRef(({icon, ...props}, ref) => {

    return (
        <button className={classes.iconButton} ref={ref} {...props}>
            {
                icon == "delete" ? <img src="/trash.svg" alt="Delete" width="17" height="17" /> :
                icon == "color" ? <img src="/color.svg" alt="Color" width="19" height="19" /> :
                ""
            }
        </button>
    )
});

export default IconButton;
