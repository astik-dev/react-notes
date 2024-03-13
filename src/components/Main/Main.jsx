import classes from "./Main.module.scss";
import NoteEditor from "../NoteEditor/NoteEditor";
import NoteList from "../NoteList/NoteList";
import AddNoteButton from "../UI/AddNoteButton/AddNoteButton";

const Main = ({notesLength, searchedNotes, setNotes, openModalNoteEditor, isMobile}) => {

    return (
        <main className={classes.main + " container"}>
            {isMobile
                ? <AddNoteButton onClick={() => openModalNoteEditor()} />
                : <NoteEditor mode="creator" {...{setNotes}} />
            }
            <NoteList {...{notesLength, searchedNotes, setNotes, openModalNoteEditor}} />
        </main>
    )
};

export default Main;
