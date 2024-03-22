import { useContext, useMemo } from "react";
import NoteItem from "../NoteItem/NoteItem";
import classes from "./NoteList.module.scss";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../../contexts/NotesContext";

const NoteList = ({searchedNotes}) => {

    const {notesLength, deleteNote} = useContext(NotesContext);

    const navigate = useNavigate();

    const masonryColumnsBreakPoints = useMemo(() => {
        const result = {0: 2};
        for (let i = 0; i < 20; i++) {
            result[576 + 300 * i] = i + 3;
        }
        return result;
    }, []);

    return (
        <div className={classes.noteList}>
            {searchedNotes.length
                ?
                <ResponsiveMasonry columnsCountBreakPoints={masonryColumnsBreakPoints}>
                    <Masonry gutter="10px">
                        {searchedNotes.map(note => 
                            <NoteItem
                                key={note.id}
                                openNoteEditor={() => navigate(`/note/${note.id}`)}
                                deleteNote={() => deleteNote(note.id)}
                                {...{note}}
                            />
                        )}
                    </Masonry>
                </ResponsiveMasonry>
                :
                <div className={classes.empty}>
                    <img src={notesLength ? "/no-note.svg" : "/note.svg"} alt="Note icon" />
                    <p>{notesLength ? "No matching notes" : "Notes you add appear here"}</p>
                </div>
            }
        </div>
    )
};

export default NoteList;
