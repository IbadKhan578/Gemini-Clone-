import React, { useState } from 'react'
import './sidebar.css';
import {assets} from '../../Assets/assets';

const Sidebar = () => {

   const [extended,setExtended]=useState(false);
     const [isHovered, setIsHovered] = useState(false);

   function handleExtended(){
    setExtended(e=>!extended)
   }

  function handleMouseHover(){
    setIsHovered(isHovered=>!isHovered)

   }

   function handleMouseHoverOut(){
    setIsHovered(isHovered=>false)

   }




  return (

    <div className="side-bar" onMouseEnter={handleMouseHover}  onMouseLeave={handleMouseHoverOut} >

<div className="top">
    <img  onClick={handleExtended } className="menu"src={assets.menu_icon} alt="" />
    <div className="new-chat">
        <img src={assets.plus_icon} alt="" />
      {(extended || isHovered)? <p>New Chat</p>: null }  
    </div>

   {(extended || isHovered)? <div className="recent">
<p className="recent-title">Recent</p>
<div className="recent-entry">
    <img src={assets.message_icon} alt="" />
    <p>What is react...</p>
</div>

    </div>: null}

</div>
<div className="bottom">
    <div className="bottom-item recent-entry">
        <img src={assets.question_icon} alt="" />
        {extended || isHovered ?<p>Help</p>:null}
    </div>

    <div className="bottom-item recent-entry">
        <img src={assets.history_icon} alt="" />
        {extended || isHovered? <p>Activity</p>:null}
    </div>

    <div className="bottom-item recent-entry">
        <img src={assets.setting_icon} alt="" />
        {extended || isHovered?<p>Settings</p> : null}
    </div>

</div>


    </div>
  )
}

export default Sidebar