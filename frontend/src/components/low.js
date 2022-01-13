import React, { useState, useEffect } from "react";
import Nav from "./Nav"
import {getUser} from "./authcalls"
import Progress from "./progress";
import { Scrollbars } from 'react-custom-scrollbars-2';
import s from "./img/s.svg"
import { Link } from "react-router-dom";

const Low = ({history}) =>{
    const [user,setUser] = useState({})
    const [isAuth,setIsAuth] = useState(false)

    useEffect(() => {
        // checkAuth();
        async function getuserdetailsapicall(){
            await getUserDetails();
        }
        getuserdetailsapicall()
    },[] )
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
        var userObj = await getUser();
        if(!userObj){
            setUser(null)
            return history.push("/login");
        }
        console.log(userObj.user);
        // console.log("userObj: ",userObj.user.email);
        setUser(userObj.user)
        setIsAuth(true)
        // console.log("user in get: ",user);
    }
    // const mark = user.health.score;
    const prog = () =>{
            
            if(user.health.score<=7 && user.health.score>=5){
                return history.push("/medium")
            }
            else if(user.health.score>7){
                return history.push("/good")
            }
            const mark= user.health.score *10;
            return <Progress bgcolor="#E21717" progress={mark}  height={20} />


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
                        <h1>Poor Condition...<span className="health-span"> Consult Doctor Immediately  !!!</span></h1>
                        <br/>
                        {prog()}
                        <br/>
                    </div>
                    <div className="healthy-container">
                        <div className="healthy-left">
                            <img src={s} alt="" width="300" className="man-gif"/>
                        </div>
                        <div className="healthy-right">
                            <h1>You Need Councling Immediately !!</h1>
                            <br/>
                            <p className="healthy-p">Hey, According the answers given by you we found that your health condition is very poor. Don't worry! we are here to help you. Every problem has a solution. Take up Councling from our best Doctor or any other Doctor,but get Councling Immediately !!</p>
                            {/* <Link to="https://fervent-edison-8188cf.netlify.app/">Take up Consultation</Link> */}
                            <Link className="link" to={{ pathname: "https://fervent-edison-8188cf.netlify.app/" }} target="_blank" >Take up Consultation</Link>
                        </div>
                    </div>
                    <div className="medium-container">
                        <h1>Some simple ways to regain your Mental Health</h1>
                        <br/>
                        <div className="low-tips">
                            <p className="healthy-h1">1) Getting enough rest.</p>
                            <p className="healthy-h1">2) Making time for yourself, family and friends – talk to them about how you feel.</p>
                            <p className="healthy-h1">3) Getting to know who you are and what you think about – try to do things that make you happy and don’t forget to laugh regularly.</p>
                            <p className="healthy-h1">4) Exercising regularly, preferably with someone else.</p>
                            <p className="healthy-h1">5) Limiting your intake of alcohol and avoiding cigarettes and other drugs.</p>
                        </div>
                        <br/>
                        <br/>
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

export default Low;