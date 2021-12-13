import React from "react"
import Nav from "./Nav"

const Motivation = () => {
    const vidcode = ['vix0NbikS5o','ZWVcSwcbDK0','agPsqRDNS3g', 'NQcYZplTXnQ', 'oWjSdwzOA6k',  '45w-kqpWVGk']
    return(
        <>
        <Nav />
        <h1 class="mh1">Mental Health Videos</h1>
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
    )
}

export default Motivation;