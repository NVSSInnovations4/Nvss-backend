import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './modules/leads/leads.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lead } from './modules/leads/leads.entity';
import { MailerModule } from './modules/mailer/mailer.module';
import { AdminsModule } from './modules/admins/admins.module';
import { AdminEmail } from './modules/leads/admins.entity';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [Lead, AdminEmail],
      synchronize: false,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: Number(process.env.TTL_FOR_RATELIMITER),
          limit: Number(process.env.MAX_REQUESTS_FOR_TTL),
        },
      ],
    }),
    LeadsModule,
    MailerModule,
    AdminsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
