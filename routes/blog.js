const express = require("express");
const _ = require("lodash");

const router = express.Router();
const { blogModel } = require("../models/blog");

const query = {
  createdAtGte: new Date(),
  createdAtLte: new Date(),
  shopIdNe: 123,
  orderIdNe: "123",
  deletedAt: new Date(),
};

const result = {};

const operators = [
  {
    match: (key) => key.endsWith("Gte"),
    key: (key) => key.slice(0, -3),
    do: (e) => ({ $gte: e }),
  },
  {
    match: (key) => key.endsWith("Lte"),
    key: (key) => key.slice(0, -3),
    do: (e) => ({ $lte: e }),
  },
  {
    match: (key) => key.endsWith("Ne"),
    key: (key) => key.slice(0, -2),
    do: (e) => ({ $ne: e }),
  },
];

Object.keys(query)
  .map((key) => {
    for (const o of operators) {
      if (o.match(key)) {
        return { [o.key(key)]: o.do(query[key]) };
      }
    }

    return { [key]: query[key] };
  })
  .map((e) => _.merge(result, e));

console.log(result);

const crudServiceFactory = ({ model }) => {
  const crudService = {
    paginate: async (query) => {
      const limit = query.limit ? Number(query.limit) : 20;
      const page = query.page ? Number(query.page) : 1;
      const skip = limit * (page - 1);
      delete query.limit;
      delete query.page;

      const total = await model.count(query);

      const totalPage = Math.ceil(total / limit);
      const meta = { total, limit, page, skip, totalPage };
      console.log(meta, query);

      if (!total) {
        return { meta, items: [] };
      }

      const items = await model
        .find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);

      return { meta, items };
    },

    findOne: (query) => {
      return model.findOne(query).lean(true);
    },

    create: (data) => {
      return model.create(data);
    },
  };

  return crudService;
};

const blogService = crudServiceFactory({ model: blogModel });

router.get("/api/blogs", async (req, res) => {
  const result = await blogService.paginate(req.query);
  res.json(result);
});

router.get("/api/blogs/:id", async (req, res) => {
  const result = await blogService.findOne({ _id: req.params.id });
  res.json(result);
});

router.post("/api/blogs", async (req, res) => {
  const result = await blogService.create(req.body);
  res.json(result);
});

module.exports = { blogRoute: router };
