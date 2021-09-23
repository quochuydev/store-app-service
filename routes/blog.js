const express = require("express");

const router = express.Router();
const { blogModel } = require("../models/blog");

const { crudServiceFactory } = require("../core/crud");
const { xMongoQuery } = require("../core/xquery");

const query = {
  createdAtGte: new Date(),
  createdAtLte: new Date(),
  shopIdNe: 123,
  orderIdNe: { type: Number, value: "123" },
  deletedAt: new Date(),
  keyword: "this is product",
};

xMongoQuery(query, {
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

setTimeout(async () => {
  await blogService.paginate({});
  console.log("done");
}, 100);

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
