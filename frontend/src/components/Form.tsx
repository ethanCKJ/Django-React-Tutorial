import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN} from "../constants";
import  '../styles/Form.css'
import LoadingIndicator from "./LoadingIndicator";

interface FormProps {
    route: string;
    method: string;
}
export default function Form({route, method}: FormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const name = method == "login" ? "Login" : "Register"
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent refresh page
        setLoading(true);
        try {
            const res = await api.post(route, {username: username, password: password})
            if (method == "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login")
            }
        } catch (error){
            alert(error);
        } finally {
            setLoading(false);
        }
    }
        return (
            <>
            {/* A grid might be better for the below */}
            <form onSubmit={handleSubmit} className="form-container" >
                <h1>{name}</h1>
                    <label htmlFor="username-field">Username</label>
                    <input type="text" id="username-field" className="form-input" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)}/> 
                    <label htmlFor="password-field">Password</label>
                    <input type="password" id="password-field" className="form-input"value={password} onChange={(e) => setPassword(e.target.value)}/> 
                <button type="submit" className="form-button">
                    {name}
                </button>
            {loading && <LoadingIndicator/>}
            </form>
            </>
        )
}