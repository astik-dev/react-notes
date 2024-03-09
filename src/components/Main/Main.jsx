import classes from "./Main.module.scss";
import NoteCreator from "../NoteCreator/NoteCreator";
import NoteList from "../NoteList/NoteList";

const Main = () => {
    
    return (
        <main className={classes.main + " container"}>
            <NoteCreator />
            <NoteList />
        </main>
    )
};

export default Main;
