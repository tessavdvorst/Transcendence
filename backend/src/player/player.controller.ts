import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'multer';


@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  // CREATE NEW PLAYER
  @Post('create')
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.createPlayer(createPlayerDto);
  }

  // UPLOAD AN AVATAR
  @Post('avatar/upload/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadAvatar(@Param('id') id: number, @UploadedFile() file: File) {
    return this.playerService.uploadAvatar(+id, file);
  }

  // GET ALL PLAYER STATS (FOR LEADERBOARD)
  @Get('leaderboard')
  findAllStats() {
    return this.playerService.findAllStats();
  }

  // GET ALL STATS FOR ONE PLAYER
  @Get('stats/:id')
  findOneStats(@Param('id') id: string) {
    return this.playerService.findOneStats(+id);
  }

  // GET PLAYERS ACHIEVEMENTS
  @Get('achievements/:id')
  findOneAchievements(@Param('id') id: string) {
    return this.playerService.findOneAchievements(+id);
  }

  // GET NUMBER OF ACHIEVED ACHIEVEMENTS
  @Get('totalachievements/:id')
  findAchievementsTotal(@Param('id') id: string) {
    return this.playerService.findAchievementsTotal(+id);
  }

  // GET USERNAME
  @Get('username/:id')
  findOneUsername(@Param('id') id: string) {
    return this.playerService.findOneUsername(+id);
  }

  // GET AVATAR
  @Get('avatar/:id')
  findOneAvatar(@Param('id') id: string) {
    return this.playerService.findOneAvatar(+id);
  }

  // GET PERCENTAGE WINS
  @Get('percentagewins/:id')
  findPercentageWins(@Param('id') id: string) {
    return this.playerService.findPercentageWins(+id);
  }

  // GET STATUS
  @Get('status/:id')
  findStatus(@Param('id') id: string) {
    return this.playerService.findStatus(+id);
  }

  // CHANGE USERNAME
  @Patch('username/:id')
  updateUsername(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.updateUsername(+id, updatePlayerDto);
  }

  // +1 WINS
  @Patch('wins/:id')
  updateWins(@Param('id') id: string) {
    return this.playerService.updateWins(+id);
  }

  // +1 LOSSES
  @Patch('losses/:id')
  updateLosses(@Param('id') id: string) {
    return this.playerService.updateLosses(+id);
  }

  // CHANGE STATUS
  @Patch('status/:id')
  updateStatus(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.updateStatus(+id, updatePlayerDto);
  }

  // DELETE A PLAYER
  @Delete('delete/:id')
  deletePlayer(@Param('id') id: string) {
    return this.playerService.deletePlayer(+id);
  }

  // ACHIEVE AN ACHIEVEMENT
  @Patch('achieve/:id')
  achieveAchievement(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.achieveAchievement(+id, updatePlayerDto);
  }

  // CHECK IF PLAYER EXISTS
  @Get('exists/:username')
  isExistingPlayer(@Param('username') username: string) {
    return this.playerService.isExistingPlayer(username);
  }

}
