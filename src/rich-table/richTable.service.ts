import { Injectable } from '@nestjs/common';

import { ReunionesService } from 'src/reuniones/reuniones.service';
import { OcurrenciasService } from 'src/ocurrencias/ocurrencias.service';
import { GrabacionesService } from 'src/grabaciones/grabaciones.service';

@Injectable()
export class RichTableService {
    constructor(
        private reunionesService: ReunionesService,
        private ocurrenciasService: OcurrenciasService,
        private grabacionesService: GrabacionesService,
    ) { }

    async getRichTableData(limit: number, offset: number) {
        const reuniones = await this.reunionesService.findAll(limit, offset);
        let data: any[] = []
        for (const reunion of reuniones) {
            let ocurrencias = await this.reunionesService.findOcurrencias(reunion.id);
            for (const ocurrencia of ocurrencias) {
                let grabaciones = await this.ocurrenciasService.findGrabaciones(ocurrencia.id);
                for (const grabacion of grabaciones) {
                    let archivos = await this.grabacionesService.findArchivos(grabacion.id);
                    let archivosData = [];
                    for (const archivo of archivos) {
                        archivosData.push(archivo);
                    }
                    let dataObj = {
                        reunion: {},
                        ocurrencia: {},
                        grabacion: {},
                        archivos,
                    }
                    dataObj.reunion = reunion
                    dataObj.ocurrencia = ocurrencia
                    dataObj.grabacion = grabacion
                    dataObj.archivos = archivosData
                    data.push(dataObj)
                }
                if (grabaciones.length != 0) {
                    continue
                }
                let dataObj = {
                    reunion: {},
                    ocurrencia: {},
                }
                dataObj.reunion = reunion
                dataObj.ocurrencia = ocurrencia
                data.push(dataObj)
            }
            if (ocurrencias.length != 0) {
                continue
            }
            let dataObj = {
                reunion: {},
            }
            dataObj.reunion = reunion
            data.push(dataObj)
        }
        return data
    }
}
