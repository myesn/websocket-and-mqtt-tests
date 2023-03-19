// const mqtt = require('mqtt')
import mqtt from 'mqtt';
import { faker } from '@faker-js/faker';

const userId = faker.random.word();
// 连接选项
const options = {
  clean: true, // true: 清除会话, false: 保留会话
  connectTimeout: 1000, // 超时时间
  protocolVersion: 5,
  // 认证信息
  clientId: `emqx_client_${userId}`,
  username: 'client',
  password: '123456',
};

// 连接字符串, 通过协议指定使用的连接方式
// ws 未加密 WebSocket 连接
// wss 加密 WebSocket 连接
// mqtt 未加密 TCP 连接
// mqtts 加密 TCP 连接
// wxs 微信小程序连接
// alis 支付宝小程序连接

// 不同连接方式对应的端口
// 1883	MQTT端口
// 8883	MQTT / SSL端口
// 8083	MQTT / WebSocket端口
// 8084	MQTT / WebSocket / SSL端口
// 8080	HTTP管理API端口
// 18083	Web仪表板端口
const connectUrl = 'mqtt://mac.pro:1883';
const client = mqtt.connect(connectUrl, options);

client.on('connect', (packet) => {
  console.log('连接成功:', packet);

  //setInterval(pub, 0);
  pub();
  pub();
  pub();
});

client.on('reconnect', (error) => {
  console.log('正在重连:', error);
});

client.on('error', (error) => {
  console.log('连接失败:', error);
});

// client.on('message', (topic, message) => {
//   console.log('收到消息：', topic, message.toString());
// });

// room/{userId}
const topic = `room/${userId}`;
let index = 0;
function pub() {
  const message = JSON.stringify({ id: index++, x: 1, y: 2 });
  client.publish(topic, message, {
    qos: 2,
    retain: true,
  });
  console.log('pub:', message);
}
