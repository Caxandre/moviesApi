module.exports = (app) => {
  const findAll = (req, res, next) => {
    app.services.user.findAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const show = async (req, res, next) => {
    try {
      const result = await app.services.user.findById(req.params.id);
      return res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  };

  const create = async (req, res, next) => {
    try {
      const result = await app.services.user.save(req.body);
      return res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  };

  return {
    findAll, show, create,
  };
};
