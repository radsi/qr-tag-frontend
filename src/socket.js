import { io } from 'socket.io-client';

const URL = "https://s6q84qcs-3000.uks1.devtunnels.ms";
console.log('test')
export const socket = io(URL);