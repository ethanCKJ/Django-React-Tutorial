import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import api from "../api"
import {NoteType, Note} from "../components/Note";
import "../styles/Home.css"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants"

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem(ACCESS_TOKEN, "");
    localStorage.setItem(REFRESH_TOKEN, "");
    navigate("/login")
  }
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
          console.log("Note deleted")

        } else {
          alert("Failed to delete note")
        }
      })
      .catch((error) => console.log(error));
  }

  const createNote = (e: React.FormEvent) => {
    e.preventDefault();
    api.post("/api/notes/", { content, title }).then((res) => { 
      if (res.status === 201){
        getNotes();
        setContent("")
        setTitle("")
      } else {
        alert("Failed to create note")
      }
    }
    )
      .catch((error) => alert(error))
  }

  return (
    <div className='global'>
      <div className="notes-section">
        <h2>Notes</h2>
      {notes.map((note: NoteType) => <Note note={note} onDelete={deleteNote} key={note.id}/>)}
      </div>
      <form onSubmit={createNote} className="create-note">
        <div className="create-header">
          <h2>Create a Note</h2>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" required onChange={(e) => {setTitle(e.target.value)}} value={title}/>
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" className="content-field" onChange={(e) => {setContent(e.target.value)}} value={content}></textarea>
        <input type="submit" value="Create"/>
      </form>
    </div>
  )
}

export default Home