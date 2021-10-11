const express = require("express");

const router = express.Router();
const { blogModel } = require("../models/blog");

const { xMongoQuery } = require("../core/xquery");
const { crudServiceFactory } = require("../core/crudService");

const query = {
  createdAtGte: new Date().toISOString(),
  createdAtLte: new Date().toISOString(),
  shopIdNe: 1001,
  price: "100000",
  orderIdEq: "1001",
  deletedAt: new Date().toISOString(),
  keyword: "this is product",
};

xMongoQuery(query, {
  schema: {
    price: Number,
    orderIdEq: Number,
  },
  keyword: (value) => {
    return {
      $or: [
        {
          title: { $regex: new RegExp(value) },
        },
        {
          body: { $regex: new RegExp(value) },
        },
      ],
    };
  },
});

const blogService = crudServiceFactory({ model: blogModel });

router.get("/api/blogs", async (req, res) => {
  const query = xMongoQuery(req.query, {
    schema: {
      price: Number,
      orderIdEq: Number,
    },
    keyword: (value) => {
      return {
        $or: [
          {
            title: { $regex: new RegExp(value) },
          },
          {
            body: { $regex: new RegExp(value) },
          },
        ],
      };
      // -----
    },
  });

  const result = await blogService.paginate(query);
  res.json(result);
});

router.post("/api/blogs/getList", async (req, res) => {
  const result = await blogService.paginate(req.body);
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
