import {API} from "./backend"
require('dotenv').config()

export const signUp = async user =>{
    console.log(process.env.API);
    return await fetch(`${API}/register/`,{
    // return await fetch(`http://127.0.0.1:5000/api/register/`,{
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
    // return await fetch(`http://127.0.0.1:5000/api/login/`,{
    return await fetch(`${API}/login/`,{
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
    // return await fetch(`http://127.0.0.1:5000/api/verify/`,{
        return await fetch(`${API}/verify/`,{
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

export const SetScore = async(mark) =>{
    const token = JSON.parse(localStorage.getItem("token"))
    console.log("set score mark: ",mark);
    // return await fetch(`http://127.0.0.1:5000/api/score/`,{
        return await fetch(`${API}/score/`,{
            method:"POST",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json",
                // "Authorization":`Bearer ${token}`
                credentials: "same-origin"
            },
            body:JSON.stringify({mark,token})
        }
        
        ).then(resp => {
            console.log(resp);
            return resp.json()
        }).catch(err => console.log("Not working ",err))
}


export const getUser =async () =>{
    const token = localStorage.getItem("token")
    console.log("token: ",token);
    if(!token){
        return null
    }
    // return await fetch(`http://127.0.0.1:5000/api/user/${JSON.parse(token)}`,
    return await fetch(`${API}/user/${JSON.parse(token)}`,
        {
        // return await fetch(`${API}/register`,{
            method:"GET",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json",
                // "Authorization":`Bearer ${token}`
                credentials: "same-origin"
            }
            // body:JSON.stringify({mark,token})
        }
    ).then((resp)=>{
        console.log(resp);
        return resp.json()
    }).catch((err)=>{
        console.log("Error : ",err);
    })
    // console.log("getUser final : ",user.json());
    // user = user.json()
    // return user
}