import {ComponentState} from "../vue/ComponentState";
import {ComponentOptionsMixin} from "@vue/runtime-core";

const mixin: ComponentOptionsMixin = {
    data(): {} {
        this.staticKey = 0;

        return {
            $state: ComponentState.NONE,
            ComponentState
        };
    },
    methods: {
        $emitTick(eventName: string, ...eventArgs: any[]): Promise<void> {
            return(new Promise((resolve: Function) => {
                this.$emit(eventName, ...eventArgs);
                this.$nextTick(resolve);
            }));
        }
    }
};

Object.forEach({
    "beforeCreate": ComponentState.CREATING,
    "created": ComponentState.CREATED,

    "beforeMount": ComponentState.MOUNTING,
    "mounted": ComponentState.MOUNTED,
    
    "beforeUpdate": ComponentState.UPDATING,
    "updated": ComponentState.UPDATED,
    
    "beforeUnmount": ComponentState.UNMOUNTING,
    "unmounted": ComponentState.UNMOUNTED
}, (state: number, hook: string) => {
    mixin[hook] = async function() {
        this.$state = state;

        if(this.$emitTick)
            await this.$emitTick(hook, this);
    };
})

export {mixin as Events};
