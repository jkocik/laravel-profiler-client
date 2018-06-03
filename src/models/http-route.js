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
        this.middleware = route.middleware;
        this.parameters = route.parameters;
        this.usesType = routeService.usesType(route.uses);
        this.uses = route.uses[this.usesType];
        this.formRequest = routeService.formRequest(route.uses.form_request);
    }

    get enabled() {
        return true;
    }
}
