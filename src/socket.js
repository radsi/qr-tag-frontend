import { io } from 'socket.io-client';

const URL = 'http://localhost:3000/socket';

export const socket = io(URL);