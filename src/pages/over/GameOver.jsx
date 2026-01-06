import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import '../../App.css';


const GameOver = () => {

    const navigate = useNavigate();
    const { state } = useLocation()


  return (
    <div className="content">
      <h1>You've been murdered by {state?.name}! ☠</h1>
      {/*<button className="btn-action" onClick={()=>navigate("/")}>Play again?</button>*/}
    </div>
  );
};

export default GameOver;
