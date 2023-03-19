import { Server } from 'socket.io';

const io = new Server(3000);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

io.on('connect', (socket) => {
  // 服务器接收到客户端消息
  socket.on('message', async (arg) => {
    console.log('我是服务器，我收到了：', arg);
    // 睡眠随机时间
    //await delay(100 + between(10, 200));
    // 服务器向客户端发送接收到的消息
    //socket.emit('hi', arg);
    socket.broadcast.emit('hi', arg);
  });
});

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
