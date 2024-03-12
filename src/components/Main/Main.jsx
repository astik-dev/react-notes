import classes from "./Main.module.scss";
import NoteEditor from "../NoteEditor/NoteEditor";
import NoteList from "../NoteList/NoteList";

const Main = ({notesLength, searchedNotes, setNotes, openModalNoteEditor}) => {
    
    return (
        <main className={classes.main + " container"}>
            <NoteEditor mode="creator" {...{setNotes}} />
            <NoteList {...{notesLength, searchedNotes, setNotes, openModalNoteEditor}} />
        </main>
    )
};

export default Main;
