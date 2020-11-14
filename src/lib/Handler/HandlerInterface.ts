import { EventWithData } from '../EventWithData'

export interface HandlerInterface {
    handle(event: EventWithData): void;
}
