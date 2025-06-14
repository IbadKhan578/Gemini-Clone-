import React, { useContext, useEffect, useState } from 'react'
import './../mainComponent/main.css';
import {assets} from '../../Assets/assets';
import { Context } from '../../context/context';

const Main = () => {

    
const {onSent,prevPrompt,setPrevPrompt,recentPrompt,setRecentPrompt,showResult,loading,resultData,input,setInput}=useContext(Context);









  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <div className="toggle">
             <img src={assets.user_icon} alt="" />

            </div>
            
        </div>

        <div className="main-container">
            
           { (!showResult)?<>
            <div className="greeting">
                <p> <span>Hello, Ibad</span></p>
                <p>How can I help you today</p>
            </div>
             
             <div className="cards">
                <div className="card">
                    <p>Suggest some beautiful places to explore on new trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                  <div className="card">
                    <p>Briefly summerize this concept: urban planning </p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                  <div className="card">
                    <p>brainstorm team bonding activites for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                  <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
             </div>
           </>
           :
           <div className="result">
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {
                    loading? <div className="loader"> 
                    
                    <hr />
                    <hr />
                    <hr />
                    
                    </div> : 
                                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>


                }



            </div>

           </div>

           }

             <div className="main-bottom">
                <div className="search-box">
                    <input  onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Ask Gemini' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img  onClick={()=>onSent()} src={assets.send_icon}alt="" />
                    </div>
                  
                </div>
                  <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double-check its response. Your privacy and Gemini Apps
                    </p>

             </div>



        </div>


    </div>
  )
}

export default Main