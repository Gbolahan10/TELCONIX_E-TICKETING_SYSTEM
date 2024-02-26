import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import { HttpException } from '../exceptions/HttpException';
import DatabaseService from '../services/database.service';
import PaymentsController from './payment.controller';

class TicketsController {
    public eventService = new DatabaseService(Event);
    public paymentsController = new PaymentsController();
    
    public purchaseEventTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let data = []
            const { event_id } = req.params;

            const eventData = await this.eventService.find({_id: event_id}, '-_id');

            if ( !eventData.status ) {
            throw new HttpException(404, "Event not found");
            }

            for (const ticketType of eventData.result.ticketTypes) {
                if (ticketType.boughtTickets < ticketType.totalTickets) {
                    const paymentLink = await this.paymentsController.generatePaymentLink(eventData.result.eventName, ticketType.unitPrice, event_id, ticketType.name);

                    ticketType.paymentLink = paymentLink;
                    data.push(ticketType)
                }
            }

            if (data.length < 1) {
                throw new HttpException(409, "All tickets are sold out")
            }
    
          res.status(200).json({ data: {ticketTypes: data}, message: 'Available ticket types returned successfully' });
        } catch (error) {
          next(error);
        }
      };
    
    public viewAllTickets = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { _id } = req.user;
            const { eventId } = req.params

            const eventData = await this.eventService.find({userId: _id, eventId: eventId});

            if ( !eventData.status ) {
            throw new HttpException(404, "No Tickets Found");
            }

            const allTickets = eventData.result.tickets
            if (allTickets.length < 1) {
                throw new HttpException(409, "There are no tickets bought for this event")
            }

            res.status(200).json({ data: {eventId, allTickets}, message: 'Event Tickets returned successfully' });
        } catch (error) {
            next(error);
        }
    };

}

export default TicketsController;