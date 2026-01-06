import { io } from 'socket.io-client';

const URL = import.meta.env.SERVER_URL;

export const socket = io(URL);