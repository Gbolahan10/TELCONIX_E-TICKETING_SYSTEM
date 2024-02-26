import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import DatabaseService from '../services/database.service';
import PaymentsController from './payment.controller';
declare class EventsController {
    eventService: DatabaseService;
    paymentsController: PaymentsController;
    createEvent: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    viewEvent: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    viewAllEvents: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
export default EventsController;
