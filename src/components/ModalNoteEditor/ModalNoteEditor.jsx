import classes from "./ModalNoteEditor.module.scss";
import NoteEditor from "../NoteEditor/NoteEditor";

const ModalNoteEditor = ({setNotes, noteToEdit, closeModalNoteEditor, isMobile, modalRef}) => {

    return (
        <div className={`${classes.modalNoteEditor} modal`} ref={modalRef}> 
            <NoteEditor mode="editor" {...{setNotes, noteToEdit, closeModalNoteEditor, modalRef, isMobile}} />
        </div>
    )
};

export default ModalNoteEditor;
