import { Request, Response, NextFunction } from 'express';
import DatabaseService from '../services/database.service';
import Event from '../models/events.model';
import Transaction from '../models/transactions.model';
import Stripe from 'stripe';
import { ENDPOINT_SECRET, WEBHOOK_API_KEY } from '../config/index';
import { randomUUID } from 'crypto';


class PaymentsController {
    public eventService = new DatabaseService(Event);
    public transactionService = new DatabaseService(Transaction);
    private stripe = new Stripe(WEBHOOK_API_KEY);
    private endpointSecret = ENDPOINT_SECRET;

    public createTicket = async (eventId, ticketType, name, email): Promise<string> => {
      try {
          const ticketId = randomUUID();
          let ticketData = {
              ticketId: ticketId,
              name: name,
              email: email,
              ticketType: ticketType
          }
          await this.eventService.update(
            { _id: eventId },
            { $push: { tickets: ticketData } }
          );

          await this.eventService.update(
              { _id: eventId, 'ticketTypes.name': ticketType },
              { $inc: { 'ticketTypes.$.boughtTickets': 1 }}
          );
          return ticketId

      } catch (error) {
       return '';
      }
    };

    public generatePaymentLink = async (name: string, unit_amount: number, eventId: string, ticketType: string ): Promise<string> => {
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
        } catch (error) {
            return error;
            }
    }
    
    public fulfillPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const sig = req.headers['stripe-signature'];
            let event

            try {
                event = this.stripe.webhooks.constructEvent(req.rawBody, sig, this.endpointSecret);
            } catch (err) {
                console.log(err)
                res.status(400).send(`Webhook Error: ${err.message}`);
                return;
            }

            // Handle the event
            switch (event.type) {
                case 'checkout.session.completed':
                    const custom_fields = event.data.object.custom_fields
                    
                    const email = (custom_fields.find(obj => obj.key === 'email')).text.value
                    const name = (custom_fields.find(obj => obj.key === 'fullName')).text.value
                    const eventDetails = (custom_fields.find(obj => obj.key === 'eventDetails')).dropdown.options[0]
                    const ticketType = eventDetails.label
                    const eventId = eventDetails.value
                    const userId = (await this.eventService.find({ _id: eventId })).result.userId

                    const ticketId = await this.createTicket(eventId, ticketType, name, email)

                    let transaction = {
                      userId: userId,
                      eventId,
                      ticketId,
                      transaction_data: event
                    };

                    await this.transactionService.create(transaction)

                    //Deactivate link to enforce just one-time use
                    await this.stripe.paymentLinks.update(
                        event.data.object.payment_link,
                        {
                          active: false
                        }
                      );
                    break;
                default:
                    break
            }
            res.send();
        } catch (error) {
          next(error);
        }
      };
}

export default PaymentsController;