import { Router } from 'express';
import EventsController from '../controllers/event.controller';
import { Routes } from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import { CreateEventDto } from '../dtos/events.dtos';
import validationMiddleware from '../middlewares/validation.middleware';

class EventsRoute implements Routes {
  public path = '/event';
  public router = Router();
  public eventsController = new EventsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, validationMiddleware(CreateEventDto, 'body'), authMiddleware, this.eventsController.createEvent);
    this.router.get(`${this.path}/:eventId`, authMiddleware, this.eventsController.viewEvent);
    this.router.get(`${this.path}/`, authMiddleware, this.eventsController.viewAllEvents);
    }
}

export default EventsRoute;
