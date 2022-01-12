import React from 'react'
import Nav from "./Nav"
import yoga1 from "./img/yoga1.png"
import group from "./img/group.png"
import doc from "./img/doc.png"
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars-2';

const Home = () =>{
    return(
        <Scrollbars style={{ width: "100%",height:800  }}>
        <>
        <Nav />
        <div className="titletext"> 
            <h1>Welcome to </h1><span>Psycare</span>
            {/* <h1>Welcome to <i className='name'><span>Psycare</span></i></h1> */}
        </div>
        <div className="home-container">
            <div className="home-left">
                <div className='group'>
                <h1><i>Take Psycare's Mental Health Assessment and test how good is your Mental Health</i></h1>
                <p>We assess every part of your inner feeling by asking you simple questions on your day to day activites. We also provide suggestions and  remedies based on assessment.Give it a try!!</p>
                <Link to="/test" className='link'>Take Assessment NOW!</Link>
                </div>
                <img src={yoga1} alt="" className='img1' />
                <i><h1>Some Steps to Take care of Yourself !</h1></i>
                <ul className='list'>
                    <li># Talk about your feelings</li>
                    <li># Eat well</li>
                    <li># Take a break</li>
                    <li># Do something you're good at</li>
                    <li># Take time to laugh.</li>
                </ul>
            </div>
            <div className="home-right">
                <img src={doc} alt="" className='img3'/>
                <div className="line"></div>
                <div className="group-1">                    
                <h1><i>What is Mental Health ?</i></h1>
                <p>Mental health is a state of well-being in which an individual realizes his or her own abilities, can cope with the normal stresses of life, can work productively, and is able to make a contribution to his or her community.Mental health can affect daily living, relationships, and physical health.</p>
                </div>
                <img src={group} alt="" className='img2'/>
            </div>
        </div>
        </>
        </Scrollbars>
    )
}

export default Home;