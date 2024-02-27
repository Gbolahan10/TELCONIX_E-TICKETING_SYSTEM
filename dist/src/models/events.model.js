"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const EventSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    eventName: {
        type: String,
        required: true,
    },
    eventCode: {
        type: String,
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
    },
    registrationEnd: {
        type: Date,
        default: function () {
            return this.datetime;
        }
    },
    venue: {
        type: String,
        required: true,
    },
    ticketTypes: [{
            name: {
                type: String,
                required: true,
            },
            unitPrice: {
                type: Number,
                required: true,
            },
            totalTickets: {
                type: Number,
                required: true,
            },
            boughtTickets: {
                type: Number,
                default: 0
            },
        }],
    tickets: [{
            ticketId: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            ticketType: {
                type: String,
                required: true
            },
            purchaseDate: {
                type: Date,
                default: Date.now
            }
        }]
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});
const Event = mongoose_1.default.model('Event', EventSchema);
exports.default = Event;
//# sourceMappingURL=events.model.js.map