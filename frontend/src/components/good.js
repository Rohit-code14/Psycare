import React, { useState, useEffect } from "react";
import Nav from "./Nav"
import {getUser} from "./authcalls"
import Progress from "./progress";
import man from "./img/man.gif";
import { Scrollbars } from 'react-custom-scrollbars-2';


const Good = ({history}) =>{
    const [user,setUser] = useState({})
    const [isAuth,setIsAuth] = useState(false)

    useEffect(() => {
        // checkAuth();
        async function getuserdetailsapicall(){
            await getUserDetails();
        }
        getuserdetailsapicall()
    }, [])
    // const checkAuth = async() =>{   
    //     if( localStorage.getItem("token")){
    //         setIsAuth(await isAuthenticated()? true : false)
    //         console.log("isAuth:",isAuth);
    //         return isAuth
    //     }
    //     else{
            
    //         return history.push("/login")
    //         // return false
    //     }
    // }
    const getUserDetails =async () =>{
        const userObj = await getUser()
        if(!userObj){
            setUser(null)
            return history.push("/login");
        }
        console.log(userObj.user);
        console.log("userObj: ",userObj.user.email);
        setUser(userObj.user)
        setIsAuth(true)
        console.log("user in get: ",user);
    }
    // const mark = user.health.score;
    const prog = () =>{
        if(user.health.score<7 && user.health.score>=5){
            return history.push("/medium")
        }
        else if(user.health.score<5){
            return history.push("/low")
        }
        const mark= user.health.score *10;
        return <Progress bgcolor="#00D84A" progress={mark}  height={20} />
    }
    console.log("isAuth before main:",isAuth);
    console.log("user before main:",user);
    return(
        <>
        {isAuth ? (
            <>
        <Scrollbars style={{ width: "100%",height:800  }}>
                    <Nav />
                    <div className="medium-container">
                        <h1>Congratulations...<span className="health-span"> You are Healthy  !!!</span></h1>
                        <br/>
                        {prog()}
                        <br/>
                    </div>
                    <div className="healthy-container">
                        <div className="healthy-left">
                            <img src={man} alt="" width="300" className="man-gif"/>
                        </div>
                        <div className="healthy-right">
                            <h1>Some Tips to Maintain your Health</h1>
                            <br/>
                            <h2 className="healthy-h1">1) Eat healthy</h2>
                            <h2 className="healthy-h1">2) Exercise Regularly</h2>
                            <h2 className="healthy-h1">3) Sleep Well</h2>
                            <h2 className="healthy-h1">4) Do what you love !</h2>
                            <h2 className="healthy-h1">5) Connect with People</h2>
                        </div>
                    </div>
                    <div className="medium-container">
                        <h1>Mental Health Self Care</h1>
                        <p className="healthy-p">The way you think and the things that you're filling your mind with greatly influence your psychological well-being.Mental self-care includes doing things that keep your mind sharp, like puzzles, or learning about a subject that fascinates you. You might find reading books or watching movies that inspire you fuels your mind.Mental self-care also involves doing things that help you stay mentally healthy. Practicing self-compassion and acceptance, for example, helps you maintain a healthier inner dialogue.</p>
                        <iframe className="ytvid-good" width="700" height="400" src={`https://www.youtube.com/embed/G0zJGDokyWQ`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <button style={{marginBottom:"100px"}} onClick={()=>history.push("/tips")}>Click here for more Tips</button>
                    </div>
        </Scrollbars>
            </>
        ) : (
            <>
            <h1>404 UnAuthorized</h1>
            {/* <Redirect to="/login" /> */}
            </>
        )}
        </>
    )
}

export default Good;