"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = require("../exceptions/HttpException");
const database_service_1 = tslib_1.__importDefault(require("../services/database.service"));
const events_model_1 = tslib_1.__importDefault(require("../models/events.model"));
const payment_controller_1 = tslib_1.__importDefault(require("./payment.controller"));
const crypto_1 = require("crypto");
class EventsController {
    constructor() {
        this.eventService = new database_service_1.default(events_model_1.default);
        this.paymentsController = new payment_controller_1.default();
        this.createEvent = async (req, res, next) => {
            try {
                const { _id } = req.user;
                const eventData = req.body;
                const eventCode = (0, crypto_1.randomUUID)();
                const finalEventData = Object.assign(Object.assign({}, eventData), { userId: _id, eventCode: eventCode });
                await this.eventService.create(finalEventData);
                res.status(200).json({ data: eventData, message: 'Event created successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.viewEvent = async (req, res, next) => {
            try {
                const { _id } = req.user;
                const { eventId } = req.params;
                const eventData = await this.eventService.find({ _id: eventId, userId: _id }, '-_id -userId');
                if (!eventData.status) {
                    throw new HttpException_1.HttpException(404, "Event not found");
                }
                res.status(200).json({ data: eventData.result, message: 'Event returned successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.viewAllEvents = async (req, res, next) => {
            try {
                const { _id } = req.user;
                const eventsData = await this.eventService.findAll({ userId: _id });
                if (!eventsData.status) {
                    throw new HttpException_1.HttpException(404, "No Events Found");
                }
                res.status(200).json({ data: eventsData, message: 'All events returned successfully' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = EventsController;
//# sourceMappingURL=event.controller.js.map