import { WebSocketGateway, 
        SubscribeMessage,
        MessageBody, 
        WebSocketServer, 
        ConnectedSocket,
        OnGatewayInit,
        OnGatewayConnection,
        OnGatewayDisconnect, } from '@nestjs/websockets';
// import { MessageService } from '../message/message.service';
import { PlayerService } from 'src/player/player.service';
import { ChannelService } from 'src/channel/channel.service';
// import { CreateMessageDto } from '../message/dto/create-message.dto';
import { CreatePlayerDto } from 'src/player/dto/create-player.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChannelmemberService } from 'src/channelmember/channelmember.service';

@WebSocketGateway({
	cors: {
		origin: 'http://localhost:8080', // allow only from our frontend
	},
})
export class ChatGateway { //implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

    constructor(
        // private readonly messageService: MessageService,
        private readonly playerService: PlayerService,
        private readonly channelmemberService: ChannelmemberService
        // private readonly channelService: ChannelService,
    ) {}
    private logger = new Logger('ChatGateway');

    // handleConnection(@ConnectedSocket() client: Socket){
    //   this.logger.log(`client connected ${client.id}`)
    // }

    // handleDisconnect(@ConnectedSocket() client: Socket){
    //   this.logger.log(`client disconnected ${client.id}`)
    // }

    @SubscribeMessage('addPlayer')
    async addPlayer(
        @MessageBody() createPlayerDto: CreatePlayerDto
    ){
        const player = await this.playerService.createPlayer(createPlayerDto);
        this.server.emit('player', player)
        return player;
    }

    @SubscribeMessage('findAllOnlinePlayers')
    findAllOnlinePlayers(){
        return this.playerService.findAllStats();
    }

    @SubscribeMessage('findAllChannels')
    findAllChannels(
        @MessageBody() id: number
    ){
        return this.channelmemberService.findAllChannels(id);
    }

    // @SubscribeMessage('findAllChannelMessages')
    // findAllChannelMessages(
    //     @MessageBody() payload: { channelName: string}
    // ){
    //     return this.messageService.findAllChannelMessages(payload.channelName);
    // }

    // @SubscribeMessage('join')
    // joinChannel(
    //     @MessageBody() payload: { playerName: string, channelName: string},
    //     @ConnectedSocket() client: Socket
    // ){
    //     client.join(payload.channelName);
    //     console.log(payload.playerName, ' joins ', payload.channelName);
    //     return true;
    //     // client.broadcast.emit('userJoined', payload.playerName);
    // }
}

