import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // prendi da header "Authorization: Bearer <token>"
            ignoreExpiration: false,                                  // rispetta scadenza
            secretOrKey: process.env.JWT_SECRET || 'mySecretKey',     // la stessa secret usata per firmare
        });
    }

    // passport chiama validate() se il token è valido (firma ok, non scaduto).
    // Il valore che ritorni qui verrà aggiunto a req.user
    async validate(payload: { sub: number; email: string }) {
        // variante basic: ritorno il payload
        // return { userId: payload.sub, email: payload.email };

        // variante robusta: controllo che l'utente esista ancora nel DB
        const user = await this.usersService.findOne(payload.sub);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        // rimuovi campi sensibili se vuoi:
        const { password, ...safe } = user as any;
        return safe; // questo diventa req.user nel controller
    }
}
