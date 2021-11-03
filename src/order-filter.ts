import { Type } from "class-transformer";
import {
  ValidateNested,
  Length,
  IsEmail,
  IsDate,
  IsEnum,
  IsInt,
} from "class-validator";

export class DateFilter {
  @IsDate()
  lt: Date | string;

  @IsDate()
  gt: Date | string;

  @IsDate()
  gte: Date | string;

  @IsDate()
  lte: Date | string;
}

enum OrderStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  ARCHIVED = "archived",
  CANCELED = "canceled",
  REQUIRES_ACTION = "requires_action",
}

enum FulfillmentStatus {
  NOT_FULFILLED = "not_fulfilled",
  FULFILLED = "fulfilled",
  PARTIALLY_FULFILLED = "partially_fulfilled",
  SHIPPED = "shipped",
  PARTIALLY_SHIPPED = "partially_shipped",
  CANCELED = "canceled",
  RETURNED = "returned",
  PARTIALLY_RETURNED = "partially_returned",
  REQUIRES_ACTION = "requires_action",
}

enum PaymentStatus {
  CAPTURED = "captured",
  AWAITING = "awaiting",
  NOT_PAID = "not_paid",
  REFUNDED = "refunded",
  PARTIALLY_REFUNDED = "partially_refunded",
  CANCELED = "canceled",
  REQUIRES_ACTION = "requires_action",
}

export class OrderFilter {
  id: string;

  q: string;

  @IsEnum(OrderStatus, { each: true })
  status: OrderStatus[];

  @IsEnum(FulfillmentStatus, { each: true })
  fulfillment_status: FulfillmentStatus[];

  @IsEnum(PaymentStatus, { each: true })
  payment_status: PaymentStatus[];

  display_id: string;

  cart_id: string;

  @Type(() => Number)
  @IsInt()
  offset: number;

  @Type(() => Number)
  @IsInt()
  limit: number;

  expand: string;
  fields: string;
  customer_id: string;

  @IsEmail()
  email: string;

  region_id: string;

  @Length(3)
  currency_code: string;

  tax_rate: string;

  @ValidateNested()
  canceled_at: DateFilter;

  @ValidateNested()
  created_at: DateFilter;

  @ValidateNested()
  updated_at: DateFilter;
}
