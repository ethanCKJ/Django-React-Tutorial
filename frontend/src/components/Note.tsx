import "../styles/Note.css"
export type NoteType = {
    id: number;
    title: string;
    content: string;
    created_at: Date;
}
interface NoteProps{
    note: NoteType;
    onDelete: (id: number) => void;
}
export function Note({note, onDelete} : NoteProps) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-GB");
    return (
        <div className="note-container">
            <p className="note-title">
                {note.title}
                <hr></hr>
            </p>
            <p className="note-content">
                {note.content}
            </p>
            <p className="note-date">
                {formattedDate}
            </p>
            <button onClick={() => onDelete(note.id)} className="delete-button">Delete</button>
        </div>
    )
}

// export {
//     Note,
    
// }