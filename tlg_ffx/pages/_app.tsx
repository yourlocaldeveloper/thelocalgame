import { io } from 'socket.io-client';
import { useEffect } from 'react';

import { SocketContext } from '../providers/SocketContex';
import '../styles/globals.css';

const socket = io('http://localhost:3001', {
  autoConnect: false,
});

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    socket.connect();
    console.log('[SOCKET]: Attempting to connect');
    const onConnect = () => {
      console.log('[SOCKET]: CONNECTED');
    };

    const onDisconnect = () => {
      console.log('[SOCKET]: DISCONNECTED');
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      <Component {...pageProps} />
    </SocketContext.Provider>
  );
}
