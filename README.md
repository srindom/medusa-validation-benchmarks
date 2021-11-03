# medusa-validation-benchmarks

[Go to Medusa](https://github.com/medusajs/medusa)

We are considering moving away from Joi for validation of request bodies on our API endpoints. In the process we are evaluating `class-validator` as an alternative; this project aims to uncover performance differences between the two approaches.

## Input

10000 dummy request payloads for Order Filters have been generated. The project runs validation on all of them in sequence using Joi's `validate` function and class-validator's `validateSync` function.

## Result

- **class-validator + class-transformer**: completes in 1199 ms
- **Joi validation**: completes in 23983 ms

```
$ yarn benchmark
yarn run v1.22.11
$ ts-node ./src/benchmark.ts
class-validator starting 1635930064900
class-validator ended 1635930066099
Delta 1199
Joi Validation starting 1635930066099
Joi validation ended 1635930090082
Delta 23983
✨  Done in 25.95s.
```

## Conclusion

**class-validator + class-transformer** is clearly the fastest option.
