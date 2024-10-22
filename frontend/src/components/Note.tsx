import "../styles/Note.css"
import { useState } from "react";
import api from "../api";
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
    const [newTitle, setNewTitle] = useState(note.title)
    const [newContent, setNewContent] = useState(note.content)
    const [editMode, setEditMode] = useState(false);
    const handleSave = () =>{
        setEditMode(false);
        if (note.title != newTitle || note.content != newContent){
            try{
                
                api.put('api/notes/' + note.id, 
                    {
                    title: newTitle, 
                    content: newContent
                })
                note.title = newTitle;
                note.content = newContent;
            }
            catch (error){
                console.log(error)
                alert(error)
            }
        }
    }
    const handleDiscardChanges = () =>{
        setEditMode(false);
        setNewTitle(note.title)
        setNewContent(note.content)
    }
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-GB");

    return (
        <div className="note-container">
            {editMode ? 
            <input type='text' className="edit-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title"/>
            :
            <p className="note-title">
                {note.title}
                <hr></hr>
            </p>}
            
            {editMode ?
            <textarea className="edit-content" value={newContent} onChange={(e) => setNewContent(e.target.value)}></textarea>
            :
            <p className="note-content">
                {note.content}
            </p>
            }
            
            <p className="note-date">
                {'Created ' + formattedDate}
            </p>
            <button className="delete-button" onClick={() => onDelete(note.id)} >Delete</button>
            {editMode ?
            <button className="edit-button" onClick={() => handleSave()}>Save</button>
            :
            <button className="edit-button" onClick={() => setEditMode(true)} >Edit</button>
            }
            {editMode && <button className="discard-changes-button" onClick={handleDiscardChanges} >Discard changes</button>}
        </div>
    )
}
