import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({
  cors:{
    origin: '*',
    allowedHeaders:
      'X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept,Observe,Access-Control-Allow-Headers,Origin,Authorization,token,access-control-allow-origin',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
  }
})
export class SocketGetWay
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  afterInit(server: any) {
    console.log('init success');
    this.server = server;
  }

  handleConnection(client: any, ...args: any[]) {
    if (client.handshake.query.id) {
      client.join(client.handshake.query.id);
    }
    console.log('client connected');
  }
  handleDisconnect(client: any) {
    console.log('client disconnected');
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('hello')
  async helloMessage(client: any, data) {
    console.log('data', data);
  }
  @SubscribeMessage('joinRoom')
  async joinRoom(client: any, data: string) {
    client.join(data);
    console.log('join room : ' + data + ' success');
  }
}
