import { Component, ComponentOptions } from "@vue/runtime-core";

export type Middleware = (component: ComponentOptions) => ComponentOptions;