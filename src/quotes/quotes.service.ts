import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';
import { QuoteDTO } from './quote.dto';

@Injectable()
export class QuotesService {
    constructor(@InjectRepository(Quote) private quotesRepository: Repository<Quote>) {}

    async findAll() {
        const quotes =  await this.quotesRepository.find();
        return quotes;
    }

    async findById(quoteId: number) {
        const quotes =  await this.quotesRepository.findByIds([quoteId]);
        return quotes[0] ? quotes[0] : quotes;
    }

    async create(newQuote: QuoteDTO) {
        return this.quotesRepository.save(newQuote);
    }

    async delete(quoteId: number) {
        let quote = await this.quotesRepository.findByIds([quoteId])
        return this.quotesRepository.remove(quote[0]);
    }
}
