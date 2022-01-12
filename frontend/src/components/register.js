import leftimg from "./img/leftimg.png"
import React,{useState} from "react"
import Nav from "./Nav"
// import axios from "axios"
import { signUp,authenticate,isAuthenticated } from "./authcalls"
import { Link, Redirect } from "react-router-dom"

const Register = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name,setName] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [isAuth,setIsAuth] = useState(false)
    const checkAuth = async() =>{   
        if( localStorage.getItem("token")){
            setIsAuth(await isAuthenticated()? true : false)
            console.log(isAuth);
            return isAuth
        }
        else{
            return false
        }
    }
    checkAuth()
    console.log(success);
    const handleSubmit =(event) =>{
        event.preventDefault()
        signUp({name,email,password})
        .then(data =>{
            console.log(data);
            if(data && data.err){
                setError(data.err)
            }
            else{
                console.log(data);
                setEmail("")
                setName("")
                setPassword("")
                setError("")
                setSuccess(true)
            }
        }).catch(err => {
            setError(err)
            console.log("Register Error ",err)
        })
    }
    const successMessage = () =>{
        return(
            <div className="success" style={{ display: success? "" :"none" }}>
                New Account Registered Successfully !!.. <Link to="/login">Click here to Login</Link>
            </div>
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
            <Redirect to="/test" />
        ) : (
        <>
        <Nav />
        <div className="container">
        <div className="block-1">
            <img src={leftimg} className="side" height="550px" alt="" />
        </div>
        <form className="block-2" >
        {/* <form className="block-2" onSubmit={e=>{
            e.preventDefault();
            handleSubmit();
        }}> */}
            <h1>Register{success}</h1>
            {successMessage()}
            {errorMessage()}
            <input type="text" className="name" name="name" id="name" placeholder="Enter Name" onChange={e=>setName(e.target.value)} value={name}/><br/>
            <input type="text" className="email" name="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} value={email}/><br/>
            <input type="password" className="password" name="password" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} value={password}/><br/>   
            <button type="submit" onClick={handleSubmit}>Register</button>
        </form>
        </div>
        </>
        )}
    </>
    )
}

export default Register;