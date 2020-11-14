import { EventWithData } from "./EventWithData";
import { HandlerInterface } from "./Handler/HandlerInterface";

export class RegisterHandlers {

    private document: HTMLDocument;

    constructor(document: HTMLDocument) {
        this.document = document
    }

    public registerHandler(name: string, handler: HandlerInterface): void {
        this.document.addEventListener(name, (event: EventWithData) => handler.handle(event));
    }
}
