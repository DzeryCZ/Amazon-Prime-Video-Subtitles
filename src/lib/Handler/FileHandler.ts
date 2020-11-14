import { SrtParserHandler } from './SrtParserHandler'
import { HandlerInterface } from './HandlerInterface'
import { EventWithData } from '../EventWithData'

export class FileHandler implements HandlerInterface {

    private document: HTMLDocument;

    constructor(document: HTMLDocument) {
        this.document = document;
    }
    
    static readonly EVENT_NAME = 'amazonPrimeSubtitlesDropFile';

    public handle(event: EventWithData): void {
        const file = event.data;
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
            const dropFileEvent = new EventWithData(SrtParserHandler.EVENT_NAME);
            dropFileEvent.data = event.target.result;
            this.document.dispatchEvent(dropFileEvent);
        });
        reader.readAsText(file, 'UTF-8');
    }
}
