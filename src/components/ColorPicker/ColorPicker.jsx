import { useContext, forwardRef } from "react";
import classes from "./ColorPicker.module.scss";
import { MobileContext } from "../../contexts/MobileContext";
import { ColorPickerContext } from "../../contexts/ColorPickerContext";

const colors = [
    "202124", "77172e", "692b17", "7c4a03",
    "264d3b", "0c625d", "256377", "284255",
    "472e5b", "6c394f", "4b443a", "232427",
]

const ColorPicker = forwardRef(({selectedColor}, ref) => {

    const isMobile = useContext(MobileContext);
    const {selectColor} = useContext(ColorPickerContext);

    return (
        <div className={classes.сolorPicker} ref={ref}>
            {isMobile && <p>Color</p>}
            <div className={classes.colors}>
                {colors.map(color => 
                    <button
                        key={color}
                        className={`${classes.color} ${color == selectedColor ? classes.active : ""}`}
                        style={{background: "#"+color}}
                        onClick={() => selectColor(color)}
                    />
                )}
            </div>
        </div>
    )
});

export default ColorPicker;
