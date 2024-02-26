import {
    IsObject,
    IsNotEmptyObject,
    IsDefined,
    IsEmail,
    IsString,
    IsAlphanumeric,
    ValidateNested,
    IsNumber,
    MaxLength,
    MinLength,
    IsEnum,
    IsDateString,
    IsBoolean,
    IsOptional
  } from 'class-validator';


  export class CreateTicketTypesDto {
    @IsString()
    public name: string;
  
    @IsNumber()
    public unitPrice: number;
  
    @IsNumber()
    public totalTickets: number;
  }
  
  export class CreateEventDto {
    @IsString()
    public eventName: string;
  
    @IsDateString()
    public datetime: string;

    @IsDateString()
    @IsOptional()
    public registrationEnd: string;
  
    @IsString()
    public venue: string;
  
    @ValidateNested()
    public ticketTypes: CreateTicketTypesDto[];
  }

  export class TicketTypesDto {
    @IsString()
    public name: string;
  
    @IsNumber()
    public unitPrice: number;

    @IsNumber()
    public totalTickets: number;
  
    @IsNumber()
    public boughtTickets?: number;
  }

  export class TicketsDto {
    @IsString()
    public ticketId: string;

    @IsString()
    public name: string;

    @IsString()
    public email: string;
  
    @IsString()
    public ticketType: string;
  
    @IsDateString()
    public purchaseDate: string;
  }

export class EventDto{
    @IsString()
    public userId: string;

    @IsString()
    public eventCode: string;

    @IsString()
    public eventName: string;
  
    @IsDateString()
    public datetime: string;

    @IsDateString()
    public registrationEnd: string;
  
    @IsString()
    public venue: string;
  
    @ValidateNested()
    public ticketTypes: TicketTypesDto[];

    @ValidateNested()
    public tickets?: TicketsDto[];
}
  

