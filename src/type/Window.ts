declare interface Window {
    clickoffs: {
        0: HTMLElement;
        1: Function;
    }[]
}

Window.prototype.clickoffs = [];