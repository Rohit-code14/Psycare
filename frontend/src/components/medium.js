import React, { useState, useEffect } from "react";
import Nav from "./Nav"
import {getUser} from "./authcalls"
import Progress from "./progress";
import cycle from "./img/cycle.svg";
import { Scrollbars } from 'react-custom-scrollbars-2';


const Medium = ({history}) =>{
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
        // console.log(userObj.user);
        // console.log("userObj: ",userObj.user.email);
        setUser(userObj.user)
        setIsAuth(true)
        // console.log("user in get: ",user);
    }
    // const mark = user.health.score;
    const prog = () =>{
        if(user.health.score<5){
            return history.push("/low")
        }
        else if(user.health.score>7){
            return history.push("/good")
        }
        const mark= user.health.score *10;
        return <Progress bgcolor="#12B0E8" progress={mark}  height={20} />
    }
    // console.log("isAuth before main:",isAuth);
    // console.log("user before main:",user);
    return(
        <>
        {isAuth ? (
            <>
        <Scrollbars style={{ width: "100%",height:800  }}>
                    <Nav />
                    <div className="medium-container">
                        <h1>Your Health is <span className="health-span">  Not so bad  !!!</span></h1>
                        <br/>
                        {prog()}
                        <br/>
                    </div>
                    <div className="healthy-container">
                        <div className="healthy-left">
                            <img src={cycle} alt="" width="300" className="man-gif"/>
                        </div>
                        <div className="healthy-right">
                            <h1><i>Your Mental health needs some Improvement</i></h1>
                            <br/>
                            <h3>Even though your health assessment score is not too bad, you need to be carefull and be precautious. We encourage you to consult the doctor and also follow these tips</h3>
                            {/* <h1>Some Tips to Maintain your Health</h1> */}
                            <br/>
                            <p className="medium-p">1) Eat healthy</p>
                            <p className="medium-p">2) Exercise Regularly</p>
                            <p className="medium-p">3) Sleep Well</p>
                            <p className="medium-p">4) Do what you love !</p>
                            <p className="medium-p">5) Connect with People</p>
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
            {history.push("/login")}
            <h1>404 UnAuthorized</h1>
            {/* <Redirect to="/login" /> */}
            </>
        )}
        </>
    )
}

export default Medium;