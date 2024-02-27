import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import { HttpException } from '../exceptions/HttpException';
import DatabaseService from '../services/database.service';
import PaymentsController from './payment.controller';
import Event from '../models/events.model';

class TicketsController {
    public eventService = new DatabaseService(Event);
    public paymentsController = new PaymentsController();
    
    public purchaseEventTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { eventId } = req.params;

            const eventData = await this.eventService.find({_id: eventId}, '-_id -id');

            if ( !eventData.status ) {
            throw new HttpException(404, "Event not found");
            }

            const registrationEnd = new Date(eventData.result.registrationEnd)
            const today = new Date()

            if ( today > registrationEnd ) {
                throw new HttpException(404, "Ticket sales is closed");
                }

            const allTicketTypes = eventData.result.ticketTypes;
            const data = [];

            for (const ticketType of allTicketTypes) {
                if (ticketType.boughtTickets < ticketType.totalTickets) {
                    const paymentLink = await this.paymentsController.generatePaymentLink(eventData.result.eventName, ticketType.unitPrice, eventId, ticketType.name);
                    const { _id, id, ...ticketData } = ticketType.toObject(); 
                    const modifiedTicketData = { ...ticketData, paymentLink };
                    data.push(modifiedTicketData);
                }
            }

            if (data.length < 1) {
                throw new HttpException(409, "All tickets are sold out")
            }
    
          res.status(200).json({ data, message: 'Available ticket types returned successfully' });
        } catch (error) {
          next(error);
        }
      };
    
    public viewAllTickets = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { _id } = req.user;
            const { eventId } = req.params

            const eventData = await this.eventService.find({userId: _id, _id: eventId});

            if ( !eventData.status ) {
            throw new HttpException(404, "Event Not Found");
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