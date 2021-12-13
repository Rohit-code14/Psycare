import leftimg from "./leftimg.png"
import React from "react"
import Nav from "./Nav"

const Register = () => {
    return(
    <>
        <Nav />
        <div className="container">
        <div className="block-1">
            <img src={leftimg} className="side" height="550px" alt="" />
        </div>
        <form className="block-2">
            <h1>Register</h1>
            <input type="text" className="name" name="name" id="name" placeholder="Enter Name"/><br/>
            <input type="text" className="email" name="email" placeholder="Enter email"/><br/>
            <input type="password" className="password" name="password" placeholder="Enter Password"/><br/>   
            <button type="submit">Register</button>
        </form>
        </div>
    </>
    )
}

export default Register;