import { useState, useEffect } from 'react';
import '../../App.css';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useNavigate } from "react-router-dom";
import { socket } from '../../socket';


const HomePage = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [showScanner, setShowScanner] = useState(false)

  const [isLoading, setIsLoading] = useState(false);
  
  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    var value = JSON.stringify({name, id})

    socket.emit('register', value, () => {
      setIsLoading(false);
    });
  }

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onRegistrationReply(data){
      navigate("/game", {state: data})
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('registration_reply', onRegistrationReply)

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('registration_reply', onRegistrationReply)

    };
  }, []);

  return (
    <div className="content">
      {showScanner ? <Scanner
        onScan={(result) => console.log(result) & setId(result)}
        onError={(error) => console.log(error?.message)}
        /> : <button className="btn-action" onClick={() => setShowScanner(true)}>Show scanner</button>}
      <h1>QR TAG</h1>
      
        {id == "" ? <p>Scan your QR first!</p> : <form action="/submitqr">
        <div className="input-group">
          <input
          onChange={(e)=>setName(e.target.value)}
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
          />
          <button onClick={(e)=>onSubmit(e)} id="btn-send">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </form>}
    </div>
  );
};

export default HomePage;
