import { EventWithData } from '../EventWithData';
import { HandlerInterface } from './HandlerInterface';
import { View } from '../View';
import { OneSubtitle } from '../ValueObject/OneSubtitle'

export class PlaybackHandler implements HandlerInterface {

    static readonly EVENT_NAME = 'amazonPrimeSubtitlesPlaySubtitles';
    static readonly SHOW_INTERVAL = 200; // ms

    private document: HTMLDocument;

    constructor(document: HTMLDocument) {
        this.document = document;
    }

    handle(event: EventWithData): void {
        const subtitles = event.data;
        const videoElement = this.document.getElementsByTagName('video')[0];
        const subtitlesContetnElement = this.document.getElementsByClassName(View.SUBTITLES_CONTENT_ELEMENT_CLASS)[0];
        this.showSubtitles(subtitles, videoElement, subtitlesContetnElement);
    }

    showSubtitles(subtitles: OneSubtitle[], videoElement: HTMLVideoElement, subtitlesContetnElement: Element) {
        setInterval(() => {
            const currentTime = videoElement.currentTime;
            const subtitleToShow = subtitles.find(subtitle => subtitle.startTime <= currentTime && subtitle.endTime >= currentTime);
            if (subtitleToShow) {
                subtitlesContetnElement.innerHTML = subtitleToShow.text;
            } else {
                subtitlesContetnElement.innerHTML = '';
            }
        }, PlaybackHandler.SHOW_INTERVAL)
    }
}
