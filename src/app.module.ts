import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

import { QuotesModule } from './quotes/quotes.module';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    QuotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
