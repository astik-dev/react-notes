import classes from "./ModalNoteEditor.module.scss";
import NoteEditor from "../NoteEditor/NoteEditor";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const ModalNoteEditor = ({notes, setNotes, modalRef, setIsModalOpen}) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const noteToEdit = id == "new"
        ? "new"
        : notes.find(note => note.id == id);

    useEffect(() => {
        if (!noteToEdit) navigate("/");
        else setIsModalOpen(true);
    }, []);

    if (!noteToEdit) return null;

    function closeModal() {
        navigate("/", {replace: noteToEdit == "new"});
        setIsModalOpen(false);
    }

    return (
        <motion.div
            className={classes.modalNoteEditor}
            ref={modalRef}

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0]}}
        > 
            <NoteEditor
                mode="editor"
                closeModalNoteEditor={closeModal}
                {...{setNotes, noteToEdit, modalRef}}
            />
        </motion.div>
    )
};

export default ModalNoteEditor;
