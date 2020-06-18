import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuoteDTO } from './quote.dto';

@Controller('quotes')
export class QuotesController {
    constructor (private quotesService: QuotesService) {}

    @Get()
    findAll() {
        return this.quotesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') quoteId: number) {
        return await this.quotesService.findById(quoteId);
    }

    @Post()
    async create(@Body() newQuote: QuoteDTO){
        return this.quotesService.create(newQuote);
    }

    @Delete(':id')
    async delete(@Param('id') quoteId) {
        return this.quotesService.delete(quoteId);
    }
}
