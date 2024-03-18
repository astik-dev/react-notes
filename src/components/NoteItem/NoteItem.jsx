import { useRef } from "react";
import classes from "./NoteItem.module.scss";

const NoteItem = ({title, content, openNoteEditor, deleteNote}) => {

    const noteRef = useRef();

    function handleDeleteClick(event) {
        event.stopPropagation();
        noteRef.current.classList.add(classes.deleteAnimation);
        setTimeout(deleteNote, 150);
    }

    return (
        <div className={classes.noteItem} onClick={openNoteEditor} ref={noteRef}>
            {Boolean(title) && <h1>{title}</h1>}
            {Boolean(content) && <p>{content}</p>}
            <div className={classes.btns}>
                <button onClick={handleDeleteClick}>
                    <img src="/trash.svg" alt="Delete" />
                </button>
            </div>
        </div>
    )
};

export default NoteItem;
