import { io } from 'socket.io-client';

const socket = io('ws://localhost:3000');

// 客户端接收服务器发来的消息
socket.on('hi', (arg) => {
  console.log('我是客户端，我收到了：', arg);
});

// 客户端向服务器发送 100 条消息
// for (let index = 0; index < 100_0000; index++) {
//   socket.emit('message', index);
// }
let index = 0;
setInterval(()=> socket.emit('message', `Client-E-${index++}`), 20);