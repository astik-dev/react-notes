import classes from "./NoteItem.module.scss";

const NoteItem = ({title, content, editNote, deleteNote}) => {

    return (
        <div className={classes.noteItem} onClick={editNote}>
            {Boolean(title) && <h1>{title}</h1>}
            {Boolean(content) && <p>{content}</p>}
            <div className={classes.btns}>
                <button onClick={e => {e.stopPropagation();deleteNote()}}>
                    <img src="/trash.svg" alt="Delete" />
                </button>
            </div>
        </div>
    )
};

export default NoteItem;
