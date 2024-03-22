import { useCallback, useEffect, useMemo, useState } from "react";

const notesFromLocalStorage = JSON.parse(localStorage.getItem("notes")) || [];

export const useNotes = () => {
    
    const [notes, setNotes] = useState(notesFromLocalStorage);


    const createNote = useCallback((title, content, color) => {
        const id = Date.now();
        setNotes( prev => [ ...prev, {id, title, content, color} ] );
    }, []);

    const editNote = useCallback((title, content, id) => {
        setNotes(prev =>
            prev.map(note => {
                if (note.id == id) return {...note, title, content};
                return note;
            })
        );
    }, []);

    const changeNoteColor = useCallback((id, color) => {
        setNotes(prev =>
            prev.map(note => {
                if (note.id == id) return {...note, color};
                return note;
            })
        );
    }, []);

    const deleteNote = useCallback((id) => {
        setNotes(prev => prev.filter(note => note.id != id));  
    }, []);

    const findNoteById = useCallback((id) => {
        return notes.find(note => note.id == id);
    }, [notes])

    const notesLength = useMemo(() => notes.length, [notes]);


    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);


    return [
        notes,
        {
            createNote,
            editNote,
            deleteNote,
            findNoteById,
            notesLength,
            changeNoteColor
        }
    ];
}
