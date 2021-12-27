import {API} from "./backend"
require('dotenv').config()

export const signUp = async user =>{
    console.log(process.env.API);
    // return fetch(`${API}/register/`,{
    return await fetch(`http://127.0.0.1:5000/api/register/`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(resp =>{ 
        return resp.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const signIn =async user =>{
    return await fetch(`http://127.0.0.1:5000/api/login/`,{
    // return await fetch(`${API}/register`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(resp =>{ 
        return resp.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const authenticate = (data,next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("token",JSON.stringify(data))
        next()
    }
}

export const signOut = (next) =>{
    if (typeof window !== "undefined"){
        localStorage.removeItem("token")
    }
}

export const isAuthenticated =async () =>{
    if(typeof window === "undefined"){
        console.log("Window not accessible");
        return false
    }
    if(!localStorage.getItem("token")){
        console.log("No token !!");
        const resp = false
        return resp
    }
    const token = JSON.parse(localStorage.getItem("token"))
    return await fetch(`http://127.0.0.1:5000/api/verify/`,{
        // return await fetch(`${API}/register`,{
            method:"POST",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json",
                // "Authorization":`Bearer ${token}`
                credentials: "same-origin"
            },
            body:JSON.stringify({token})
        }
        
        ).then(resp => {
            console.log(resp);
            return resp.json()
        }).catch(err => console.log("Not working ",err))

}