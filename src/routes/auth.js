const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../erros/ValidationError');

module.exports = (app) => {
  const signin = (req, res, next) => {
    app.services.user.findByEmail(req.body.email)
      .then((user) => {
        if (!user) throw new ValidationError('Usuário ou senha não encontrados');
        const data = JSON.parse(user);

        if (bcrypt.compareSync(req.body.password, data.password)) {
          const payload = {
            id: data.objectId,
            name: data.name,
            email: data.email,
          };

          const token = jwt.encode(payload, process.env.APP_SECRET);
          res.status(200).json({ token });
        } else throw new ValidationError('Usuário ou senha não encontrados');
      }).catch((err) => next(err));
  };

  return { signin };
};
