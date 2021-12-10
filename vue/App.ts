import { App as VueApp, Component } from "@vue/runtime-core";
import {Middleware} from "./Middleware";

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