import { useRef } from "react";
import classes from "./NoteItem.module.scss";
import IconButton from "../UI/IconButton/IconButton";

const NoteItem = ({openNoteEditor, deleteNote, note, openColorPicker}) => {

    const noteRef = useRef();
    const deleteBtnRef = useRef();
    const colorBtnRef = useRef();

    function getColorPickerPosition() {
        const colorPickerHeight = 84;
        const maxPositionY = window.innerHeight + window.scrollY - colorPickerHeight;
       
        const rect = noteRef.current.getBoundingClientRect();
        const positionY = rect.bottom + window.scrollY;
        const positionX = (rect.left + rect.right) / 2 + window.scrollX;
        
        return [Math.min(positionY, maxPositionY), positionX];
    }

    function handleColorClick() {
        const newColorPickerPosition = getColorPickerPosition();
        openColorPicker(note, newColorPickerPosition);
    }

    function handleDeleteClick() {
        noteRef.current.classList.add(classes.deleteAnimation);
        setTimeout(deleteNote, 150);
    }

    function handleNoteClick(event) {
        if (
            deleteBtnRef.current.contains(event.target) ||
            colorBtnRef.current.contains(event.target)
        ) return;
        openNoteEditor();
    }

    return (
        <div
            className={classes.noteItem}
            onClick={handleNoteClick}
            ref={noteRef}
            style={{background: "#"+note.color}}
        >
            {Boolean(note.title) && <h1>{note.title}</h1>}
            {Boolean(note.content) && <p>{note.content}</p>}
            <div className={classes.btns}>
                <IconButton icon="color" onClick={handleColorClick} ref={colorBtnRef} />
                <IconButton icon="delete" onClick={handleDeleteClick} ref={deleteBtnRef} />
            </div>
        </div>
    )
};

export default NoteItem;
