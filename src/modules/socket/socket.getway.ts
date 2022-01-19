import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server} from 'socket.io';
@WebSocketGateway()
export class SocketGetWay  implements OnGatewayInit ,OnGatewayConnection , OnGatewayDisconnect{
    afterInit(server: any) {
        console.log('init success');
        this.server = server ;
    }

    handleConnection(client: any, ...args: any[]) {
        console.log('client connected');
    }
    handleDisconnect(client: any) {
        console.log('client disconnected');
    }
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('hello')
    async helloMessage(client:any,data){
        console.log('data',data);
    }
}