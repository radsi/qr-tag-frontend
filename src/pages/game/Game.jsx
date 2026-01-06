import { useState, useEffect } from 'react';
import '../../App.css';
import { Scanner } from '@yudiel/react-qr-scanner';
import { socket } from '../../socket';


const Game = () => {
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [targetName, setTargetName] = useState('no target')
  const [targetId, setTargetId] = useState('') 

  const [isConnected, setIsConnected] = useState(socket.connected);

  function onScan(data){
    if (data != targetId) return

    socket.emit("kill", JSON.stringify({target_id: targetId}))
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);

    };
  }, []);

  return (
    <div className="content">
        <h1>TARGET: {targetName}</h1>

        <Scanner
            onScan={(result) => onScan(result)}
            onError={(error) => console.log(error?.message)}
        />
    </div>
  );
};

export default Game;
