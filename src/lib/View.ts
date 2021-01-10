import { FileHandler } from './Handler/FileHandler'
import { CloseHandler } from './Handler/CloseHandler'
import { EventWithData } from './EventWithData'

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export class View {
    static readonly WEB_PLAYER_ELEMENT_CLASS = 'scalingVideoContainer'
    static readonly SUBTITLES_CONTENT_ELEMENT_CLASS = 'amazon-subtitles-content'
    static readonly AMAZON_SUBTITLES_CLASS = 'amazon-subtitles'

    private document: HTMLDocument;

    constructor(document: HTMLDocument) {
        this.document = document;
    }

    public display(): void {
        const amazonSubtitlesElement = this.createSubtitlesElement();
        const webPlayerElemet = this.document.getElementsByClassName(View.WEB_PLAYER_ELEMENT_CLASS)[0];
        webPlayerElemet.appendChild(amazonSubtitlesElement);
    }

    private createSubtitlesElement(): HTMLDivElement {
        const dropFilesElement = this.createDropFilesElement();
        const subtitlesContentElement = this.createSubtitlesContentEleent();

        const amazonSubtitlesElement = this.document.createElement("div");
        amazonSubtitlesElement.className = View.AMAZON_SUBTITLES_CLASS
        amazonSubtitlesElement.appendChild(dropFilesElement)
        amazonSubtitlesElement.appendChild(subtitlesContentElement)

        return amazonSubtitlesElement;
    }

    private createDropFilesElement(): HTMLDivElement {
        const dropFilesElement = this.document.createElement("div");
        dropFilesElement.className = 'amazon-subtitles-drop-files'
        dropFilesElement.innerHTML = 'Drag a *.srt File Here<br>';

        const closeElement = this.createCloseElement();
        dropFilesElement.appendChild(closeElement);

        const dropFileInputElement = this.document.createElement("input");
        dropFileInputElement.className = 'amazon-subtitles-drop-file-input'
        dropFileInputElement.type = 'file'

        dropFileInputElement.addEventListener('change', (event: HTMLInputEvent) => {
            dropFilesElement.style.display = 'none';
            const dropFileEvent = new EventWithData(FileHandler.EVENT_NAME);
            dropFileEvent.data = event.target.files[0];
            this.document.dispatchEvent(dropFileEvent);
        });

        dropFilesElement.appendChild(dropFileInputElement);

        return dropFilesElement;
    }

    private createCloseElement(): HTMLDivElement {
        const closeIconElement = this.document.createElement("span");
        closeIconElement.className = 'amazon-subtitles-close-icon'
        closeIconElement.innerHTML = '+';

        const closeElement = this.document.createElement("div");
        closeElement.className = 'amazon-subtitles-close'
        closeElement.appendChild(closeIconElement)

        closeElement.addEventListener('click', () => {
            const closeEvent = new EventWithData(CloseHandler.EVENT_NAME);
            this.document.dispatchEvent(closeEvent);
        });

        return closeElement;
    }

    private createSubtitlesContentEleent(): HTMLDivElement {
        const subtitlesContentElement = this.document.createElement("div");
        subtitlesContentElement.className = View.SUBTITLES_CONTENT_ELEMENT_CLASS;

        return subtitlesContentElement;
    }
}
