import { useCallback, useEffect, useRef, useState } from "react";

const defaultColor = "202124";

export const useColorPicker = ({changeNoteColor}) => {

    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(defaultColor);
    const [noteToChangeColor, setNoteToChangeColor] = useState();
    const [colorPickerPosition, setColorPickerPosition] = useState([0, 0]);

    const colorPickerRef = useRef();

    const openColorPicker = useCallback((note, newPosition) => {
        setIsColorPickerOpen(true);
        setNoteToChangeColor(note);
        setSelectedColor(note.color);
        setColorPickerPosition(newPosition);
    }, []);

    const selectColor = useCallback((newColor) => {
        setSelectedColor(newColor);
        const {id} = noteToChangeColor;
        changeNoteColor(id, newColor);
    }, [noteToChangeColor]);

    const closeColorPicker = useCallback(() => {
        setIsColorPickerOpen(false);
    }, []); 

    useEffect(() => {
        if (isColorPickerOpen) {
            function handleClickOutside(event) {
                if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                    closeColorPicker();
                    document.removeEventListener('click', handleClickOutside);
                }
            }
            document.addEventListener("click", handleClickOutside);
            window.addEventListener('resize', closeColorPicker);
            return () => {
                document.removeEventListener('click', handleClickOutside);
                window.removeEventListener('resize', closeColorPicker);
            }
        }
    }, [isColorPickerOpen]);

    useEffect(() => {
        if (isColorPickerOpen && colorPickerRef) {
            const [y, x] = colorPickerPosition;
            colorPickerRef.current.style.top = y + "px";
            colorPickerRef.current.style.left = x + "px";
        }
    }, [isColorPickerOpen, colorPickerPosition, colorPickerRef]);

    return [
        isColorPickerOpen,
        selectedColor,
        colorPickerRef,
        {openColorPicker, closeColorPicker, selectColor},
    ];
}
