import { FileHandler } from './Handler/FileHandler'
import { EventWithData } from './EventWithData'

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export class View {
    static readonly WEB_PLAYER_ELEMENT_ID = 'dv-web-player'
    static readonly SUBTITLES_CONTENT_ELEMENT_CLASS = 'amazon-subtitles-content'

    private document: HTMLDocument;

    constructor(document: HTMLDocument) {
        this.document = document;
    }

    public display(): void {
        const amazonSubtitlesElement = this.createSubtitlesElement();
        const webPlayerElemet = this.document.getElementById(View.WEB_PLAYER_ELEMENT_ID);
        webPlayerElemet.appendChild(amazonSubtitlesElement);
    }

    private createSubtitlesElement(): HTMLDivElement {
        const dropFilesElement = this.createDropFilesElement();
        const subtitlesContentElement = this.createSubtitlesContentEleent();

        const amazonSubtitlesElement = this.document.createElement("div");
        amazonSubtitlesElement.className = 'amazon-subtitles'
        amazonSubtitlesElement.appendChild(dropFilesElement)
        amazonSubtitlesElement.appendChild(subtitlesContentElement)

        return amazonSubtitlesElement;
    }

    private createDropFilesElement(): HTMLDivElement {
        const dropFilesElement = this.document.createElement("div");
        dropFilesElement.className = 'amazon-subtitles-drop-files'
        dropFilesElement.innerHTML = 'Drag a *.srt File Here<br>';

        const dropFileInputElement = this.document.createElement("input");
        dropFileInputElement.className = 'amazon-subtitles-drop-file-input'
        dropFileInputElement.type = 'file'

        dropFileInputElement.addEventListener('change', (event: HTMLInputEvent) => {
            dropFilesElement.style.display = 'none';
            const dropFileEvent = new EventWithData(FileHandler.EVENT_NAME);
            dropFileEvent.data = event.target.files[0];
            this.document.dispatchEvent(dropFileEvent);
        });

        dropFilesElement.appendChild(dropFileInputElement)

        return dropFilesElement;
    }

    private createSubtitlesContentEleent(): HTMLDivElement {
        const subtitlesContentElement = this.document.createElement("div");
        subtitlesContentElement.className = View.SUBTITLES_CONTENT_ELEMENT_CLASS;

        return subtitlesContentElement;
    }
}
