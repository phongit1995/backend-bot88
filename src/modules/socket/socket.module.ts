import { Module } from '@nestjs/common';
import { SocketGetWay } from './socket.getway';

@Module({
    providers:[SocketGetWay],
    exports:[SocketGetWay]
})
export class SocketModule {}
