import { BaseRoute } from './base-route';
import { routeService } from './../services/route.model.service';

export default class HttpRoute extends BaseRoute {
    constructor(route) {
        super();
        this.methods = routeService.methods(route.methods);
        this.uri = route.uri;
        this.regex = route.regex;
        this.name = routeService.name(route.name);
        this.prefix = routeService.prefix(route.prefix);
        this.middleware = routeService.middleware(route.middleware);
        this.parameters = route.parameters;
        this.usesType = routeService.usesType(route.uses);
        this.uses = route.uses[this.usesType];
    }

    get enabled() {
        return true;
    }
}
