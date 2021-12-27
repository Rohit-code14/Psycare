import React from "react"
import { Redirect } from "react-router-dom"
import { signOut } from "./authcalls"

const Logout = () =>{
    signOut()
    return <Redirect to="/register"/>;
}

export default Logout;