import { Injectable, HttpService, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';
import { QuoteDTO } from './quote.dto';
import { AxiosResponse } from "axios";

@Injectable()
export class QuotesService {
    constructor(@InjectRepository(Quote) private quotesRepository: Repository<Quote>, private httpService: HttpService) { }

    async findAll() {
        const quotes = await this.quotesRepository.find();
        return quotes;
    }

    async findById(quoteId: number) {
        const quotes = await this.quotesRepository.findByIds([quoteId]);
        return quotes[0] ? quotes[0] : quotes;
    }

    async create() {
        let quoteApiResponse: AxiosResponse<any> = await this.httpService.get('https://api.quotable.io/random').toPromise();
        let quote: string = quoteApiResponse.data.content;
        let author: string = quoteApiResponse.data.author;

        let wikiApiBase = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=';
        let wikiApiResponse: AxiosResponse<any> = await this.httpService.get(wikiApiBase + author).toPromise();
        
        let wikiObject = wikiApiResponse.data.query.pages;
        let keys = Object.keys(wikiApiResponse.data.query.pages);
        let urlImage = 'https://images-na.ssl-images-amazon.com/images/I/81YSzHtDg2L._AC_SL1200_.jpg';
        try {
            urlImage = wikiObject[keys[0]].original.source;
        } catch (error) {
            Logger.error(`No such Wikipedia image founded`, 'QuotesService')
        }

        let newQuote = new QuoteDTO(quote, urlImage);

        return this.quotesRepository.save(newQuote);
    }

    async delete(quoteId: number) {
        let quote = await this.quotesRepository.findByIds([quoteId])
        return this.quotesRepository.remove(quote[0]);
    }
}
