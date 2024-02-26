import EventsController from '../controllers/event.controller';
import { Routes } from '../interfaces/routes.interface';
declare class EventsRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    eventsController: EventsController;
    constructor();
    private initializeRoutes;
}
export default EventsRoute;
