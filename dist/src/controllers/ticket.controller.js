"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = require("../exceptions/HttpException");
const database_service_1 = tslib_1.__importDefault(require("../services/database.service"));
const payment_controller_1 = tslib_1.__importDefault(require("./payment.controller"));
class TicketsController {
    constructor() {
        this.eventService = new database_service_1.default(Event);
        this.paymentsController = new payment_controller_1.default();
        this.purchaseEventTicket = async (req, res, next) => {
            try {
                let data = [];
                const { event_id } = req.params;
                const eventData = await this.eventService.find({ _id: event_id }, '-_id');
                if (!eventData.status) {
                    throw new HttpException_1.HttpException(404, "Event not found");
                }
                for (const ticketType of eventData.result.ticketTypes) {
                    if (ticketType.boughtTickets < ticketType.totalTickets) {
                        const paymentLink = await this.paymentsController.generatePaymentLink(eventData.result.eventName, ticketType.unitPrice, event_id, ticketType.name);
                        ticketType.paymentLink = paymentLink;
                        data.push(ticketType);
                    }
                }
                if (data.length < 1) {
                    throw new HttpException_1.HttpException(409, "All tickets are sold out");
                }
                res.status(200).json({ data: { ticketTypes: data }, message: 'Available ticket types returned successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.viewAllTickets = async (req, res, next) => {
            try {
                const { _id } = req.user;
                const { eventId } = req.params;
                const eventData = await this.eventService.find({ userId: _id, eventId: eventId });
                if (!eventData.status) {
                    throw new HttpException_1.HttpException(404, "No Tickets Found");
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