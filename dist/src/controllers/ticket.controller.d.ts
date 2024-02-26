import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import DatabaseService from '../services/database.service';
import PaymentsController from './payment.controller';
declare class TicketsController {
    eventService: DatabaseService;
    paymentsController: PaymentsController;
    purchaseEventTicket: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    viewAllTickets: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
export default TicketsController;
