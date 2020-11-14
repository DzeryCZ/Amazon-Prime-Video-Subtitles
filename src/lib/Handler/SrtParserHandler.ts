import { OneSubtitle } from '../ValueObject/OneSubtitle'
import { HandlerInterface } from './HandlerInterface'
import { PlaybackHandler } from './PlaybackHandler'
import { EventWithData } from '../EventWithData'

export class SrtParserHandler implements HandlerInterface {
    static readonly EVENT_NAME = 'amazonPrimeSubtitlesParseSrt';
    readonly SECONDS_IN_HOUR = 3600
    readonly SECOND_IN_MINUTE = 60
    readonly SECOND_IN_SECOND = 1

    private document: HTMLDocument;

    constructor(document: HTMLDocument) {
        this.document = document;
    }

    public handle(event: EventWithData): void {
        let subtitles: OneSubtitle[] = [];
        const content = this.noralizeLineEnds(event.data);
        const parts: string[] = content.split('\n\n');
        parts.forEach((element: string) => {
            const subtitle = this.parseOnePart(element);
            subtitles.push(subtitle);
        });

        this.dispatchPlayEvent(subtitles);
    }

    private dispatchPlayEvent(subtitles: OneSubtitle[]) {
        const dropFileEvent = new EventWithData(PlaybackHandler.EVENT_NAME);
        dropFileEvent.data = subtitles;
        this.document.dispatchEvent(dropFileEvent);
    }

    private parseOnePart(element: string): OneSubtitle {
        const elementArray: string[] = element.split('\n');

        if (elementArray.length < 2) {
            return new OneSubtitle()
        }

        const startTime: string = this.strip(elementArray[1].split(' --> ')[0]);
        const endTime: string = this.strip(elementArray[1].split(' --> ')[1]);
        const text: string = elementArray.slice(2).join('<br>');

        const subtitle = new OneSubtitle();
        subtitle.startTime = this.srtTimeToSeconds(startTime);
        subtitle.endTime = this.srtTimeToSeconds(endTime);
        subtitle.text = text;

        return subtitle;
    }

    private strip(str: string): string {
        return str.replace(/^\s+|\s+$/g, "");
    }

    private noralizeLineEnds(str: string): string {
        return str.replace(/\r\n|\r|\n/g, '\n');
    }

    private srtTimeToSeconds(srtTime: string): number {
        let seconds:number = 0;
        const parts = srtTime.split(':');

        seconds += this.multiplyTimeParts(parts[0], this.SECONDS_IN_HOUR)
        seconds += this.multiplyTimeParts(parts[1], this.SECOND_IN_MINUTE)
        seconds += this.multiplyTimeParts(parts[2], this.SECOND_IN_SECOND)
        return seconds;
    }

    private multiplyTimeParts(srtTimePart: string, multiplyer: number) {
        return parseFloat(srtTimePart.replace(',', '.')) * multiplyer;
    }
}
