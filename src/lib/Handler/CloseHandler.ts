import { EventWithData } from '../EventWithData';
import { HandlerInterface } from './HandlerInterface';
import { View } from '../View';

export class CloseHandler implements HandlerInterface {

    static readonly EVENT_NAME = 'amazonPrimeSubtitlesClose';

    private document: HTMLDocument;

    constructor(document: HTMLDocument) {
        this.document = document;
    }

    handle(event: EventWithData): void {
        const subtitlesContetnElement = this.document.getElementsByClassName(View.AMAZON_SUBTITLES_CLASS)[0];
        subtitlesContetnElement.remove();
    }
}
