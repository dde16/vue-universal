import { inject, InjectionKey } from "vue";
import { App } from "./vue/App";
import { Middleware } from "./vue/Middleware";
import { Component } from "@vue/runtime-core";
import { PropifyEmits } from "./middleware/PropifyEmits";
import "@dde16/ts-helpers";

export interface VueBespokePlugin {
    install(app: App): void;
}

export const VueBespokePluginSymbol: InjectionKey<VueBespokePlugin> = Symbol();

export function VueBespokePlugin(): VueBespokePlugin {
    const VueBespokePlugin = inject(VueBespokePluginSymbol);

    if(!VueBespokePlugin)
        throw new Error("VueBespokePlugin was not provided.");

    return VueBespokePlugin;
}

/**
 * Allows installation of the plugin through app.use.
 * 
 * @return VueBespokePlugin
 */
export function createVueBespokePlugin(): VueBespokePlugin {
    const plugin: VueBespokePlugin = {
        async install(app: App): Promise<void> {
            app.middleware = [];

            app.tap = function(middleware: Middleware): void {
                this.middleware.push(middleware);
            };

            /** Save parent function so we can still call it */
            app.__component = app.component;

            app.component = function(arg0: string|Component, arg1?: Component): Component|this|undefined {
                let name: string;
                let component: Component;

                if(typeof arg0 === "string") {
                    name = arg0;

                    if(!arg1)
                        throw new TypeError("Expecting second argument as a component, got " + typeof(arg1));

                    component = arg1;
                }
                else {
                    component = arg0;

                    if(!component?.name)
                        throw new Error("When passing a component without a name, its name option must be set.");

                    name = component?.name
                }

                return this.__component(name, component);
            };

            app.tap(PropifyEmits);

            app.mixin((await import("./mixin/Routing")).Routing);
            app.mixin((await import("./mixin/Parentals")).Parentals);
            app.mixin((await import("./mixin/Events")).Events);

            app.component((await import("./component/Accordion.vue")).default);
            app.component((await import("./component/ActionModal.vue")).default);
            app.component((await import("./component/AggregateInput.vue")).default);
            app.component((await import("./component/ButtonGroup.vue")).default);
            app.component((await import("./component/Button.vue")).default);
            app.component((await import("./component/Card.vue")).default);
            app.component((await import("./component/Circle.vue")).default);
            app.component((await import("./component/Collapsable.vue")).default);
            app.component((await import("./component/ContextMenu.vue")).default);
            app.component((await import("./component/Datalist.vue")).default);
            app.component((await import("./component/Dropdown.vue")).default);
            app.component((await import("./component/Error.vue")).default);
            app.component((await import("./component/FormModal.vue")).default);
            app.component((await import("./component/Form.vue")).default);
            app.component((await import("./component/IconInput.vue")).default);
            app.component((await import("./component/Icon.vue")).default);
            app.component((await import("./component/Input.vue")).default);
            app.component((await import("./component/IntInput.vue")).default);
            app.component((await import("./component/Lazy.vue")).default);
            app.component((await import("./component/Loader.vue")).default);
            app.component((await import("./component/Overlayed.vue")).default);
            app.component((await import("./component/Overlay.vue")).default);
            app.component((await import("./component/PageHorizontalStack.vue")).default);
            app.component((await import("./component/PageVerticalStack.vue")).default);
            app.component((await import("./component/PaginateScroll.vue")).default);
            app.component((await import("./component/Paginate.vue")).default);
            app.component((await import("./component/Popup.vue")).default);
            app.component((await import("./component/Prefab.vue")).default);
            app.component((await import("./component/Sandwich.vue")).default);
            app.component((await import("./component/Select.vue")).default);
            app.component((await import("./component/TabList.vue")).default);
            app.component((await import("./component/Tree.vue")).default);
            app.component((await import("./component/Window.vue")).default);
            
            app.provide(VueBespokePluginSymbol, this);
        }
    };

    return plugin;
};