import { Controller, Get, Query } from '@nestjs/common';
import { RichTableService } from 'src/rich-table/richTable.service';

@Controller('richTable')
export class RichTableController {
    constructor (private richTableService: RichTableService) {}

    @Get()
    async getRichTableData(
        @Query('limit') limit: number = 1,
        @Query('offset') offset: number = 0
    ) {
        return this.richTableService.getRichTableData(limit, offset);
    }
}
