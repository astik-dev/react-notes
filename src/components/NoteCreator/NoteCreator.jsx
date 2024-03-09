import { useEffect, useRef, useState } from "react";
import classes from "./NoteCreator.module.scss";
import { TextareaAutosize } from "@mui/base";
import Button from "../UI/Button/Button";

const NoteCreator = ({setNotes}) => {

    const formElem = useRef();
    const titleRef = useRef();
    const contentRef = useRef();

    const [isTextareaFocused, setIsTextareaFocused] = useState(false);
    const [titlePlaceholder, setTitlePlaceholder] = useState("Take a note...");

    function openNoteCreator() {
        setIsTextareaFocused(true);
        setTitlePlaceholder("Title");
    }

    function saveNote() {
        const [noteTitle, noteContent] = [titleRef.current.value.trim(), contentRef.current.value.trim()];
        
        if (noteTitle != "" || noteContent != "") {
            setNotes(prev => [...prev, {title: noteTitle, content: noteContent}]);
        }
        closeNoteCreator();
    }

    function closeNoteCreator() {
        titleRef.current.value = "";
        contentRef.current.value = "";
        setIsTextareaFocused(false);
        setTitlePlaceholder("Take a note...");
    }

    function handleClickOutside(event) {
        if (formElem.current && !formElem.current.contains(event.target)) {
            saveNote();
        }
    }

    useEffect(() => {
        if (isTextareaFocused) {
            contentRef.current.focus();
            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [isTextareaFocused]);
    
    return (
        <form 
            ref={formElem} 
            className={`${classes.noteCreator} ${isTextareaFocused ? classes.open : ""}`}
            onSubmit={e => e.preventDefault()}
        >
            <TextareaAutosize
                ref={titleRef}
                className={classes.title}
                placeholder={titlePlaceholder}
                {...(!isTextareaFocused && { onFocus: openNoteCreator })}
            />
            <TextareaAutosize
                ref={contentRef}
                className={classes.content}
                placeholder="Take a note..."
            />
            <div className={classes.btns}>
                <Button
                    style={{fontWeight: 400}}
                    onClick={closeNoteCreator}
                >
                    Delete
                </Button>
                <Button
                    onClick={saveNote}
                >
                    Close
                </Button>
            </div>
        </form>
    )
};

export default NoteCreator;
