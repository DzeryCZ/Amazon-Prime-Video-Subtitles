export class Utils {    
    static waitForElementExists(selector: string, callback: Function, attributes: Array<any>) {
        (function loopSearch() {
            if (document.querySelector(selector) != null) {
                callback(...attributes);
                return;
            } else {
            setTimeout(function () {
                loopSearch();
            }, 1000);
            }
        })();
    }
}
