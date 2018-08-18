import Path from './path';
import View from './view';
import Event from './event';
import Query from './query';
import Binding from './binding';
import Application from './application';
import { trackerService } from './../services/tracker.model.service';

export default class Tracker {
    constructor(data) {
        this.executionAt = trackerService.executionAt(data.meta.execution_at);
        this.id = data.meta.id;
        this.laravelVersion = data.meta.laravel_version;
        this.phpVersion = data.meta.php_version;
        this.env = data.meta.env;
        this.running = trackerService.running(data.meta.is_running_in_console);
        this.type = trackerService.type(data.meta.type);
        this.typeGroup = trackerService.typeGroup(this.type, data.meta.ajax, data.meta.json);
        this.method = trackerService.method(data.meta.method);
        this.path = trackerService.path(data.meta.path);
        this.status = trackerService.status(this.type, data.meta.status);
        this.statusText = trackerService.statusText(data.meta.status_text);
        this.statusGroup = trackerService.statusGroup(this.status, this.type);
        this.statusColor = trackerService.statusColor(this.statusGroup);
        this.memoryUsage = trackerService.memoryUsage(data.meta.memory_usage);
        this.laravelExecutionTime = trackerService.timerInSeconds(data.meta.laravel_execution_time);

        this.application = new Application(data.data.application);
        this.config = data.data.config || {};
        this.serviceProviders = data.data.service_providers || [];
        this.bindings = (data.data.bindings || []).map(binding => new Binding(binding));
        this.paths = (data.data.paths || []).map(path => new Path(path));

        this.request = trackerService.request(data.meta, data.data.request);
        this.response = trackerService.response(data.meta.type, data.data.response);
        this.route = trackerService.route(data.meta, data.data.route);
        this.session = data.data.session || {};
        this.sessionProvided = trackerService.sessionProvided(data.data);

        this.views = (data.data.views || []).map(view => new View(view));
        this.viewsProvided = trackerService.viewsProvided(data.data);

        this.events = (data.data.events || []).map(event => new Event(event));
        this.eventsProvided = trackerService.eventsProvided(data.data);

        this.queries = (data.data.queries || []).map((query, index) => new Query(query, index));
        this.queriesProvided = trackerService.queriesProvided(data.data);
        this.queriesExecutionTime = trackerService.queriesExecutionTime(this.queries);

        this.lastActiveDetailsTab = 0;
    }

    get queriesExecutionTimeForHuman() {
        return `${this.queriesExecutionTime.toFixed(2)}ms`;
    }

    get memoryUsageForHuman() {
        return `${this.memoryUsage}MB`;
    }

    get laravelExecutionTimeForHuman() {
        return `${this.laravelExecutionTime}s`;
    }

    hasStatusText() {
        return this.statusText !== '---';
    }

    countConfig() {
        return Object.keys(this.config).length;
    }

    hasConfig() {
        return !! this.countConfig();
    }

    countServiceProviders() {
        return this.serviceProviders.length;
    }

    hasServiceProviders() {
        return !! this.countServiceProviders();
    }

    countBindings() {
        return this.bindings.length;
    }

    hasBindings() {
        return !! this.countBindings();
    }

    countPaths() {
        return this.paths.length;
    }

    hasPaths() {
        return !! this.countPaths();
    }

    countSession() {
        return Object.keys(this.session).length;
    }

    hasSession() {
        return !! this.countSession();
    }

    isSessionProvided() {
        return this.sessionProvided;
    }

    countViews() {
        return this.views.length;
    }

    hasViews() {
        return !! this.countViews();
    }

    areViewsProvided() {
        return this.viewsProvided;
    }

    countEvents() {
        return this.events.length;
    }

    hasEvents() {
        return !! this.countEvents();
    }

    areEventsProvided() {
        return this.eventsProvided;
    }

    isEnvTesting() {
        return this.env === 'testing';
    }

    countQueries() {
        return this.queries.length;
    }

    hasQueries() {
        return !! this.countQueries();
    }

    areQueriesProvided() {
        return this.queriesProvided;
    }
}
