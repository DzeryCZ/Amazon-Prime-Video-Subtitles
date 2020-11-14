export class Utils {
    static onReady(fn: Function, document: HTMLDocument): void {
        if (/in/.test(document.readyState)) {
            setTimeout(function() {
                Utils.onReady(fn, document);
            }, 100)
        } else {
            fn(document)
        }
    }
}
