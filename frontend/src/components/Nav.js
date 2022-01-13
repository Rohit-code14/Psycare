import  React,{useEffect, useState} from "react";
// import { Link } from "react-router-dom";
import "../styles.css"
// import { ToastContainer, toast } from 'react-toastify';
import { isAuthenticated } from "./authcalls";

const Nav = () => {
    // const notify = () => toast("Wow so easy!");
    useEffect(()=>{
        async function checkAuthCall(){
            await checkAuth()
        }
        checkAuthCall();
    })
    const [isAuth,setIsAuth] = useState(false)
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
    return(
        <header>
            <nav className="navbar">
                <ul className="navul">
                    <div className="left">
                        <div className="item">
                            <h1>Psycare</h1>
                        </div>
                    </div>
                    <div className="right">
                        {isAuth ? (
                        <>
                            <li className="item"><a href="/tips">Tips</a></li>
                            <li className="item"><a href="/test">Take Assessment</a></li>
                            <li className="item"><a href="/logout">Logout</a></li>
                        </>
                        ) : (
                        <>
                            <li className="item"><a href="/register">Register</a></li>
                            <li className="item"><a href="/login">login</a></li>
                        </>
                        )}
                        {/* <li className="item"><button onClick={notify}>Tell me a Joke!</button></li> */}
                    </div>
                </ul>
            </nav>
        </header>
    )
}

export default Nav;