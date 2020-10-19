module.exports = (app) => {
  const findAll = (req, res, next) => {
    app.services.movie.findAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const create = async (req, res, next) => {
    try {
      const result = await app.services.movie.save(req.body);
      return res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  };

  const show = async (req, res, next) => {
    try {
      const result = await app.services.movie.show(req.params.id);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  const update = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const result = await app.services.movie.update(id, data);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  return {
    findAll,
    create,
    show,
    update,
  };
};
