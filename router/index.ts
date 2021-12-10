import { createWebHistory, createRouter as createVueRouter } from "vue-router";

const mapRoutes = function(routes: {}[], callback: Function, parent: any = null) {
    let keys = Object.keys(routes);

    for(let index = 0; index < keys.length; index++) {
        let key   = keys[index];

        routes[key] = callback(routes[key], parent);

        if(routes[key].children) {
            routes[key].children = mapRoutes(routes[key].children, callback, routes[key]);
        }
    }

    return routes;
};

export function createRouter(routes: Array<{}>, inherit: {} = {}, empty: {}|undefined = undefined) {
    routes = mapRoutes(
        routes,
        function(route: {}, parent: {}) {

            let meta = route.meta || {};

            if(!route.component && empty)
                route.component = empty;
    
            if(route.path == "") meta.index = true;
    
            meta.id = crypto.getRandomValues(new Uint32Array(1))[0];
    
            if(!parent) {
                parent = {slug : []}
            }
            else if(parent?.meta?.id) {
                route.parent = parent?.meta?.id;
            }

            Object.forEach(
                inherit,
                function(fallback: any, key: string) {
                    if(meta[key] === undefined)
                        meta[key] = (parent?.meta ? parent?.meta[key] : undefined) ?? fallback;
                }
            );
    
            let slug = parent?.slug.concat(route.path).map(
                (p: string): string => {
                    p = p.trim();
    
                    return p.startsWith("/") ? p.substr(1) : p;
                }
            ).filter(
                //@ts-ignore
                (p: string): boolean => !p.isEmpty()
            );
    
    
            return Object.assign(route, {
                meta: meta,
                slug: slug,
                fullpath: "/"+slug.join("/")
            });
        }
    );

    const router = createVueRouter({
        history: createWebHistory(),
        routes
    });

    router.routes = routes;

    router.getRoute = function(computedRoute) {
        let computedRouteId = computedRoute;

        if(Object.isObject(computedRoute)) 
            computedRouteId = computedRoute?.meta?.id;
        
        if(computedRoute) {
            let originalRoute;
            if((originalRoute = Object.deepFirst(this.routes, (route) => route?.meta?.id == computedRouteId))) {
                return !Number.isInteger(computedRoute) ? Object.assign(
                    computedRoute,
                    originalRoute
                ) : originalRoute;
            }
        }
    };

    return router;
};