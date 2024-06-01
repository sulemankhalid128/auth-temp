import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { UserSubscriber } from './subscribers/user.subscriber';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[ 
    TypeOrmModule.forFeature([User,Role]),
    JwtModule.registerAsync({
      useFactory:(configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string | number>('jwt.expiry'),
        },
      }),
      inject:[ConfigService]
    })
],
  providers: [UserResolver, UserService, UserSubscriber],
  exports:[UserService]
})
export class UserModule {}
