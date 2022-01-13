import React,{useEffect, useState} from "react"
import Nav from "./Nav"
import { isAuthenticated } from "./authcalls"
import { Scrollbars } from 'react-custom-scrollbars-2';

const Motivation = () => {
    const [isAuth,setIsAuth] = useState(false)
    useEffect(()=>{
        async function checkAuthCall(){
            await checkAuth();
        }
        checkAuthCall();
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
    const vidcode = ['vix0NbikS5o','ZWVcSwcbDK0','agPsqRDNS3g', 'NQcYZplTXnQ', 'oWjSdwzOA6k',  '45w-kqpWVGk']
    return(
        <Scrollbars style={{ width: "100%",height:800  }}>
        <>
            <Nav />
        {!isAuth ? (
            // <Redirect to="/register" />
            <h1 style={{textAlign:"center"}}>401 Unauthorized</h1>
        ) : (

            <>
            <h1 class="mh1">Mental Health Tips</h1>
            {
                vidcode.map((code) => (
                    <div class="motiv" key={code}>
                        <div class="m-b1"></div>
                        <div class="m-b2">
                            <iframe className="ytvid" width="700" height="400" src={`https://www.youtube.com/embed/${code}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="m-b3"></div>
                    </div>
                ))
            }
            </>
        )}
        <div className="empty"></div>
        </>
        </Scrollbars>
    )
}

export default Motivation;