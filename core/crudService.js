const crudServiceFactory = ({ model, options }) => {
  const crudService = {
    paginate: async (query = {}) => {
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

module.exports = { crudServiceFactory };
