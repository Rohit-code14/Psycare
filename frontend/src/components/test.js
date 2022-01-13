import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { isAuthenticated,SetScore, getUser } from "./authcalls";
import { Redirect } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
require('dotenv').config()


const Test = ({history}) => {
    // const resu =  isAuthenticated();
    // console.log("Middle:",resu);
    const [isAuth,setIsAuth] = useState(false)
    const [mark,setMark] = useState(0)
    const [user,setUser] = useState({})
    const [answers,setAnswers] = useState(['n','n','n','n','n','n','n','n','n','n'])
    let dummy = []
    useEffect(() => {
        checkAuth();
        getUserDetails();
        // console.log("API:",process.env.REACT_APP_API);
    }, [])
    const SetOption = (qno,opt) =>{

        // console.log("Qno : ",qno);
        dummy = answers
        dummy[qno] = opt
        setAnswers(dummy)
        // console.log(answers);
    }
    const calcScoreAndSubmit = async () =>{
        const correct = ['d','d','c','d','a','b','c','d','a','b']
        let marks = 0
        for (let index = 0; index < answers.length; index++) {
            if(correct[index]===answers[index]){
                marks = marks+1
                setMark(mark+1)
            }   
        }
        // console.log("Calculated mark: ",marks);
        const responce = await SetScore(marks)
        // console.log("Submit responce: ",responce);
        if(!marks){
            return history.push("/test")
        }
        if(marks<4){
            return history.push("/low");
        }
        else if((marks>=5)&&(marks<=7) ){
            return history.push("/medium");
        }
        return history.push("/good");
    }
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
    const getUserDetails =async () =>{
        const userObj = await getUser()
        // console.log("userObj: ",userObj.user.email);
        if(!userObj){
            setUser(null)
            return;
        }
        setUser(userObj.user)
    }

    if(user && user.health && user.health.score >= 0){
        if(user.health.score<4){
            // return history.push("/low");
            return <Redirect to="/low" />
        }
        else if((user.health.score>=4)&&(user.health.score<=7) ){
            // return history.push("/medium");
            return <Redirect to="/medium" />
        }
        return <Redirect to="/good" />
        // return history.push("/good");
    }
    return(
        <Scrollbars style={{ width: "100%",height:800  }}>
        <>
        <Nav />
        {isAuth ? (        
        <div className="test">
            <h1 className="test-title"><i>Mental Health Assessment</i></h1>
            <h3>( With each question, think about how you've been feeling over the last 2 weeks )</h3>
            <br/><br/>
            <h2>1) How often have you been bothered by feeling down, depressed or hopeless?</h2>
            <ul className="options">
                <li className="ans"><button
                onClick={()=>{
                    document.getElementById("ans-0-a").style.backgroundColor = "#1FAA59";
                    document.getElementById("ans-0-b").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-0-c").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-0-d").style.backgroundColor = "#3944F7";
                    SetOption(0,'a')}}
                id="ans-0-a"
                >Nearly every day</button></li>
                <li className="ans">
                    <button 
                        id="ans-0-b"
                        onClick={()=>{
                            document.getElementById("ans-0-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-0-b").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-0-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-0-d").style.backgroundColor = "#3944F7";
                            SetOption(0,'b')}}
                        >More than half the days
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-0-c"
                        onClick={()=>{
                            document.getElementById("ans-0-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-0-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-0-c").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-0-d").style.backgroundColor = "#3944F7";
                            SetOption(0,'c')}}
                        >Several days
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-0-d"
                        onClick={()=>{
                            document.getElementById("ans-0-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-0-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-0-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-0-d").style.backgroundColor = "#1FAA59";
                            SetOption(0,'d')}}
                        >Not at all
                    </button>
                </li>
            </ul>
            <br/>
            <h2>2) How often have you had little interest or pleasure in doing things?</h2>
            <ul className="options">
                <li className="ans"><button
                onClick={()=>{
                    document.getElementById("ans-1-a").style.backgroundColor = "#1FAA59";
                    document.getElementById("ans-1-b").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-1-c").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-1-d").style.backgroundColor = "#3944F7";
                    SetOption(1,'a')}}
                id="ans-1-a"
                >Nearly every day</button></li>
                <li className="ans">
                    <button 
                        id="ans-1-b"
                        onClick={()=>{
                            document.getElementById("ans-1-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-1-b").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-1-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-1-d").style.backgroundColor = "#3944F7";
                            SetOption(1,'b')}}
                        >Several days
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-1-c"
                        onClick={()=>{
                            document.getElementById("ans-1-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-1-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-1-c").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-1-d").style.backgroundColor = "#3944F7";
                            SetOption(1,'c')}}
                        >Empty Minded
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-1-d"
                        onClick={()=>{
                            document.getElementById("ans-1-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-1-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-1-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-1-d").style.backgroundColor = "#1FAA59";
                            SetOption(1,'d')}}
                        >Not at all
                    </button>
                </li>
            </ul>
            <br/>
            <h2>3) How often have you been bothered by trouble falling or staying asleep, or sleeping too much?</h2>
            <ul className="options">
                <li className="ans"><button
                onClick={()=>{
                    document.getElementById("ans-2-a").style.backgroundColor = "#1FAA59";
                    document.getElementById("ans-2-b").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-2-c").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-2-d").style.backgroundColor = "#3944F7";
                    SetOption(2,'a')}}
                id="ans-2-a"
                >More than half the days</button></li>
                <li className="ans">
                    <button 
                        id="ans-2-b"
                        onClick={()=>{
                            document.getElementById("ans-2-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-2-b").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-2-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-2-d").style.backgroundColor = "#3944F7";
                            SetOption(2,'b')}}
                        >Several days
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-2-c"
                        onClick={()=>{
                            document.getElementById("ans-2-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-2-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-2-c").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-2-d").style.backgroundColor = "#3944F7";
                            SetOption(2,'c')}}
                        >Not at all
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-2-d"
                        onClick={()=>{
                            document.getElementById("ans-2-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-2-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-2-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-2-d").style.backgroundColor = "#1FAA59";
                            SetOption(2,'d')}}
                        >Nearly every day
                    </button>
                </li>
            </ul>
            <br/>
            <h2>4) How often have you been bothered by feeling tired or having little energy?</h2>
            <ul className="options">
                <li className="ans"><button
                onClick={()=>{
                    document.getElementById("ans-3-a").style.backgroundColor = "#1FAA59";
                    document.getElementById("ans-3-b").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-3-c").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-3-d").style.backgroundColor = "#3944F7";
                    SetOption(3,'a')}}
                id="ans-3-a"
                >Several days</button></li>
                <li className="ans">
                    <button 
                        id="ans-3-b"
                        onClick={()=>{
                            document.getElementById("ans-3-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-3-b").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-3-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-3-d").style.backgroundColor = "#3944F7";
                            SetOption(3,'b')}}
                        >More than half the days
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-3-c"
                        onClick={()=>{
                            document.getElementById("ans-3-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-3-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-3-c").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-3-d").style.backgroundColor = "#3944F7";
                            SetOption(3,'c')}}
                        >Nearly every day
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-3-d"
                        onClick={()=>{
                            document.getElementById("ans-3-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-3-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-3-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-3-d").style.backgroundColor = "#1FAA59";
                            SetOption(3,'d')}}
                        >Not at all
                    </button>
                </li>
            </ul>
            <br/>
            <h2>5) How often have you been bothered by poor appetite or overeating?</h2>
            <ul className="options">
                <li className="ans"><button
                onClick={()=>{
                    document.getElementById("ans-4-a").style.backgroundColor = "#1FAA59";
                    document.getElementById("ans-4-b").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-4-c").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-4-d").style.backgroundColor = "#3944F7";
                    SetOption(4,'a')}}
                id="ans-4-a"
                >Not at all</button></li>
                <li className="ans">
                    <button 
                        id="ans-4-b"
                        onClick={()=>{
                            document.getElementById("ans-4-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-4-b").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-4-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-4-d").style.backgroundColor = "#3944F7";
                            SetOption(4,'b')}}
                        >Several days
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-4-c"
                        onClick={()=>{
                            document.getElementById("ans-4-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-4-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-4-c").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-4-d").style.backgroundColor = "#3944F7";
                            SetOption(4,'c')}}
                        >More than half the days
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-4-d"
                        onClick={()=>{
                            document.getElementById("ans-4-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-4-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-4-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-4-d").style.backgroundColor = "#1FAA59";
                            SetOption(4,'d')}}
                        >Nearly every day
                    </button>
                </li>
            </ul>
            <br/>
            <h2>6) How often have you been bothered by feeling bad about yourself, or that you are a failure, or have let yourself or your family down?</h2>
            <ul className="options">
                <li className="ans"><button
                onClick={()=>{
                    document.getElementById("ans-5-a").style.backgroundColor = "#1FAA59";
                    document.getElementById("ans-5-b").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-5-c").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-5-d").style.backgroundColor = "#3944F7";
                    SetOption(5,'a')}}
                id="ans-5-a"
                >Several days</button></li>
                <li className="ans">
                    <button 
                        id="ans-5-b"
                        onClick={()=>{
                            document.getElementById("ans-5-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-5-b").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-5-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-5-d").style.backgroundColor = "#3944F7";
                            SetOption(5,'b')}}
                        >Not at all
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-5-c"
                        onClick={()=>{
                            document.getElementById("ans-5-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-5-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-5-c").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-5-d").style.backgroundColor = "#3944F7";
                            SetOption(5,'c')}}
                        >More than half the days
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-5-d"
                        onClick={()=>{
                            document.getElementById("ans-5-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-5-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-5-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-5-d").style.backgroundColor = "#1FAA59";
                            SetOption(5,'d')}}
                        >Nearly every day
                    </button>
                </li>
            </ul>
            <br/>
            <h2>7) How often have you been bothered by trouble concentrating on things, such as reading the newspaper or watching television?</h2>
            <ul className="options">
                <li className="ans"><button
                onClick={()=>{
                    document.getElementById("ans-6-a").style.backgroundColor = "#1FAA59";
                    document.getElementById("ans-6-b").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-6-c").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-6-d").style.backgroundColor = "#3944F7";
                    SetOption(6,'a')}}
                id="ans-6-a"
                >Several days</button></li>
                <li className="ans">
                    <button 
                        id="ans-6-b"
                        onClick={()=>{
                            document.getElementById("ans-6-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-6-b").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-6-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-6-d").style.backgroundColor = "#3944F7";
                            SetOption(6,'b')}}
                        >More than half the days
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-6-c"
                        onClick={()=>{
                            document.getElementById("ans-6-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-6-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-6-c").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-6-d").style.backgroundColor = "#3944F7";
                            SetOption(6,'c')}}
                        >Not at all
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-6-d"
                        onClick={()=>{
                            document.getElementById("ans-6-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-6-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-6-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-6-d").style.backgroundColor = "#1FAA59";
                            SetOption(6,'d')}}
                        >Nearly every day
                    </button>
                </li>
            </ul>
            <br/>
            <h2>8) How often have you been bothered by feeling nervous, anxious or on edge?</h2>
            <ul className="options">
                <li className="ans"><button
                onClick={()=>{
                    document.getElementById("ans-7-a").style.backgroundColor = "#1FAA59";
                    document.getElementById("ans-7-b").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-7-c").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-7-d").style.backgroundColor = "#3944F7";
                    SetOption(7,'a')}}
                id="ans-7-a"
                >Several days</button></li>
                <li className="ans">
                    <button 
                        id="ans-7-b"
                        onClick={()=>{
                            document.getElementById("ans-7-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-7-b").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-7-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-7-d").style.backgroundColor = "#3944F7";
                            SetOption(7,'b')}}
                        >More than half the days
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-7-c"
                        onClick={()=>{
                            document.getElementById("ans-7-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-7-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-7-c").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-7-d").style.backgroundColor = "#3944F7";
                            SetOption(7,'c')}}
                        >Nearly every day
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-7-d"
                        onClick={()=>{
                            document.getElementById("ans-7-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-7-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-7-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-7-d").style.backgroundColor = "#1FAA59";
                            SetOption(7,'d')}}
                        >Not at all
                    </button>
                </li>
            </ul>
            <br/>
            <h2>9) How often have you been bothered by not being able to stop or control worrying?</h2>
            <ul className="options">
                <li className="ans"><button
                onClick={()=>{
                    document.getElementById("ans-8-a").style.backgroundColor = "#1FAA59";
                    document.getElementById("ans-8-b").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-8-c").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-8-d").style.backgroundColor = "#3944F7";
                    SetOption(8,'a')}}
                id="ans-8-a"
                >Not at all</button></li>
                <li className="ans">
                    <button 
                        id="ans-8-b"
                        onClick={()=>{
                            document.getElementById("ans-8-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-8-b").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-8-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-8-d").style.backgroundColor = "#3944F7";
                            SetOption(8,'b')}}
                        >Several days
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-8-c"
                        onClick={()=>{
                            document.getElementById("ans-8-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-8-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-8-c").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-8-d").style.backgroundColor = "#3944F7";
                            SetOption(8,'c')}}
                        >More than half the days
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-8-d"
                        onClick={()=>{
                            document.getElementById("ans-8-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-8-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-8-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-8-d").style.backgroundColor = "#1FAA59";
                            SetOption(8,'d')}}
                        >Nearly every day
                    </button>
                </li>
            </ul>
            <br/>
            <h2>10) How often have you been bothered by worrying too much about different things?</h2>
            <ul className="options">
                <li className="ans"><button
                onClick={()=>{
                    document.getElementById("ans-9-a").style.backgroundColor = "#1FAA59";
                    document.getElementById("ans-9-b").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-9-c").style.backgroundColor = "#3944F7";
                    document.getElementById("ans-9-d").style.backgroundColor = "#3944F7";
                    SetOption(9,'a')}}
                id="ans-9-a"
                >Several days</button></li>
                <li className="ans">
                    <button 
                        id="ans-9-b"
                        onClick={()=>{
                            document.getElementById("ans-9-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-9-b").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-9-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-9-d").style.backgroundColor = "#3944F7";
                            SetOption(9,'b')}}
                        >Not at all
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-9-c"
                        onClick={()=>{
                            document.getElementById("ans-9-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-9-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-9-c").style.backgroundColor = "#1FAA59";
                            document.getElementById("ans-9-d").style.backgroundColor = "#3944F7";
                            SetOption(9,'c')}}
                        >More than half the days
                    </button>
                </li>
                <li className="ans">
                    <button 
                    id="ans-9-d"
                        onClick={()=>{
                            document.getElementById("ans-9-a").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-9-b").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-9-c").style.backgroundColor = "#3944F7";
                            document.getElementById("ans-9-d").style.backgroundColor = "#1FAA59";
                            SetOption(9,'d')}}
                        >Nearly every day
                    </button>
                </li>
            </ul>
            <br/>
            <button className="btn" onClick={()=>calcScoreAndSubmit()}>Submit</button>
        </div>
        ):(
            <h1 style={{textAlign:"center"}}>   401 Unauthorized</h1>
        )
    }
        </>
        </Scrollbars>
    )
}

export default Test;
