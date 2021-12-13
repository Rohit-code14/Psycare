import React from "react"
import leftimg from "./leftimg.png"
import Nav from "./Nav"

const Login = () => {
    return(
    <>
        <Nav />
        <div className="container">
            <div className="block-1">
                <img src={leftimg} className="side" height="550px" alt="" />
            </div>
            <form className="block-2">
                <h1>Login</h1>
                <input type="text" className="email" name="email" placeholder="Enter email" /><br/>
                <input type="password" className="password" name="password" placeholder="Enter Password" /><br/>   
                <button type="submit">Login</button>
            </form>
        </div>
    </>
    )
}

export default Login;