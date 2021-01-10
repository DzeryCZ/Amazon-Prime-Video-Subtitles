import { FileHandler } from './lib/Handler/FileHandler'
import { SrtParserHandler } from './lib/Handler/SrtParserHandler'
import { PlaybackHandler } from './lib/Handler/PlaybackHandler'
import { CloseHandler } from './lib/Handler/CloseHandler'
import { View } from './lib/View'
import { Utils } from './lib/Utils'
import { RegisterHandlers } from './lib/RegisterHandlers'

class AmazonPrimeSubtitles {
    public onLoad(document: HTMLDocument) {
        const registerHandlers = new RegisterHandlers(document);
        registerHandlers.registerHandler(FileHandler.EVENT_NAME, new FileHandler(document));
        registerHandlers.registerHandler(SrtParserHandler.EVENT_NAME, new SrtParserHandler(document));
        registerHandlers.registerHandler(PlaybackHandler.EVENT_NAME, new PlaybackHandler(document));
        registerHandlers.registerHandler(CloseHandler.EVENT_NAME, new CloseHandler(document));

        const view = new View(document);
        view.display()
    }
}

const amazonPrimeSubtitles = new AmazonPrimeSubtitles()
const webPlayerQuery = '.'+View.WEB_PLAYER_ELEMENT_CLASS
Utils.waitForElementExists(webPlayerQuery, amazonPrimeSubtitles.onLoad, [document])
