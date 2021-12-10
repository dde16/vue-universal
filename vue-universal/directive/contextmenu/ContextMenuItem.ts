export interface ContextMenuItem {
    caption: string,
    icon: string[]|HTMLImageElement|string,
    click: (event: Event, item: ContextMenuItem) => any
}