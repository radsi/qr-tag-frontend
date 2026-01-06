import { useState, useEffect } from 'react';
import '../../App.css';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from 'react-confetti'
import {socket} from "../../socket"

const Game = () => {

    const { state } = useLocation()
    const navigate = useNavigate();

  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [targetName, setTargetName] = useState(state.target_name ?? "NO TARGET")
  const [targetId, setTargetId] = useState('') 
  const [playersAlive, setPlayersAlive] = useState(10)

  const [isConnected, setIsConnected] = useState(socket.connected);

  function onScan(data){
    if (data[0].rawValue != targetId) return

    socket.emit("kill", data[0].rawValue)
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onDead(data){
        navigate("/gameover", {state: data})
    }

    function onGameStarted(updated_player, alive_players){
        setTargetName(updated_player.target_name)
        setTargetId(updated_player.target_id)
        setPlayersAlive(alive_players)
    }

    function onGameFinished(data){
        setTargetName(data.target_name)
        setTargetId(data.target_id)
    }



    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('dead', onDead)
    socket.on('game_started', onGameStarted)
    socket.on('game_finished', onGameFinished)

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('dead', onDead)
      socket.off('game_started', onGameStarted)
      socket.off('game_finished', onGameFinished)
    };
  }, []);

  return (
    <div className="content">
        {playersAlive == 0 ? <h1>You won!</h1> : <h1>TARGET: {targetName}</h1>}

        <Scanner
            onScan={(result) => onScan(result)}
            onError={(error) => console.log(error?.message)}
        />

        {playersAlive == 1 && <Confetti />}
    </div>
  );
};

export default Game;
