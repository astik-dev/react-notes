import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ModalNoteEditor from "./components/ModalNoteEditor/ModalNoteEditor";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MobileContext } from "./contexts/MobileContext";

function App() {

    const mobileScreenWidth = 575.5;

    const modalRef = useRef();

    const location = useLocation();

    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes") || "[]"));
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < mobileScreenWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        if (isMobile) document.body.classList.toggle("modal-open", isModalOpen);
    }, [isModalOpen, isMobile]);

    return (
        <MobileContext.Provider value={isMobile}>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={null} />
                    <Route path="/note/:id" element={
                        <ModalNoteEditor {...{notes, setNotes, modalRef, setIsModalOpen}} />
                    } />
                </Routes> 
            </AnimatePresence>
            <Header {...{setSearchQuery}} />
            <Main notesLength={notes.length} {...{searchedNotes, setNotes}} />
        </MobileContext.Provider>
    )
}

export default App;
