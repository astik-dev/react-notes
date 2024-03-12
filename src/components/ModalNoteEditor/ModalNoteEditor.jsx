import classes from "./ModalNoteEditor.module.scss";
import NoteEditor from "../NoteEditor/NoteEditor";
import { useRef } from "react";

const ModalNoteEditor = ({setNotes, noteToEdit, closeModalNoteEditor}) => {
    
    const modalRef = useRef();

    return (
        <div className={classes.modalNoteEditor} ref={modalRef}> 
            <NoteEditor mode="editor" {...{setNotes, noteToEdit, closeModalNoteEditor, modalRef}} />
        </div>
    )
};

export default ModalNoteEditor;
