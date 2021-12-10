import { DirectiveBinding, VNode } from "@vue/runtime-core";

import { ContextMenuItem } from "./contextmenu/ContextMenuItem";

const directive = {
    beforeMount(element: HTMLElement, bind: DirectiveBinding, vnode: VNode, ovnode: VNode|undefined) {

        if(Object.isArray(bind.value) || Object.isFunction(bind.value)) {
            element[(bind.modifiers.leftClick && "onclick") ||  "oncontextmenu"] = function(event) {
                //@ts-ignore
                let overlay = bind.instance.nearest("v-overlayed");

                if(overlay) {
                    var items = bind.value;

                    if(Object.isFunction(items))
                        items = items();

                    if(!items.isEmpty()) {
                        items = items.map(
                            (item: ContextMenuItem) => {
                                let _click: (event: Event, item: ContextMenuItem) => any = item.click;
            
                                if(_click)
                                    item.click = (event: Event) => _click(event, item);
            
                                return item;
                            }
                        );

                        overlay.openOverlay(
                            "v-context-menu", {
                                vector: bind.modifiers.leftClick || bind.modifiers.element ? element : event,
                                items,
                                anchor: (
                                    (bind.modifiers.right && "right") || 
                                    (bind.modifiers.left && "left") || 
                                    (bind.modifiers.top && "top") || 
                                    (bind.modifiers.bottom && "bottom")
                                ),
                                width: bind.modifiers.large ? "24em" : "16em",
                                tolerance: bind.modifiers.leftClick ? 1 : 0
                            }
                        );

                        return false;
                    }
                }

                return true;
            };
        }
    }
};

export {directive as ContextMenu};