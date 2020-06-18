import { Module } from '@nestjs/common';

import { ReunionesModule } from 'src/reuniones/reuniones.module';
import { OcurrenciasModule } from 'src/ocurrencias/ocurrencias.module';
import { GrabacionesModule } from 'src/grabaciones/grabaciones.module';

import { RichTableService } from './richTable.service';
import { RichTableController } from './richTable.controller';

@Module({
  imports: [ReunionesModule, OcurrenciasModule, GrabacionesModule],
  controllers: [RichTableController],
  providers: [RichTableService],
})
export class RichTableModule {}
