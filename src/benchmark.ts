import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import Joi from "joi";

import { OrderFilter } from "./order-filter";

const dateFilter = Joi.object({
  lt: Joi.alternatives(Joi.date().timestamp("unix"), Joi.date()),
  gt: Joi.alternatives(Joi.date().timestamp("unix"), Joi.date()),
  gte: Joi.alternatives(Joi.date().timestamp("unix"), Joi.date()),
  lte: Joi.alternatives(Joi.date().timestamp("unix"), Joi.date()),
});

const joiSchema = Joi.object().keys({
  id: Joi.string(),
  q: Joi.string(),
  status: Joi.array()
    .items(
      Joi.string().valid(
        "pending",
        "completed",
        "archived",
        "canceled",
        "requires_action"
      )
    )
    .single(),
  fulfillment_status: Joi.array()
    .items(
      Joi.string().valid(
        "not_fulfilled",
        "fulfilled",
        "partially_fulfilled",
        "shipped",
        "partially_shipped",
        "canceled",
        "returned",
        "partially_returned",
        "requires_action"
      )
    )
    .single(),
  payment_status: Joi.array()
    .items(
      Joi.string().valid(
        "captured",
        "awaiting",
        "not_paid",
        "refunded",
        "partially_refunded",
        "canceled",
        "requires_action"
      )
    )
    .single(),
  display_id: Joi.string(),
  cart_id: Joi.string(),
  offset: Joi.string(),
  limit: Joi.string(),
  expand: Joi.string(),
  fields: Joi.string(),
  customer_id: Joi.string(),
  email: Joi.string(),
  region_id: Joi.string(),
  currency_code: Joi.string(),
  tax_rate: Joi.string(),
  canceled_at: dateFilter,
  created_at: dateFilter,
  updated_at: dateFilter,
});

const toValidate = {
  id: "somestring",
  q: "free text bby",
  status: ["pending"],
  fulfillment_status: ["shipped"],
  payment_status: ["captured"],
  display_id: "12342",
  cart_id: "cart_id",
  offset: "133",
  limit: "1",
  expand: "string,1,1,2,3",
  fields: "shipping",
  email: "test@test.com",
  region_id: "test",
  currency_code: "eur",
  canceled_at: {
    gt: "2021-10-10",
  },
};

const performJoiValidation = (validationArray) => {
  const start = Date.now();
  for (const tv of validationArray) {
    const { value } = joiSchema.validate(tv);
    plainToClass(OrderFilter, value);
  }
  const end = Date.now();
  return end - start;
};

const performClassValidator = (validationArray) => {
  const start = Date.now();
  for (const tv of validationArray) {
    const transformed = plainToClass(OrderFilter, tv);
    validateSync(transformed);
  }
  const end = Date.now();

  return end - start;
};

const validationArray = [];
for (let i = 0; i < 100000; i++) {
  validationArray.push(toValidate);
}

const avg = (input) => {
  const sum = input.reduce((a, b) => a + b, 0);
  return sum / input.length || 0;
};

const cvRuns = [];
const joiRuns = [];

for (let i = 0; i < 10; i++) {
  cvRuns.push(performClassValidator(validationArray));
}
for (let i = 0; i < 10; i++) {
  joiRuns.push(performJoiValidation(validationArray));
}

console.log("class-validator avg:", avg(cvRuns));
console.log("joi avg:", avg(joiRuns));
