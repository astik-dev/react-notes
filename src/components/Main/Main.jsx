import classes from "./Main.module.scss";
import NoteCreator from "../NoteCreator/NoteCreator";
import NoteList from "../NoteList/NoteList";

const Main = ({notesLength, searchedNotes, setNotes}) => {
    
    return (
        <main className={classes.main + " container"}>
            <NoteCreator {...{setNotes}} />
            <NoteList {...{notesLength, searchedNotes, setNotes}} />
        </main>
    )
};

export default Main;
