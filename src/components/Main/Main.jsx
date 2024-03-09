import classes from "./Main.module.scss";
import NoteCreator from "../NoteCreator/NoteCreator";

const Main = () => {
    
    return (
        <main className={classes.main + " container"}>
            <NoteCreator />
        </main>
    )
};

export default Main;
