import React from "react";
import Nav from "./Nav";

const Joke = () =>{
    fetch("https://api.chucknorris.io/jokes/random",()=>{
        
    })
    return(
        <div className="jokecontainer">
            <h2></h2>
        </div>
    )
}