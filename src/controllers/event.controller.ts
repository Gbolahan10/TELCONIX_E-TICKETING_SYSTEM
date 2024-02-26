import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import { HttpException } from '../exceptions/HttpException';
import DatabaseService from '../services/database.service';
import Event from '../models/events.model';
import { CreateEventDto, EventDto } from '../dtos/events.dtos';
import PaymentsController from './payment.controller';
import { randomUUID } from 'crypto';

class EventsController {
    public eventService = new DatabaseService(Event);
    public paymentsController = new PaymentsController();
    
    public createEvent = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
          const { _id } = req.user;
          const eventData: CreateEventDto = req.body;
          const eventCode = randomUUID();

          const finalEventData: EventDto = { ...eventData, userId: _id, eventCode: eventCode};

          await this.eventService.create(finalEventData);
    
          res.status(200).json({ data: eventData, message: 'Event created successfully' });
        } catch (error) {
          next(error);
        }
      };
    
    public viewEvent = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { _id } = req.user;
            const { eventId } = req.params;

            const eventData = await this.eventService.find({_id: eventId, userId: _id}, '-event_id -_id -userId');

            if ( !eventData.status ) {
            throw new HttpException(404, "Event not found");
            }

            res.status(200).json({ data: eventData, message: 'Event returned successfully' });
        } catch (error) {
            next(error);
        }
    };

    public viewAllEvents = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { _id } = req.user;

            const eventsData = await this.eventService.findAll({userId: _id});

            if ( !eventsData.status ) {
            throw new HttpException(404, "No Events Found");
            }

            res.status(200).json({ data: eventsData, message: 'Events returned successfully' });
        } catch (error) {
            next(error);
        }
    };
}

export default EventsController;