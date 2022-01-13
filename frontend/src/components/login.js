import React,{useEffect, useState} from "react"
import leftimg from "./img/leftimg.png"
import Nav from "./Nav"
// import axios from "axios"
import { signIn,authenticate, isAuthenticated } from "./authcalls"
import LoadingOverlay from 'react-loading-overlay-ts';
import { Redirect } from "react-router-dom";

const Login = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading,setLoading] = useState(false)
    const [didRedirect, setDidRedirect] = useState('')
    const [error,setError] = useState('')
    const {token} = isAuthenticated()

    const [isAuth,setIsAuth] = useState(false)
    useEffect(()=>{
        async function checkAuthCall(){
            await checkAuth()
        }
        checkAuthCall()
    })
    const checkAuth = async() =>{   
        if( localStorage.getItem("token")){
            setIsAuth(await isAuthenticated()? true : false)
            // console.log(isAuth);
            return isAuth
        }
        else{
            return false
        }
    }
    // checkAuth()
    // const url = "http://localhost:5000/api/login"
    if(token){
        return <Redirect to="/test" />
    }
    const handleSubmit =async () =>{
        setLoading(true)
        const user = {
            email,
            password
        }
        signIn(user)
        .then(data =>{
            if(data && data.err){
                setError(data.err)
                setLoading(false)
            }
            else{
                // console.log(data);
                setEmail("")
                setPassword("")
                setLoading(false)
                authenticate(data.token,()=>{
                    setDidRedirect(true);
                })
            }
        })
        .catch(console.log("Login Error"))

    }
    const redirectComponent = () =>{
        return(
                didRedirect && (
                    <Redirect to="/test" />
                )
            )
        
    }
    const errorMessage = () =>{
        return(
            <div className="error" style={{ display: error? "" :"none" }}>
                {error} !!
            </div>
        )
    }
    return(
    <>
        {isAuth ? (
            <Redirect to="/tips" />
        ) : (

        <LoadingOverlay
                active={loading}
                spinner
                text='Logging In....'
              >
        <Nav />
        <div className="container">
            <div className="block-1">
                <img src={leftimg} className="side" height="550px" alt="" />
            </div>
            <form className="block-2" onSubmit={(e)=>{e.preventDefault();handleSubmit();}}>
                <h1>Login</h1>
                <input 
                type="text" 
                className="email" 
                name="email" 
                placeholder="Enter email"  
                onChange={ (e) => setEmail(e.target.value)  }
                />
                <br/>
                <input 
                type="password" 
                className="password" 
                name="password" 
                placeholder="Enter Password"  
                onChange={ (e) => setPassword(e.target.value) }
                />
                <br/>   
                <button type="submit" >Login</button>
                {errorMessage()}
            </form>
        </div>
        {redirectComponent()}
        </LoadingOverlay>
        )}
    </>
    )
}

export default Login;