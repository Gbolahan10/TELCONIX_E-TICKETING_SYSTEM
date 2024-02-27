import { Router } from 'express';
import TicketsController from '../controllers/ticket.controller';
import { Routes } from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';

class TicketsRoute implements Routes {
  public path = '/ticket';
  public router = Router();
  public ticketsController = new TicketsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/purchase/:eventId`, this.ticketsController.purchaseEventTicket);
    this.router.get(`${this.path}/all/:eventId`, authMiddleware, this.ticketsController.viewAllTickets);
    }
}

export default TicketsRoute;
