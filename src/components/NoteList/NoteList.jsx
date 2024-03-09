import { useMemo, useState } from "react";
import NoteItem from "../NoteItem/NoteItem";
import classes from "./NoteList.module.scss";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const NoteList = () => {

    const [notes, setNotes] = useState([
        {title: "Note Title", content: "Lorem ipsum dolor sit amet conillum officia voluptatibus dolorum reprehenderit commodi natus maiores, minus iusto provident deleniti doloribus odit sunt libero. Eligendi, ex."},
    ]);

    const masonryColumnsBreakPoints = useMemo(() => {
        const result = {0: 2};
        for (let i = 0; i < 20; i++) {
            result[576 + 300 * i] = i + 3;
        }
        return result;
    }, []);

    return (
        <div className={classes.noteList}>
            {notes.length
                ?
                <ResponsiveMasonry columnsCountBreakPoints={masonryColumnsBreakPoints}>
                    <Masonry gutter="10px">
                        {notes.map((note, index) => 
                            <NoteItem
                                key={index}
                                title={note.title}
                                content={note.content}
                                deleteFunc={() => setNotes(notes.filter((n, i) => i !== index))}
                            />
                        )}
                    </Masonry>
                </ResponsiveMasonry>
                :
                <div className={classes.empty}>
                    <img src="/note.svg" alt="Note icon" />
                    <p>Notes you add appear here</p>
                </div>
            }
        </div>
    )
};

export default NoteList;
