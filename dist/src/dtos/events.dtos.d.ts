export declare class CreateTicketTypesDto {
    name: string;
    unitPrice: number;
    totalTickets: number;
}
export declare class CreateEventDto {
    eventName: string;
    datetime: string;
    registrationEnd: string;
    venue: string;
    ticketTypes: CreateTicketTypesDto[];
}
export declare class TicketTypesDto {
    name: string;
    unitPrice: number;
    totalTickets: number;
    boughtTickets?: number;
}
export declare class TicketsDto {
    ticketId: string;
    name: string;
    email: string;
    ticketType: string;
    purchaseDate: string;
}
export declare class EventDto {
    userId: string;
    eventCode: string;
    eventName: string;
    datetime: string;
    registrationEnd: string;
    venue: string;
    ticketTypes: TicketTypesDto[];
    tickets?: TicketsDto[];
}
