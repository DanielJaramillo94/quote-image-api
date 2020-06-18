export class QuoteDTO {
    quote: string;
    image: string;

    constructor(quote: string, image: string) {
        this.quote = quote;
        this.image = image;
    }
}