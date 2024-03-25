import { useCallback, useContext, useEffect, useRef } from "react";
import { NotesContext } from "../contexts/NotesContext";
import { useColorPicker } from "./useColorPicker";
import { MobileContext } from "../contexts/MobileContext";

const defaultColor = "202124";

export const useNoteEditorColorPicker = ({mode, noteToEdit}, formRef) => {

    const isEditor = mode === "editor";
    const isCreator = mode === "creator";

    const isMobile = useContext(MobileContext);
    const {changeNoteColor} = useContext(NotesContext);

    const noteColorRef = useRef(noteToEdit?.color || defaultColor);

    const [
        isColorPickerOpen,
        colorPickerSelectedColor,
        colorPickerOptions,
        colorPickerRef,
        {openColorPicker, selectColor: colorPickerSelectColor},
    ] = useColorPicker(changeNoteColor);

    function getColorPickerPosition() {
        const rect = formRef.current.getBoundingClientRect();
        const positionY = rect.bottom + (isCreator ? window.scrollY : 0);
        const positionX = (rect.left + rect.right) / 2 + (isCreator ? window.scrollX : 0);
        
        if (isEditor) {
            const colorPickerHeight = isMobile ? 116 : 48;
            const maxPositionY = window.innerHeight - colorPickerHeight;
            return [
                Math.min(maxPositionY, positionY),
                isMobile ? 0 : positionX,
            ];
        }

        return [positionY, positionX];
    }

    const handleColorClick = useCallback(() => {
        const noteToChangeColor =
            noteToEdit == "new" || !noteToEdit
            ? {id: "new", color: noteColorRef.current}
            : noteToEdit;
        openColorPicker(
            noteToChangeColor,
            getColorPickerPosition(),
            {position: isEditor ? "fixed" : "absolute"}
        )
    }, [noteToEdit]);

    useEffect(() => {
        noteColorRef.current =
            isEditor && noteToEdit != "new"
            ? noteToEdit.color
            : colorPickerSelectedColor;
        formRef.current.style.background = "#"+noteColorRef.current;
    }, [colorPickerSelectedColor]);


    const colorPicker = {
        isOpen: isColorPickerOpen,
        selectedColor: colorPickerSelectedColor,
        options: colorPickerOptions,
        selectColor: colorPickerSelectColor,
        ref: colorPickerRef,
    }

    return [
        colorPicker,
        handleColorClick,
        noteColorRef,
    ];
}
