import { Controller, Get, Req, Res, Session, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.authguard';
import { AuthenticatedGuard } from './local.authguard';
import { CreatePlayerDto } from 'src/player/dto/create-player.dto';
import { PlayerService } from 'src/player/player.service';
import * as session from 'express-session';
import * as speakeasy from 'speakeasy';
import * as qrCode from 'qrcode';

const playerService = new PlayerService();


@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Get('/42')
    async fortyTwoLogin() {
        return ('you have entered my king');
    }

    @UseGuards(LocalAuthGuard)
    @Get('/42/callback')
    async fortyTwoCallback(@Req() req: any, @Res() res: any, @Session() session: Record<string, any>) {
        session.authenticated = true;
        res.redirect('http://localhost:8080/Login?username=' + req.user.username);
    }

    @Get("session")
    async session(@Session() session: Record<string, any>) {
        console.log(session);
        console.log(session.id);
    }

    @Get('FetchUser')
    async FetchUser(@Req() req: any) {
        if (!req.user)
            return 'Codammer';
        return req.user.username;
    }

    @Get('/logout')
    async fortyTwoLogout(@Req() req: any, @Res() res: any) {
        req.logout();
        res.redirect('http://localhost:3000/');
    }

    @Get('2fa')
    async twoFactorAuth(@Req() req: any, @Res() res: any, @Session() session: Record<string, any>) {
        var secret = speakeasy.generateSecret({ 
            name: 'trance',
        });
        req.session.passport.user.tfasecret = secret.base32;
        qrCode.toDataURL(secret.otpauth_url, (err, data) => {
            if (err)
                return res.send('Error occured');
            res.send(data);
        });
    }

    @Get('2fa/verify')
    async twoFactorAuthVerify(@Req() req: any, @Res() res: any, @Session() session: Record<string, any>) {
        const token = req.query.token;
        const secret = req.query.secret;
        const verified = speakeasy.totp.verify({
            secret: req.session.passport.user.tfasecret,
            encoding: 'base32',
            token: token,
        });
        if (verified) {
            console.log('2fa verified');
            res.send('2fa verified, you will be redirected to the login page');
        } else {
            console.log('incorrect code');
            res.send('incorrect code');
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Get('status')
    async GetAuthStatus(@Req() req: any) {
        return(req.session.passport.user.intra_username);
        // return(req);
    }
}
