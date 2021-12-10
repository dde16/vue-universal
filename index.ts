import { inject, InjectionKey, App as BaseApp } from "vue";
import { App } from "./vue/App";
import { Middleware } from "./vue/Middleware";
import { Component } from "@vue/runtime-core";
import { PropifyEmits } from "./middleware/PropifyEmits";
import "@dde16/ts-helpers";
import "./type/Window";

import PrefabComponent from "./component/Prefab.vue";
import AccordionComponent from "./component/Accordion.vue";
import ActionModalComponent from "./component/ActionModal.vue";
import AggregateInputComponent from "./component/AggregateInput.vue";
import ButtonGroupComponent from "./component/ButtonGroup.vue";
import ButtonComponent from "./component/Button.vue";
import CardComponent from "./component/Card.vue";
import CircleComponent from "./component/Circle.vue";
import CollapsableComponent from "./component/Collapsable.vue";
import ContextMenuComponent from "./component/ContextMenu.vue";
import DatalistComponent from "./component/Datalist.vue";
import DropdownComponent from "./component/Dropdown.vue";
import ErrorComponent from "./component/Error.vue";
import FormModalComponent from "./component/FormModal.vue";
import FormComponent from "./component/Form.vue";
import IconInputComponent from "./component/IconInput.vue";
import IconComponent from "./component/Icon.vue";
import InputComponent from "./component/Input.vue";
import IntInputComponent from "./component/IntInput.vue";
import LoaderComponent from "./component/Loader.vue";
import OverlayedComponent from "./component/Overlayed.vue";
import OverlayComponent from "./component/Overlay.vue";
import PageHorizontalStackComponent from "./component/PageHorizontalStack.vue";
import PageVerticalStackComponent from "./component/PageVerticalStack.vue";
import PaginateScrollComponent from "./component/PaginateScroll.vue";
import PaginateComponent from "./component/Paginate.vue";
import PopupComponent from "./component/Popup.vue";
import SandwichComponent from "./component/Sandwich.vue";
import SelectComponent from "./component/Select.vue";
import TabListComponent from "./component/TabList.vue";
import TreeComponent from "./component/Tree.vue";
import TagListComponent from "./component/TagList.vue";
import FileInputComponent from "./component/FileInput.vue";

import {Routing as RoutingMixin} from "./mixin/Routing";
import {Parentals as ParentalsMixin} from "./mixin/Parentals";
import {Events as EventsMixin} from "./mixin/Events";
import {Modify as ModifyMixin} from "./mixin/Modify";

import {ClickOff as ClickOffDirective} from "./directive/ClickOff";
import {ContextMenu as ContextMenuDirective} from "./directive/ContextMenu";
import {Modify as ModifyDirective} from "./directive/Modify";

export interface VueUniversalPlugin {
    install(app: BaseApp): void;
}

export const VueUniversalPluginSymbol: InjectionKey<VueUniversalPlugin> = Symbol();

export function VueUniversalPlugin(): VueUniversalPlugin {
    const VueUniversalPlugin = inject(VueUniversalPluginSymbol);

    if(!VueUniversalPlugin)
        throw new Error("VueUniversalPlugin was not provided.");

    return VueUniversalPlugin;
}

/**
 * Allows installation of the plugin through app.use.
 * 
 * @return VueUniversalPlugin
 */
export function createVueUniversalPlugin(): VueUniversalPlugin {
    const plugin: VueUniversalPlugin = {
        install(app: BaseApp): void {
            let _app: App = app as App;

            _app.middleware = [];

            _app.tap = function(middleware: Middleware): void {
                this.middleware.push(middleware);
            };

            /** Save parent function so we can still call it */
            _app.__component = _app.component;

            _app.component = function(arg0: string|Component, arg1?: Component): Component|this|undefined {
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

                    if(!component?.name) {
                        console.error(component);
                        throw new Error("When passing a component without a name, its name option must be set.");
                    }

                    name = component?.name
                }

                this.middleware.forEach((middleware: (component: Component) => Component): any => middleware.bind(this)(component));

                return this.__component(name, component);
            };

            _app.tap(PropifyEmits);

            _app.directive("clickoff", ClickOffDirective);
            _app.directive("context-menu", ContextMenuDirective);
            _app.directive("modify", ModifyDirective);

            _app.mixin(RoutingMixin);
            _app.mixin(ParentalsMixin);
            _app.mixin(EventsMixin);
            _app.mixin(ModifyMixin);

            _app.component(PrefabComponent);
            _app.component(AccordionComponent);
            _app.component(ActionModalComponent);
            _app.component(AggregateInputComponent);
            _app.component(ButtonGroupComponent);
            _app.component(ButtonComponent);
            _app.component(CardComponent);
            _app.component(CircleComponent);
            _app.component(CollapsableComponent);
            _app.component(ContextMenuComponent);
            _app.component(DatalistComponent);
            _app.component(DropdownComponent);
            _app.component(ErrorComponent);
            _app.component(FormModalComponent);
            _app.component(FormComponent);
            _app.component(IconInputComponent);
            _app.component(IconComponent);
            _app.component(InputComponent);
            _app.component(IntInputComponent);
            _app.component(LoaderComponent);
            _app.component(OverlayedComponent);
            _app.component(OverlayComponent);
            _app.component(PageHorizontalStackComponent);
            _app.component(PageVerticalStackComponent);
            _app.component(PaginateScrollComponent);
            _app.component(PaginateComponent);
            _app.component(PopupComponent);
            _app.component(SandwichComponent);
            _app.component(SelectComponent);
            _app.component(TabListComponent);
            _app.component(TreeComponent);
            _app.component(TagListComponent);
            _app.component(FileInputComponent);
            
            _app.provide(VueUniversalPluginSymbol, this);
        }
    };

    return plugin;
};