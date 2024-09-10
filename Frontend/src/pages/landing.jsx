import React from 'react'
import "../App.css"
import { Link } from 'react-router-dom'; // Import Link
export default function LandingPage() {
  return (
 <div className='landingPageContainer'>
  <nav>
    <div className="navHeader">
      <h2>Meet Now</h2>
    </div>
    <div className="navlist">
      <p>Join as a Guest</p>
      <p>Register</p>
      <div role='button'>
        <p>Login</p>
      </div>
    </div>
  </nav>
  <div className="landingMainContainer">
    <div>
      <h1><span style={{color:"#FF9839"}}>Connect </span>with loved Onces</h1>
    <p>Cover a distance by MeetNow</p>
    <div role='button'>
      <Link to={"/home"}>Get Started</Link>
    </div>
    </div>
    <div>
      <img src="/mobile.png"></img>
    </div>
  </div>
 </div>
  )
}
