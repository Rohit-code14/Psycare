import React, { useState } from "react";
import Nav from "./Nav";
import { isAuthenticated } from "./authcalls";

const Test = () => {
    // const resu =  isAuthenticated();
    // console.log("Middle:",resu);
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
    return(
        <>
        <Nav />
         {isAuth ? (        
        <div className="test">
            <h2>How are you feeling?</h2>
            <ul className="options">
                <li className="ans"><button>Happy</button></li>
                <li className="ans"><button>Sad</button></li>
                <li className="ans"><button>Empty Minded</button></li>
                <li className="ans"><button>Very Depressed</button></li>
            </ul>
            <h2>How are you feeling?</h2>
            <ul className="options">
                <li className="ans"><button>Happy</button></li>
                <li className="ans"><button>Sad</button></li>
                <li className="ans"><button>Empty Minded</button></li>
                <li className="ans"><button>Very Depressed</button></li>
            </ul>
            <h2>How are you feeling?</h2>
            <ul className="options">
                <li className="ans"><button>Happy</button></li>
                <li className="ans"><button>Sad</button></li>
                <li className="ans"><button>Empty Minded</button></li>
                <li className="ans"><button>Very Depressed</button></li>
            </ul>
            <h2>How are you feeling?</h2>
            <ul className="options">
                <li className="ans"><button>Happy</button></li>
                <li className="ans"><button>Sad</button></li>
                <li className="ans"><button>Empty Minded</button></li>
                <li className="ans"><button>Very Depressed</button></li>
            </ul>
            <h2>How are you feeling?</h2>
            <ul className="options">
                <li className="ans"><button>Happy</button></li>
                <li className="ans"><button>Sad</button></li>
                <li className="ans"><button>Empty Minded</button></li>
                <li className="ans"><button>Very Depressed</button></li>
            </ul>
            <button className="btn" style={{backgroundColor:"#4DD637"}}>Submit</button>
        </div>
        ):(
            <h1 style={{textAlign:"center"}}>   401 Unauthorized</h1>
        )
    }
        </>
    )
}

export default Test;