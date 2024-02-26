import { Request, Response, NextFunction } from 'express';
import DatabaseService from '../services/database.service';
declare class PaymentsController {
    eventService: DatabaseService;
    transactionService: DatabaseService;
    private stripe;
    private endpointSecret;
    createTicket: (eventId: any, ticketType: any, name: any, email: any) => Promise<string>;
    generatePaymentLink: (name: string, unit_amount: number, eventId: string, ticketType: string) => Promise<string>;
    fulfillPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default PaymentsController;
