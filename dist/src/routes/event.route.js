"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const event_controller_1 = tslib_1.__importDefault(require("../controllers/event.controller"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const events_dtos_1 = require("../dtos/events.dtos");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
class EventsRoute {
    constructor() {
        this.path = '/event';
        this.router = (0, express_1.Router)();
        this.eventsController = new event_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, (0, validation_middleware_1.default)(events_dtos_1.CreateEventDto, 'body'), auth_middleware_1.default, this.eventsController.createEvent);
        this.router.get(`${this.path}/:eventId`, auth_middleware_1.default, this.eventsController.viewEvent);
        this.router.get(`${this.path}/all`, auth_middleware_1.default, this.eventsController.viewAllEvents);
    }
}
exports.default = EventsRoute;
//# sourceMappingURL=event.route.js.map