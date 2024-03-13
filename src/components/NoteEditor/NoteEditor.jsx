import { useEffect, useRef, useState } from "react";
import classes from "./NoteEditor.module.scss";
import { TextareaAutosize } from "@mui/base";
import Button from "../UI/Button/Button";

const NoteEditor = ({mode, setNotes, noteToEdit, closeModalNoteEditor, modalRef, isMobile}) => {

    const isEditor = mode === "editor";
    const isCreator = mode === "creator";

    const formRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();

    const [isTextareaFocused, setIsTextareaFocused] = useState(isEditor);
    const [titlePlaceholder, setTitlePlaceholder] = useState("Take a note...");

    function openEditor() {
        setIsTextareaFocused(true);
        setTitlePlaceholder("Title");
    }
    function closeEditor() {
        titleRef.current.value = "";
        contentRef.current.value = "";
        if (isCreator) {
            setIsTextareaFocused(false);
            setTitlePlaceholder("Take a note...");
        }
        if (isEditor) closeModalNoteEditor();
    }

    function createNote(title, content) {
        setNotes(prev => {
            const id = Date.now();
            return [...prev, {id, title, content}];
        });
    }
    function editNote(title, content) {
        setNotes(prev => {
            return prev.map(note => {
                if (note.id == noteToEdit.id) {
                    return {...note, title, content}
                }
                return note;
            });
        });
    }
    function deleteNote() {
        setNotes(prev => prev.filter(note => note.id != noteToEdit.id));
        closeEditor();
    }
    function saveNote() {
        const [title, content] = [titleRef.current.value.trim(), contentRef.current.value.trim()];
        closeEditor();
        if (title == "" && content == "") return;
        if (isCreator || !noteToEdit) {
            createNote(title, content)
        } else if (isEditor) {
            editNote(title, content);
        }
    }

    function handleClickOutside(event) {
        if (
            (isCreator && formRef.current && !formRef.current.contains(event.target)) ||
            (isEditor && event.target == modalRef.current)
        ) {
            saveNote();
        }
    }

    const preventDefaultAndExecute = (func) => (event) => {
        event.preventDefault();
        func();
    };

    useEffect(() => {
        if (isTextareaFocused) {
            if (!isMobile) {
                contentRef.current.focus();
                document.addEventListener("click", handleClickOutside);
            }
            window.addEventListener("beforeunload", saveNote);
            return () => {
                if (!isMobile) document.removeEventListener('click', handleClickOutside);
                window.removeEventListener("beforeunload", saveNote);
            };
        }
        
    }, [isTextareaFocused]);

    useEffect(() => {
        if (isEditor && noteToEdit) {
            titleRef.current.value = noteToEdit.title;
            contentRef.current.value = noteToEdit.content;
        }
    }, []);
    
    return (
        <form
            ref={formRef}
            className={`${classes.noteEditor} ${isTextareaFocused ? classes.open : ""} ${classes[mode]}`}
            onSubmit={e => e.preventDefault()}
            onClick={e => e.stopPropagation()}
        >
            <div
                className={classes.textareas}
                {...(isMobile && {onClick: () => contentRef.current.focus()})}
            >
                <TextareaAutosize
                    ref={titleRef}
                    className={classes.title}
                    placeholder={isEditor ? "Title" : titlePlaceholder}
                    {...(!isTextareaFocused && { onFocus: openEditor })}
                    {...(isMobile && {onClick: e => e.stopPropagation()})}
                />
                <TextareaAutosize
                    ref={contentRef}
                    className={classes.content}
                    placeholder="Take a note..."
                />
            </div>
            <div className={classes.btns}>
                <Button
                    style={{fontWeight: 400}}
                    onClick={preventDefaultAndExecute(isCreator || !noteToEdit ? closeEditor : deleteNote)}
                >
                    Delete
                </Button>
                <Button onClick={preventDefaultAndExecute(saveNote)} >
                    Close
                </Button>
            </div>
        </form>
    )
};

export default NoteEditor;
