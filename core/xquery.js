const _ = require("lodash");

const xQuery = (type) => {
  // xMongoElastic
  return xMongoQuery;
};

const _value = (input) => {
  if (typeof input !== "object") {
    return input;
  }

  const { type, value } = input;

  if (type === Number) {
    return Number(value);
  }

  return value;
};

const operators = [
  {
    match: (key) => key.endsWith("Gte"),
    key: (e) => e.slice(0, -3),
    do: (e) => ({ $gte: e }),
  },
  {
    match: (key) => key.endsWith("Lte"),
    key: (e) => e.slice(0, -3),
    do: (e) => ({ $lte: e }),
  },
  {
    match: (key) => key.endsWith("Ne"),
    key: (e) => e.slice(0, -2),
    do: (e) => ({ $ne: _value(e) }),
  },
];

const xMongoQuery = (query, options) => {
  const result = {};

  Object.keys(query)
    .map((key) => {
      console.log({ key });

      for (const o of operators) {
        if (o.match(key)) {
          return { [o.key(key)]: o.do(query[key]) };
        }
      }

      if (options.keyword && key === "keyword") {
        return options.keyword(query[key]);
      }

      return { [key]: query[key] };
    })
    .map((e) => _.merge(result, e));

  console.log(result);

  return result;
};

const xElasticQuery = (query) => {
  const result = query;

  return result;
};
module.exports = { xQuery, xMongoQuery, xElasticQuery };
