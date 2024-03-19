import { useContext, useEffect, useRef, useState } from "react";
import classes from "./NoteEditor.module.scss";
import { TextareaAutosize } from "@mui/base";
import Button from "../UI/Button/Button";
import { motion } from "framer-motion";
import { MobileContext } from "../../contexts/MobileContext";
import { NotesContext } from "../../contexts/NotesContext";
import BackButton from "../UI/BackButton/BackButton";

const NoteEditor = ({mode, noteToEdit, closeModalNoteEditor, modalRef}) => {

    const isEditor = mode === "editor";
    const isCreator = mode === "creator";

    const isMobile = useContext(MobileContext);
    const {createNote, editNote, deleteNote} = useContext(NotesContext);

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
        if (isCreator) {
            titleRef.current.value = "";
            contentRef.current.value = "";
            setIsTextareaFocused(false);
            setTitlePlaceholder("Take a note...");
        }
        if (isEditor) closeModalNoteEditor();
    }

    function saveNote() {
        const [title, content] = [titleRef.current.value.trim(), contentRef.current.value.trim()];
        closeEditor();
        if (title == "" && content == "") return;
        if (isCreator || noteToEdit == "new") {
            createNote(title, content);
        } else if (isEditor) {
            editNote(title, content, noteToEdit.id);
        }
    }

    function handleClickOutside(event) {
        if (
            (isCreator && formRef.current && !formRef.current.contains(event.target)) ||
            (isEditor && event.target == modalRef.current)
        ) {
            saveNote();
            document.removeEventListener('click', handleClickOutside);
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
        if (isEditor && noteToEdit != "new") {
            titleRef.current.value = noteToEdit.title;
            contentRef.current.value = noteToEdit.content;
        }
    }, []);
    
    return (
        <motion.form
            ref={formRef}
            className={`${classes.noteEditor} ${isTextareaFocused ? classes.open : ""} ${classes[mode]}`}
            onSubmit={e => e.preventDefault()}
            onClick={e => e.stopPropagation()}

            {...(isEditor && {
                initial: {scale: 0.3},
                animate: {scale: 1},
                exit: {scale: 0.3},
                transition: {duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0]},
            })}
        >
            {isMobile &&
                <div className={classes.header}>
                    <BackButton onClick={preventDefaultAndExecute(saveNote)} />
                </div>
            }
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
                    onClick={preventDefaultAndExecute(() => {deleteNote(noteToEdit?.id);closeEditor()})}
                >
                    Delete
                </Button>
                <Button onClick={preventDefaultAndExecute(saveNote)} >
                    Close
                </Button>
            </div>
        </motion.form>
    )
};

export default NoteEditor;
