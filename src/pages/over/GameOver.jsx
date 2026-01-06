import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../../App.css';


const GameOver = () => {

    const navigate = useNavigate();

  return (
    <div className="content">
      <h1>You've been murdered! ☠</h1>
      <button className="btn-action" onClick={()=>navigate("/")}>Play again?</button>
    </div>
  );
};

export default GameOver;
