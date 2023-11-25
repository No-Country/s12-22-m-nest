// socketManager.js

import io from 'socket.io-client'

const socket = io('ws://localhost:3001?userId=45&type=dealer')

// Configurar el socket según tus necesidades (emitir eventos, escuchar eventos, etc.)

export default socket
