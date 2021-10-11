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
    do: (value) => ({ $gte: new Date(value) }),
  },
  {
    match: (key) => key.endsWith("Lte"),
    key: (e) => e.slice(0, -3),
    do: (value) => ({ $lte: new Date(value) }),
  },
  {
    match: (key) => key.endsWith("Ne"),
    key: (e) => e.slice(0, -2),
    do: (value) => ({ $ne: _value(value) }),
  },
  {
    match: (key) => key.endsWith("Eq"),
    key: (e) => e.slice(0, -2),
    do: (value) => ({ $eq: _value(value) }),
  },
  {
    match: (key) => key.endsWith("At"),
    do: (value) => new Date(value),
  },
];

const xMongoQuery = (query, options = {}) => {
  const result = {};

  Object.keys(query)
    .map((key) => {
      const __value = options.schema ? options.schema[key] : null;
      const value = __value ? __value(query[key]) : query[key];

      if (options.keyword && key === "keyword") {
        return options.keyword(query[key]);
      }

      for (const o of operators) {
        if (o.match(key)) {
          return { [o.key ? o.key(key) : key]: o.do(value) };
        }
      }

      return { [key]: value };
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
