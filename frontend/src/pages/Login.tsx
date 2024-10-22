import '../styles/Login.css'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingIndicator from '../components/LoadingIndicator'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { AxiosError } from 'axios'

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()

    try {
      const res = await api.post("api/token/",{username: username, password: password})
      
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/");
    }
    catch (error: any | Error | AxiosError){
      if (error.response){
        // Request made but server responded with error
        if (error.response.status < 500){
          setErrorMsg("Incorrect username and password")
        }
        else{
          setErrorMsg("Internal server error. Try again some other time")
        }
      }
      console.log(error)
    }
    finally {
      setLoading(false)
    }  
  }


  return(
    <div className="container">
      <h1 className='title'>Notes app with Django</h1>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" onChange={(e) => setUsername(e.target.value)}/>
          <label htmlFor='password'>Password</label>
          <input id="password" type="text" onChange={(e) => setPassword(e.target.value)}/>
          <input type="submit" value="Login"></input>
          <br></br>
          <a href="/register" className='register_link'>Don't have an account? Register here</a>
          {loading && <LoadingIndicator/>}
          {errorMsg != "" && <p>{errorMsg}</p>}
        </form>

    </div>
  )
}

export default Login