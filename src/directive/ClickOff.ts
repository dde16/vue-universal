import {DirectiveBinding, VNode} from "@vue/runtime-core";

const directive = {
    created(element: HTMLElement, bind: DirectiveBinding, vnode: VNode, ovnode: VNode|undefined): void {
        if(Object.isFunction(bind.value)) {
            window['clickoffs'].push([element, bind.value]);
        }
    }
};

// directive.beforeUpdate = directive.beforeCreate;

export default directive;