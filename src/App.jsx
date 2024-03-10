import { useMemo, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {

    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const searchedNotes = useMemo(() => {
        
        if (!searchQuery) return notes;
        
        const lowerSearchQuery = searchQuery.toLowerCase();
        
        return notes.filter(({title, content}) => {
            return (
                title.toLowerCase().includes(lowerSearchQuery) ||
                content.toLowerCase().includes(lowerSearchQuery)
            );
        });
    }, [notes, searchQuery]);

    return (
        <>
            <Header {...{setSearchQuery}} />
            <Main notesLength={notes.length} {...{searchedNotes, setNotes}} />
        </>
    )
}

export default App;
