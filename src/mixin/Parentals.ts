
import { ComponentOptionsMixin, VNode } from "@vue/runtime-core";

export const Parentals = {
    methods: {
        nearest(filter: Function|string) {
            if(Object.isString(filter)) {
                let name = filter;

                filter = (parent: VNode) => parent._.vnode?.type?.name === name;
            }

            return (!filter && this.$parent) || (this.$parent
                ? (filter(this.$parent)
                    ? this.$parent
                    : this.$parent.nearest(filter)
                )
                : undefined
            );
        }
    }
}  as ComponentOptionsMixin;
