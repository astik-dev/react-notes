import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ModalNoteEditor from "./components/ModalNoteEditor/ModalNoteEditor";

function App() {

    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noteToEdit, setNoteToEdit] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [didMount, setDidMount] = useState(false);

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

    function openModalNoteEditor(note) {
        setNoteToEdit(note);
        setIsModalOpen(true);
    }

    useEffect(() => {
        const notesFromLocalStorage = localStorage.getItem("notes");
        if (notesFromLocalStorage) setNotes(JSON.parse(notesFromLocalStorage));
        setDidMount(true);
    }, []);

    useEffect(() => {
        if (didMount) localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    return (
        <>
            {isModalOpen && <ModalNoteEditor closeModalNoteEditor={() => setIsModalOpen(false)} {...{setNotes, noteToEdit}} />}
            <Header {...{setSearchQuery}} />
            <Main notesLength={notes.length} {...{searchedNotes, setNotes, openModalNoteEditor}} />
        </>
    )
}

export default App;
