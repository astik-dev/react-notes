import classes from "./NoteItem.module.scss";

const NoteItem = ({title, content, deleteFunc}) => {

    return (
        <div className={classes.noteItem}>
            <h1>{title}</h1>
            <p>{content}</p>
            <div className={classes.btns}>
                <button onClick={deleteFunc}>
                    <img src="/trash.svg" alt="Delete" />
                </button>
            </div>
        </div>
    )
};

export default NoteItem;
