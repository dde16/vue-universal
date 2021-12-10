declare module "@dde16/vue-universal/vue" {
    import { App as VueApp, Component, ComponentOptions } from "@vue/runtime-core";

    export interface App<HostElement = any> extends VueApp<HostElement> {
        middleware: Middleware[];

        __component(name: string): Component | undefined;
        __component(name: string, component: Component): this;
        
        
        component(name: string): Component | undefined;
        component(name: string, component: Component): this;

        /**
         * Define a component using its name from within its definition.
         * 
         * @param Component component 
         * @return this
         */
        component(component: Component): this;
        
        /**
         * Define component middleware.
         * 
         * @param Function middleware 
         * @return void
         */
        tap(middleware: Middleware): void;
    }

    export type Middleware = (component: ComponentOptions) => ComponentOptions;

    export enum ComponentState {
        NONE,
    
        CREATING,
        CREATED,
        
        UPDATING,
        UPDATED,
    
        MOUNTING,
        MOUNTED,
    
        UNMOUNTING,
        UNMOUNTED
    };
}