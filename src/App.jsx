import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ModalNoteEditor from "./components/ModalNoteEditor/ModalNoteEditor";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MobileContext } from "./contexts/MobileContext";
import { NotesContext } from "./contexts/NotesContext";
import { useNotes } from "./hooks/useNotes";

function App() {

    const mobileScreenWidth = 575.5;

    const location = useLocation();

    const [notes, noteMethods] = useNotes();
    const [searchQuery, setSearchQuery] = useState("");
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
        if (isMobile) {
            const isModalNoteEditorOpen = location.pathname.includes("/note/");
            document.body.classList.toggle("modal-open", isModalNoteEditorOpen);
        }
    }, [location.pathname, isMobile]);

    return (
        <MobileContext.Provider value={isMobile}>
            <NotesContext.Provider value={noteMethods}>
                <AnimatePresence>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={null} />
                        <Route path="/note/:id" element={<ModalNoteEditor />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes> 
                </AnimatePresence>
                <Header {...{setSearchQuery}} />
                <Main {...{searchedNotes}} />
            </NotesContext.Provider>
        </MobileContext.Provider>
    )
}

export default App;
