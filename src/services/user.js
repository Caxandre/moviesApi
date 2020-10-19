const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../erros/ValidationError');

module.exports = (app) => {
  const findAll = () => {
    const users = new app.parse.Query('Users');
    return users.find();
  };

  const findById = (id) => {
    const users = new app.parse.Query('Users');
    return users.get(id);
  };

  const findByEmail = async (email) => {
    const User = new app.parse.Object('Users');
    const query = new app.parse.Query(User);
    query.equalTo('email', email);
    const results = await query.find();

    let userdb;

    for (let i = 0; i < results.length; i += 1) {
      userdb = results[i];
    }

    return JSON.stringify(userdb);
  };

  const getPasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (data) => {
    const user = new app.parse.Object('Users');
    if (!data.nome) throw new ValidationError('Nome é um atributo obrigatório');
    if (!data.email) throw new ValidationError('Email é um atributo obrigatório');
    if (!data.password) throw new ValidationError('Senha é um atributo obrigatório');

    const userD = await findByEmail(data.email);
    if (userD) throw new ValidationError('Email já cadastrado');

    const newUser = { ...data };
    newUser.password = getPasswordHash(data.password);

    return user.save(newUser);
  };

  return {
    findAll, findById, findByEmail, save,
  };
};
