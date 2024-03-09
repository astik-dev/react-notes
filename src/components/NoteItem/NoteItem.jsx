import classes from "./NoteItem.module.scss";

const NoteItem = ({title, content, deleteNote}) => {

    return (
        <div className={classes.noteItem}>
            {Boolean(title) && <h1>{title}</h1>}
            {Boolean(content) && <p>{content}</p>}
            <div className={classes.btns}>
                <button onClick={deleteNote}>
                    <img src="/trash.svg" alt="Delete" />
                </button>
            </div>
        </div>
    )
};

export default NoteItem;
