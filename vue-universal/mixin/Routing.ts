import { ComponentOptionsMixin } from "@vue/runtime-core";

export const Routing = {
    computed: {
        matchedRoutes() {
            return this.$route.matched.map(
                (route => this.$router.getRoute(route)).bind(this)
            );
        },
        currentRoute() {
            return this.matchedRoutes.last();
        },
        parentRoute()  {
            return this.currentRoute?.parent ? this.$router.getRoute(this.currentRoute?.parent) : undefined;
        },
        childRoutes() {
            return this?.currentRoute?.children || [];
        },
        adjacentRoutes() {
            return this.parentRoute ? this.parentRoute.children.filter(
                route => route?.meta?.id !== this.$route.meta.id
            ) : [];
        },
        levelRoutes() {
            return this.parentRoute?.children||[];
        }
    }
} as ComponentOptionsMixin;
