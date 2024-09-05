import { useState, useEffect } from "react"
import api from "../api"
import {NoteType, Note} from "../components/Note";
import "../styles/Home.css"

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => { getNotes(); }, [])
  const getNotes = () => {
    api.get("/api/notes/")
      .then((res) => {setNotes(res.data); console.log(res.data);})
      .catch((error) => alert(error));
  }

  const deleteNote = (id: number) => {
    // Every axios request must start and end with slash
    api.delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204){
          getNotes();
          alert("Note deleted")
        } else {
          alert("Failed to delete note")
        }
      })
      .catch((error) => console.log(error));
    // setNotes(notes.filter((element) => element.id !== id ))
    // getNotes();
  }

  const createNote = (e: React.FormEvent) => {
    e.preventDefault();
    api.post("/api/notes/", { content, title }).then((res) => { 
      if (res.status === 201){
        alert("Created a note");
        getNotes();
      } else {
        alert("Failed to create note")
      }
    }
    )
      .catch((error) => alert(error))
  }

  return (
    <div>
      <div className="notes-section">
        <h2>Notes</h2>
      {notes.map((note: NoteType) => <Note note={note} onDelete={deleteNote} key={note.id}/>)}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote} className="" style={{display:"flex", flexDirection: "column"}}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" required onChange={(e) => {setTitle(e.target.value)}} value={title}/>
        <label htmlFor="content">Content:</label>
        {/* <input type="text" id="content" name="content" onChange={(e) => {setContent(e.target.value)}}/> */}
        <textarea id="content" name="content" onChange={(e) => {setContent(e.target.value)}}></textarea>
        <input type="submit" value="Submit"/>
        {/* <input type="submit" value="Submit"/> */}
      </form>
    </div>
  )
}

export default Home