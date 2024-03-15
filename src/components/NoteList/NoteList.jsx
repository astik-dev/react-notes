import { useMemo } from "react";
import NoteItem from "../NoteItem/NoteItem";
import classes from "./NoteList.module.scss";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { useNavigate } from "react-router-dom";

const NoteList = ({notesLength, searchedNotes, setNotes}) => {

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
                                title={note.title}
                                content={note.content}
                                editNote={() => navigate(`/note/${note.id}`)}
                                deleteNote={() => setNotes(prevNotes => prevNotes.filter(prevNote => prevNote.id !== note.id))}
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
