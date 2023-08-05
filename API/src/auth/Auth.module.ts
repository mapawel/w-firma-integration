import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NonceEntity } from './entity/nonce.entity';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

dotenv.config();

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([NonceEntity]),
        JwtModule.register({ secret: process.env.JWT_SECRET }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
