import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

import { ReunionesModule } from './reuniones/reuniones.module';
import { OcurrenciasModule } from './ocurrencias/ocurrencias.module';
import { GrabacionesModule } from './grabaciones/grabaciones.module';
import { ArchivosModule } from './archivos/archivos.module';
import { RichTableModule } from './rich-table/richTable.module';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ReunionesModule,
    OcurrenciasModule,
    GrabacionesModule,
    ArchivosModule,
    RichTableModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
