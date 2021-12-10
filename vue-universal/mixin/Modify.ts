
import { ComponentOptionsMixin, VNode } from "@vue/runtime-core";

export const Modify = {
    mounted() {
        (this._.vnode.dirs || [])
            .filter(dir => dir.name === "v-modify")
            .forEach((directive) => {
                let modifiers = directive.value;

                if(directive.arg)
                    modifiers = {
                        [directive.arg]: modifiers
                    };

                Object.forEach(modifiers, (modifier, ref) => {
                    if(this.$refs[ref]) {
                        modifier(this.$refs[ref]);
                    }
                });
            });
    }
}  as ComponentOptionsMixin;
