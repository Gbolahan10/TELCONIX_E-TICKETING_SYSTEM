"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDto = exports.TicketsDto = exports.TicketTypesDto = exports.CreateEventDto = exports.CreateTicketTypesDto = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateTicketTypesDto {
}
exports.CreateTicketTypesDto = CreateTicketTypesDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateTicketTypesDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateTicketTypesDto.prototype, "unitPrice", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateTicketTypesDto.prototype, "totalTickets", void 0);
class CreateEventDto {
}
exports.CreateEventDto = CreateEventDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateEventDto.prototype, "eventName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], CreateEventDto.prototype, "datetime", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateEventDto.prototype, "registrationEnd", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateEventDto.prototype, "venue", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateTicketTypesDto),
    tslib_1.__metadata("design:type", Array)
], CreateEventDto.prototype, "ticketTypes", void 0);
class TicketTypesDto {
}
exports.TicketTypesDto = TicketTypesDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TicketTypesDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], TicketTypesDto.prototype, "unitPrice", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], TicketTypesDto.prototype, "totalTickets", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], TicketTypesDto.prototype, "boughtTickets", void 0);
class TicketsDto {
}
exports.TicketsDto = TicketsDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TicketsDto.prototype, "ticketId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TicketsDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TicketsDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TicketsDto.prototype, "ticketType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], TicketsDto.prototype, "purchaseDate", void 0);
class EventDto {
}
exports.EventDto = EventDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EventDto.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EventDto.prototype, "eventCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EventDto.prototype, "eventName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], EventDto.prototype, "datetime", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], EventDto.prototype, "registrationEnd", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EventDto.prototype, "venue", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", Array)
], EventDto.prototype, "ticketTypes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", Array)
], EventDto.prototype, "tickets", void 0);
//# sourceMappingURL=events.dtos.js.map