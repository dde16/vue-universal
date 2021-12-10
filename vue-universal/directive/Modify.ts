import {DirectiveBinding, VNode} from "@vue/runtime-core";

export const Modify = {
    mounted(
        element: HTMLElement,
        bind: DirectiveBinding,
        vnode: VNode,
        ovnode: VNode|undefined
    ): void {
        bind.name = "v-modify";
    }
};