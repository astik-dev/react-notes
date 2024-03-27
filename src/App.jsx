import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { MobileContext } from "./contexts/MobileContext";
import { NotesContext } from "./contexts/NotesContext";
import { useNotes } from "./hooks/useNotes";
import AppRoutes from "./routes/AppRoutes";

function App() {

    const mobileScreenWidth = 575.5;

    const noteMethods = useNotes();
    const [isMobile, setIsMobile] = useState(window.innerWidth < mobileScreenWidth);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < mobileScreenWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <MobileContext.Provider value={isMobile}>
            <NotesContext.Provider value={noteMethods}>
                <AppRoutes />
                <Header />
                <Main />
            </NotesContext.Provider>
        </MobileContext.Provider>
    )
}

export default App;
