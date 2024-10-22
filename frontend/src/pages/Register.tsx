import '../styles/Login.css'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingIndicator from '../components/LoadingIndicator'
import api from '../api'
import { AxiosError } from 'axios'

function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [password2, setPassword2] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    setErrorMsg("")

    try {
      const res = await api.post("api/user/register/",{username: username, password: password})
      navigate("/login");
    }
    catch (error: any | Error | AxiosError){
      let data = error.response.data
      if (data.username && data.username[0] == "A user with that username already exists."){
        setErrorMsg('Username already exists')
      }
      else if (data.username && data.username[0] == "This field may not be blank."){
        setErrorMsg('Username cannot be blank')
      }
      else if (data.password && data.password[0] == "This field may not be blank."){
        setErrorMsg('Password cannot be blank')
      }
      else{
        setErrorMsg('Something went wrong. Check if backend is turned on')
      }
    }
    finally {
      setLoading(false)
    }  
  }


  return(
    <div className="container">
      <h1 className='title'>Notes app with Django</h1>
        <form onSubmit={handleSubmit}>
          <h2>Create your account</h2>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" onChange={(e) => setUsername(e.target.value)} style={{margin:"0"}}/>
          <p style={{margin:"0 0 6px 0", padding:"none"}}>Username cannot have spaces</p>
          <label htmlFor='password'>Password</label>
          <input id="password" type="text" onChange={(e) => setPassword(e.target.value)}/>
          <label htmlFor='password2'>Confirm Password</label>
          <input id="password2" type="text" onChange={(e) => setPassword2(e.target.value)}/>
          {(password != password2) && <p>Passwords are different</p>}
          <input type="submit" value="Register"></input>
          {loading && <LoadingIndicator/>}
          {(errorMsg != "") && <p>{errorMsg}</p>}
        </form>

    </div>
  )
}

export default Register