import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { Validator } from "medusa-core-utils";
import { OrderFilter } from "./order-filter";

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
  console.log("Joi Validation starting", start);
  for (const tv of validationArray) {
    Validator.orderFilter().validate(tv);
  }
  const end = Date.now();
  console.log("Joi validation ended", end);
  console.log("Delta", end - start);
};

const performClassValidator = (validationArray) => {
  const startCv = Date.now();
  console.log("class-validator starting", startCv);
  for (const tv of validationArray) {
    const transformed = plainToClass(OrderFilter, tv);
    validateSync(transformed);
  }
  const endCv = Date.now();
  console.log("class-validator ended", endCv);
  console.log("Delta", endCv - startCv);
};

const validationArray = [];
for (let i = 0; i < 100000; i++) {
  validationArray.push(toValidate);
}
performClassValidator(validationArray);
performJoiValidation(validationArray);
