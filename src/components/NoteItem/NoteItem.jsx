import { useRef, useContext } from "react";
import classes from "./NoteItem.module.scss";
import { ColorPickerContext } from "../../contexts/ColorPickerContext";

const NoteItem = ({openNoteEditor, deleteNote, note}) => {

    const {openColorPicker, closeColorPicker} = useContext(ColorPickerContext);

    const noteRef = useRef();

    function getColorPickerPosition() {
        const rect = noteRef.current.getBoundingClientRect();
        const positionY = rect.bottom + window.scrollY;
        const positionX = (rect.left + rect.right) / 2 + window.scrollX;
        return [positionY, positionX];
    }

    function handleColorClick(event) {
        event.stopPropagation();
        const newColorPickerPosition = getColorPickerPosition();
        openColorPicker(note, newColorPickerPosition);
    }

    function handleDeleteClick(event) {
        event.stopPropagation();
        closeColorPicker();
        noteRef.current.classList.add(classes.deleteAnimation);
        setTimeout(deleteNote, 150);
    }

    return (
        <div
            className={classes.noteItem}
            onClick={openNoteEditor}
            ref={noteRef}
            style={{background: "#"+note.color}}
        >
            {Boolean(note.title) && <h1>{note.title}</h1>}
            {Boolean(note.content) && <p>{note.content}</p>}
            <div className={classes.btns}>
                <button onClick={handleColorClick}>
                    <img src="/color.svg" alt="Color" width="19" height="19" />
                </button>
                <button onClick={handleDeleteClick}>
                    <img src="/trash.svg" alt="Delete" width="17" height="17" />
                </button>
            </div>
        </div>
    )
};

export default NoteItem;
