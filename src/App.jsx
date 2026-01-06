import { useState, useEffect } from 'react';
import './App.css';
import { Scanner } from '@yudiel/react-qr-scanner';
import { socket } from './socket';


const App = () => {
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [showScanner, setShowScanner] = useState(false)

  const [isLoading, setIsLoading] = useState(false);
  
  function onSubmit() {
    if(name == '' || id =='') return

    setIsLoading(true);

    var valueToSend = {"name": name, "id": id}

    socket.emit('register', valueToSend, () => {
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

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);

    };
  }, []);

  return (
    <div className="content">
      <button onClick={() => setShowScanner(true)}>Show scanner</button>
      {showScanner && <Scanner
        onScan={(result) => console.log(result) & setId(result)}
        onError={(error) => console.log(error?.message)}
      />}
      <h1>QR TAG</h1>
      
        {id == "id" ? <p>Scan your QR first!</p> : <form action="/submitqr">
        <div className="input-group">
          <input
          onChange={(e)=>setName(e.target.value)}
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
          />
          <button onClick={()=>onSubmit()} id="btn-send">
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

export default App;
