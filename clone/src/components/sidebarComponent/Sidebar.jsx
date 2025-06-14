import React, { useContext, useState } from 'react';
import './sidebar.css';
import { assets } from '../../Assets/assets';
import { Context } from '../../context/context';


const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { prevPrompt, showPreviousPrompt,newChat } = useContext(Context);

  function handleExtended() {
    setExtended(prev=>!prev);
  }

  function handleMouseHover() {
    setIsHovered(isHovered=> !isHovered);
  }

  function handleMouseHoverOut() {
    setIsHovered(false);
  }

  return (
    <div
  className={`side-bar ${!extended && !isHovered ? "closed" : ""}`}
>

      <div className="top">
        <img onClick={handleExtended} className="menu" src={assets.menu_icon} alt="" />
        <div className="new-chat" onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseHoverOut} 
          onClick={()=>newChat()}>
          <img src={assets.plus_icon} alt="" />
          {(extended || isHovered) ? <p>New Chat</p> : null}
        </div>

        {(extended || isHovered) ? (
          <div className="recent"   onMouseEnter={handleMouseHover}
                                    onMouseLeave={handleMouseHoverOut} >
            <p className="recent-title">Recent</p>
            {
              prevPrompt.map((item, index) => (
                <div
                  key={index}
                  className="recent-entry"
                  onClick={() => showPreviousPrompt(item)}
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.prompt.slice(0, 20)}...</p>
                </div>
              ))
            }
          </div>
        ) : null}
      </div>

      <div className="bottom"    onMouseEnter={handleMouseHover}
                                 onMouseLeave={handleMouseHoverOut} >
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended || isHovered ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended || isHovered ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended || isHovered ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
