import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ModalNoteEditor from "./components/ModalNoteEditor/ModalNoteEditor";
import { CSSTransition } from "react-transition-group";

function App() {

    const mobileScreenWidth = 575.5;

    const modalRef = useRef();

    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noteToEdit, setNoteToEdit] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [didMount, setDidMount] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mobileScreenWidth);

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
        const handleResize = () => {
            setIsMobile(window.innerWidth < mobileScreenWidth);
        };
        window.addEventListener('resize', handleResize);
        const notesFromLocalStorage = localStorage.getItem("notes");
        if (notesFromLocalStorage) setNotes(JSON.parse(notesFromLocalStorage));
        setDidMount(true);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (didMount) localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        if (isMobile) document.body.classList.toggle("modal-open", isModalOpen);
    }, [isModalOpen, isMobile]);

    return (
        <>
            <CSSTransition
                in={isModalOpen}
                nodeRef={modalRef}
                timeout={400}
                classNames="modal"
                unmountOnExit
            >
                <ModalNoteEditor
                    closeModalNoteEditor={() => setIsModalOpen(false)}
                    {...{setNotes, noteToEdit, isMobile, modalRef}}
                />
            </CSSTransition>
            <Header {...{setSearchQuery}} />
            <Main notesLength={notes.length} {...{searchedNotes, setNotes, openModalNoteEditor, isMobile}} />
        </>
    )
}

export default App;
