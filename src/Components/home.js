import React from "react";
import './home.css';
import Header from "./header";
import Projects from "./projects";
import Profile from "./profile";
import Dashboard from "./dashboard";
import MusicPlayer from "./musicplayer.js";

function Home(){
    return (
        <div className="home-container">
            <section id="home-left">
                <Profile/>
            </section>
            <section id="home-middle">
            
            </section>
            <section id="home-right">
                <Projects/>
            </section>
        </div>
    )

}
export default Home;