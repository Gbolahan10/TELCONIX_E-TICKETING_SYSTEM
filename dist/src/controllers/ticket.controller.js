"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = require("../exceptions/HttpException");
const database_service_1 = tslib_1.__importDefault(require("../services/database.service"));
const payment_controller_1 = tslib_1.__importDefault(require("./payment.controller"));
const events_model_1 = tslib_1.__importDefault(require("../models/events.model"));
class TicketsController {
    constructor() {
        this.eventService = new database_service_1.default(events_model_1.default);
        this.paymentsController = new payment_controller_1.default();
        this.purchaseEventTicket = async (req, res, next) => {
            try {
                const { eventId } = req.params;
                const eventData = await this.eventService.find({ _id: eventId }, '-_id -id');
                if (!eventData.status) {
                    throw new HttpException_1.HttpException(404, "Event not found");
                }
                const registrationEnd = new Date(eventData.result.registrationEnd);
                const today = new Date();
                if (today > registrationEnd) {
                    throw new HttpException_1.HttpException(404, "Ticket sales is closed");
                }
                const allTicketTypes = eventData.result.ticketTypes;
                const data = [];
                for (const ticketType of allTicketTypes) {
                    if (ticketType.boughtTickets < ticketType.totalTickets) {
                        const paymentLink = await this.paymentsController.generatePaymentLink(eventData.result.eventName, ticketType.unitPrice, eventId, ticketType.name);
                        const _a = ticketType.toObject(), { _id, id } = _a, ticketData = tslib_1.__rest(_a, ["_id", "id"]);
                        const modifiedTicketData = Object.assign(Object.assign({}, ticketData), { paymentLink });
                        data.push(modifiedTicketData);
                    }
                }
                if (data.length < 1) {
                    throw new HttpException_1.HttpException(409, "All tickets are sold out");
                }
                res.status(200).json({ data, message: 'Available ticket types returned successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.viewAllTickets = async (req, res, next) => {
            try {
                const { _id } = req.user;
                const { eventId } = req.params;
                const eventData = await this.eventService.find({ userId: _id, _id: eventId });
                if (!eventData.status) {
                    throw new HttpException_1.HttpException(404, "Event Not Found");
                }
                const allTickets = eventData.result.tickets;
                if (allTickets.length < 1) {
                    throw new HttpException_1.HttpException(409, "There are no tickets bought for this event");
                }
                res.status(200).json({ data: { eventId, allTickets }, message: 'Event Tickets returned successfully' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = TicketsController;
//# sourceMappingURL=ticket.controller.js.map