import { Navigate, useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect, ReactNode } from "react";


interface ProtectedRouteProps {
    children: ReactNode;
}
export default function ProtectedRoute({children} : ProtectedRouteProps){
    // As soon as we load a protected route
    useEffect(() =>{
        // Call auth function.
        auth().catch(() => setIsAuthorized(false));
    }, [])
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const auth = async() =>{
        // Check if ACCESS_TOKEN null. If null, not authorized.
        // If REFRESH_TOKEN not yet expired, 
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token){
            setIsAuthorized(false);
            return
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000 // Date in seconds
        if (tokenExpiration && tokenExpiration < now){
            await refreshToken();
        }
        else {
            setIsAuthorized(true);
        }
    }
    const refreshToken = async() => {
        // Refresh access token automatically
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = api.post("/api/token/refresh/",
                {refresh: refreshToken,}
            );
            if ((await res).status === 200){
                localStorage.setItem(ACCESS_TOKEN, (await res).data.access);
                setIsAuthorized(true);
            }
            else{
                setIsAuthorized(false);
            }
        } catch (error){
            console.log(error);
            setIsAuthorized(false);
        }
    };
    console.log(isAuthorized, "hello")
    if (isAuthorized === null){
        return(
            <div>Loading...</div>
        )
    }
    return (
        isAuthorized === true ? children :
        <Navigate to="/login"/>
    )
}