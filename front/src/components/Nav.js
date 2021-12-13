import  React from "react";
import { Link } from "react-router-dom";
import "../styles.css"

const Nav = () => {
    return(
        <header>
            <nav class="navbar">
                <ul class="navul">
                    <div class="left">
                        <div class="item">
                            <h1>Psycare</h1>
                        </div>
                    </div>
                    <div class="right">
                        {/* <Link style={{
                            listStyle:"none",
                            fontSize:18,
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingRight: 20,
                            paddingLeft: 20,
                            fontWeight: 550
                        }} className="item" to="/tips" >Home</Link>
                        <Link class="item" style={{ listStyle: "none" }} href="/login" to="/login">Login</Link>
                        <Link class="item" to="/register">Register</Link> */}
                        <li className="item"><a href="/tips">Home</a></li>
                        <li className="item"><a href="/register">Register</a></li>
                        <li className="item"><a href="/login">login</a></li>
                    </div>
                </ul>
            </nav>
        </header>
    )
}

export default Nav;