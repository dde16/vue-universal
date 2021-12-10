export {};
import {ClickOffItem} from "../directive/clickoff/ClickOffItem";

declare global {
    interface Window {
        clickoffs: ClickOffItem[]
    }
}

Window.prototype.clickoffs = [];