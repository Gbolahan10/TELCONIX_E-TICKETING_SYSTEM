import mongoose from 'mongoose';
declare const Event: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    eventName: string;
    eventCode: string;
    datetime: Date;
    registrationEnd: Date;
    venue: string;
    ticketTypes: {
        name: string;
        unitPrice: number;
        totalTickets: number;
        boughtTickets: number;
    }[];
    tickets: {
        name: string;
        email: string;
        ticketId: string;
        ticketType: string;
        purchaseDate: Date;
    }[];
    userId?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    eventName: string;
    eventCode: string;
    datetime: Date;
    registrationEnd: Date;
    venue: string;
    ticketTypes: {
        name: string;
        unitPrice: number;
        totalTickets: number;
        boughtTickets: number;
    }[];
    tickets: {
        name: string;
        email: string;
        ticketId: string;
        ticketType: string;
        purchaseDate: Date;
    }[];
    userId?: mongoose.Types.ObjectId;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    eventName: string;
    eventCode: string;
    datetime: Date;
    registrationEnd: Date;
    venue: string;
    ticketTypes: {
        name: string;
        unitPrice: number;
        totalTickets: number;
        boughtTickets: number;
    }[];
    tickets: {
        name: string;
        email: string;
        ticketId: string;
        ticketType: string;
        purchaseDate: Date;
    }[];
    userId?: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    toObject: {
        virtuals: true;
    };
    toJSON: {
        virtuals: true;
    };
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    eventName: string;
    eventCode: string;
    datetime: Date;
    registrationEnd: Date;
    venue: string;
    ticketTypes: {
        name: string;
        unitPrice: number;
        totalTickets: number;
        boughtTickets: number;
    }[];
    tickets: {
        name: string;
        email: string;
        ticketId: string;
        ticketType: string;
        purchaseDate: Date;
    }[];
    userId?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    eventName: string;
    eventCode: string;
    datetime: Date;
    registrationEnd: Date;
    venue: string;
    ticketTypes: {
        name: string;
        unitPrice: number;
        totalTickets: number;
        boughtTickets: number;
    }[];
    tickets: {
        name: string;
        email: string;
        ticketId: string;
        ticketType: string;
        purchaseDate: Date;
    }[];
    userId?: mongoose.Types.ObjectId;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    eventName: string;
    eventCode: string;
    datetime: Date;
    registrationEnd: Date;
    venue: string;
    ticketTypes: {
        name: string;
        unitPrice: number;
        totalTickets: number;
        boughtTickets: number;
    }[];
    tickets: {
        name: string;
        email: string;
        ticketId: string;
        ticketType: string;
        purchaseDate: Date;
    }[];
    userId?: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}>>;
export default Event;
