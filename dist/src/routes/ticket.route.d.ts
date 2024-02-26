import TicketsController from '../controllers/ticket.controller';
import { Routes } from '../interfaces/routes.interface';
declare class TicketsRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    ticketsController: TicketsController;
    constructor();
    private initializeRoutes;
}
export default TicketsRoute;
