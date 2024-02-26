"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const ticket_controller_1 = tslib_1.__importDefault(require("../controllers/ticket.controller"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
class TicketsRoute {
    constructor() {
        this.path = '/ticket';
        this.router = (0, express_1.Router)();
        this.ticketsController = new ticket_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/purchase/:event_id`, this.ticketsController.purchaseEventTicket);
        this.router.get(`${this.path}/all/:event_id`, auth_middleware_1.default, this.ticketsController.viewAllTickets);
    }
}
exports.default = TicketsRoute;
//# sourceMappingURL=ticket.route.js.map