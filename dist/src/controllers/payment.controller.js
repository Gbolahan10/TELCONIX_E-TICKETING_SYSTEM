"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_service_1 = tslib_1.__importDefault(require("../services/database.service"));
const events_model_1 = tslib_1.__importDefault(require("../models/events.model"));
const transactions_model_1 = tslib_1.__importDefault(require("../models/transactions.model"));
const stripe_1 = tslib_1.__importDefault(require("stripe"));
const index_1 = require("../config/index");
const crypto_1 = require("crypto");
class PaymentsController {
    constructor() {
        this.eventService = new database_service_1.default(events_model_1.default);
        this.transactionService = new database_service_1.default(transactions_model_1.default);
        this.stripe = new stripe_1.default(index_1.WEBHOOK_API_KEY);
        this.endpointSecret = index_1.ENDPOINT_SECRET;
        this.createTicket = async (eventId, ticketType, name, email) => {
            try {
                const ticketId = (0, crypto_1.randomUUID)();
                let ticketData = {
                    ticketId: ticketId,
                    name: name,
                    email: email,
                    ticketType: ticketType,
                    purchaseDate: new Date()
                };
                await this.eventService.update({ _id: eventId, 'ticketTypes.name': name }, { $push: { tickets: ticketData }, $inc: { 'ticketTypes.$.boughtTickets': 1 } });
                return ticketId;
            }
            catch (error) {
                return '';
            }
        };
        this.generatePaymentLink = async (name, unit_amount, eventId, ticketType) => {
            try {
                const product = await this.stripe.products.create({
                    name: name + "- Event Ticket Purchase",
                });
                const price = await this.stripe.prices.create({
                    currency: 'ngn',
                    unit_amount: unit_amount,
                    product: product.id,
                });
                const paymentLink = await this.stripe.paymentLinks.create({
                    line_items: [
                        {
                            price: price.id,
                            quantity: 1,
                        },
                    ],
                    custom_fields: [
                        {
                            key: 'email',
                            label: {
                                type: 'custom',
                                custom: 'Re-confirm Email',
                            },
                            type: 'text',
                        },
                        {
                            key: 'fullName',
                            label: {
                                type: 'custom',
                                custom: 'Full Name',
                            },
                            type: 'text',
                        },
                        {
                            key: 'eventDetails',
                            label: {
                                type: 'custom',
                                custom: 'Ticket Type',
                            },
                            type: 'dropdown',
                            dropdown: {
                                options: [{
                                        label: ticketType,
                                        value: eventId
                                    }]
                            }
                        },
                    ],
                });
                return paymentLink.url;
            }
            catch (error) {
                return error;
            }
        };
        this.fulfillPayment = async (req, res, next) => {
            try {
                const sig = req.headers['stripe-signature'];
                let event;
                try {
                    event = this.stripe.webhooks.constructEvent(req.rawBody, sig, this.endpointSecret);
                }
                catch (err) {
                    console.log(err);
                    res.status(400).send(`Webhook Error: ${err.message}`);
                    return;
                }
                // Handle the event
                switch (event.type) {
                    case 'checkout.session.completed':
                        console.log(event);
                        const email = event.data.object.custom_fields[0].text.value;
                        const name = event.data.object.custom_fields[1].text.value;
                        const ticketType = event.data.object.custom_fields[2].text.label;
                        const eventId = event.data.object.custom_fields[2].text.value;
                        const userId = (await this.eventService.find({ _id: eventId })).result.userId;
                        const ticketId = await this.createTicket(eventId, ticketType, name, email);
                        let transaction = {
                            userId: userId,
                            eventId,
                            ticketId,
                            transaction_data: event
                        };
                        await this.transactionService.create(transaction);
                        //Deactivate link to enforce just one-time use
                        await this.stripe.paymentLinks.update(event.data.object.payment_link, {
                            active: false
                        });
                        break;
                    default:
                        break;
                }
                res.send();
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = PaymentsController;
//# sourceMappingURL=payment.controller.js.map