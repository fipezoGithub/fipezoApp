import {io} from 'socket.io-client';
import {SERVER_URL} from '@env';
const socket = io.connect(`${SERVER_URL}/socket`);
export default socket;
