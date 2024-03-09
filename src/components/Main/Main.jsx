import classes from "./Main.module.scss";
import NoteCreator from "../NoteCreator/NoteCreator";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";

const Main = () => {

    const [notes, setNotes] = useState([]);
    
    return (
        <main className={classes.main + " container"}>
            <NoteCreator setNotes={setNotes} />
            <NoteList notes={notes} setNotes={setNotes} />
        </main>
    )
};

export default Main;
