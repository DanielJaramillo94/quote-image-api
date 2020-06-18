import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuoteDTO } from './quote.dto';

@Controller('/api/v1/generate-changing-life-quote')
export class QuotesController {
    constructor(private quotesService: QuotesService) { }

    @Get()
    async create() {
        return this.quotesService.create();
    }

    @Get(':id')
    async findById(@Param('id') quoteId: number) {
        return await this.quotesService.findById(quoteId);
    }

    @Delete(':id')
    async delete(@Param('id') quoteId) {
        return this.quotesService.delete(quoteId);
    }
}
