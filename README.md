# medusa-validation-benchmarks

[Go to Medusa](https://github.com/medusajs/medusa)

We are considering moving away from Joi for validation of request bodies on our API endpoints. In the process we are evaluating `class-validator` as an alternative; this project aims to uncover performance differences between the two approaches.

## Running the benchmarking test
```
git clone https://github.com/srindom/medusa-validation-benchmarks.git
cd medusa-validation-benchmarks
yarn && yarn benchmark
```

## Input

100000 dummy request payloads for Order Filters have been generated. The project runs validation on all of them in sequence using Joi's `validate` function and class-validator's `validateSync` function.

The timing was performed over 10 runs and the results show the average time for a run.

## Result

### Tested on a MacBook Air (M1, 2020)

- **class-validator + class-transformer**: takes on avg 1115.3
- **Joi validation**: takes on avg 1369.9

```
$ yarn benchmark
yarn run v1.22.11
$ ts-node ./src/benchmark.ts
class-validator avg: 1115.3
joi avg: 1369.9
✨  Done in 25.85s.
```

### Tested on MacBook Pro (Intel Core i7, 2018, 2.2 GHz 6-Core)

- **class-validator + class-transformer**: takes on avg 2668.6
- **Joi validation**: takes on avg 3055.2

```
$ yarn benchmark
yarn run v1.22.10
$ ts-node ./src/benchmark.ts
class-validator avg: 2668.6
joi avg: 3055.2
✨  Done in 59.22s.
```

### Tested HP Elitebook Folio 1040 G3, Intel Core i7 6500U, 2016, 2.5 GHz, 2 cores

- **class-validator + class-transformer**: takes on avg 2992.9
- **Joi validation**: takes on avg 3515.2

```
$ yarn benchmark
yarn run v1.22.5
$ ts-node ./src/benchmark.ts
class-validator avg: 2992.9
joi avg: 3515.2
Done in 67.47s.
```

## Conclusion

**class-validator + class-transformer** is clearly the fastest option.
