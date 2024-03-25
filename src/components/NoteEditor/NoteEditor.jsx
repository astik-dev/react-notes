import { useContext, useEffect, useRef, useState } from "react";
import classes from "./NoteEditor.module.scss";
import { TextareaAutosize } from "@mui/base";
import Button from "../UI/Button/Button";
import { motion } from "framer-motion";
import { MobileContext } from "../../contexts/MobileContext";
import { NotesContext } from "../../contexts/NotesContext";
import BackButton from "../UI/BackButton/BackButton";
import IconButton from "../UI/IconButton/IconButton";
import { useColorPicker } from "../../hooks/useColorPicker";
import { createPortal } from "react-dom";
import ColorPicker from "../ColorPicker/ColorPicker";

const defaultColor = "202124";

const NoteEditor = ({mode, noteToEdit, closeModalNoteEditor, modalRef}) => {

    const isEditor = mode === "editor";
    const isCreator = mode === "creator";

    const isMobile = useContext(MobileContext);
    const {createNote, editNote, deleteNote, changeNoteColor} = useContext(NotesContext);

    const [
        isColorPickerOpen,
        colorPickerSelectedColor,
        colorPickerOptions,
        colorPickerRef,
        {openColorPicker, selectColor: colorPickerSelectColor},
    ] = useColorPicker(changeNoteColor);

    const formRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();
    const noteColorRef = useRef(noteToEdit?.color || defaultColor);

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
        colorPickerSelectColor(defaultColor);
    }

    function saveNote() {
        const title = titleRef.current.value.trim();
        const content = contentRef.current.value.trim();
        const color = noteColorRef.current;

        closeEditor();
        if (title == "" && content == "") return;
        if (isCreator || noteToEdit == "new") {
            createNote(title, content, color);
        } else if (isEditor) {
            editNote(title, content, noteToEdit.id);
        }
    }

    function getColorPickerPosition() {
        const rect = formRef.current.getBoundingClientRect();
        const positionY = rect.bottom + (isCreator ? window.scrollY : 0);
        const positionX = (rect.left + rect.right) / 2 + (isCreator ? window.scrollX : 0);
        
        if (isEditor) {
            const colorPickerHeight = isMobile ? 116 : 48;
            const maxPositionY = window.innerHeight - colorPickerHeight;
            return [
                Math.min(maxPositionY, positionY),
                isMobile ? 0 : positionX,
            ];
        }

        return [positionY, positionX];
    }

    function handleClickOutside(event) {
        if (colorPickerRef.current && colorPickerRef.current.contains(event.target)) return;
        if (
            (isCreator && formRef.current && !formRef.current.contains(event.target)) ||
            (isEditor && event.target == modalRef.current)
        ) {
            saveNote();
            document.removeEventListener('click', handleClickOutside);
        }
    }
    
    function handleEscKey(event) {
        if (event.key == "Escape") {
            titleRef.current.blur();
            saveNote();
            document.removeEventListener("keydown", handleEscKey);
        }
    }

    function handlePopstate() {
        saveNote();
        window.removeEventListener("popstate", handlePopstate);
    }

    const preventDefaultAndExecute = (func) => (event) => {
        event.preventDefault();
        func();
    };

    function handleColorClick() {
        const noteToChangeColor =
            noteToEdit == "new" || !noteToEdit
            ? {id: "new", color: noteColorRef.current}
            : noteToEdit;
        openColorPicker(
            noteToChangeColor,
            getColorPickerPosition(),
            {position: isEditor ? "fixed" : "absolute"}
        )
    }

    useEffect(() => {
        if (isTextareaFocused) {
            if (!isMobile) {
                contentRef.current.focus();
                document.addEventListener("click", handleClickOutside);
                document.addEventListener("keydown", handleEscKey);
            }
            if (isEditor) window.addEventListener("popstate", handlePopstate);
            window.addEventListener("beforeunload", saveNote);
            return () => {
                if (!isMobile) {
                    document.removeEventListener('click', handleClickOutside);
                    document.removeEventListener("keydown", handleEscKey);
                }
                if (isEditor) window.removeEventListener("popstate", handlePopstate);
                window.removeEventListener("beforeunload", saveNote);
            };
        }
    }, [isTextareaFocused]);

    useEffect(() => {
        noteColorRef.current = isEditor && noteToEdit != "new" ? noteToEdit.color : colorPickerSelectedColor;
        formRef.current.style.background = "#"+noteColorRef.current;
    }, [colorPickerSelectedColor]);

    useEffect(() => {
        if (isEditor && noteToEdit != "new") {
            titleRef.current.value = noteToEdit.title;
            contentRef.current.value = noteToEdit.content;
        }
    }, []);

    return (
        <>
            <motion.form
                ref={formRef}
                className={`${classes.noteEditor} ${isTextareaFocused ? classes.open : ""} ${classes[mode]}`}
                onSubmit={e => e.preventDefault()}
                onClick={e => e.stopPropagation()}
                style={{background: `#${noteColorRef.current}`}}

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
                    <div className={classes.iconBtns}>
                        <IconButton
                            icon="delete"
                            onClick={preventDefaultAndExecute(() => {deleteNote(noteToEdit?.id);closeEditor()})}
                        />
                        <IconButton
                            icon="color"
                            onClick={preventDefaultAndExecute(handleColorClick)}
                        />
                    </div>
                    {!isMobile && 
                        <Button onClick={preventDefaultAndExecute(saveNote)} >
                            Close
                        </Button>
                    }
                </div>
            </motion.form>
            {isColorPickerOpen && createPortal(
                <ColorPicker
                    selectColor={colorPickerSelectColor}
                    selectedColor={colorPickerSelectedColor}
                    options={colorPickerOptions}
                    ref={colorPickerRef}
                />,
                document.body
            )}
        </>
    )
};

export default NoteEditor;
