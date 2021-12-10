
import * as VueUtils from "@vue/shared";

import { ComponentOptions } from "@vue/runtime-core";

export function PropifyEmits(component: ComponentOptions): {} {
    const propify: any[] = component.emits;

    if(!component.props)
        component.props = { };

    if(component.props instanceof Array)
        component.props = Object.fromEntries(component.props.map((name: string): any[] => [name, {}]));

    if(propify instanceof Array) {
        propify.forEach((emitter: string) => {
            component.props[VueUtils.toHandlerKey(emitter)] = {
                type: Function,
                required: false
            };
        });
    }

    return component;
};
