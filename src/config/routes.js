module.exports = (app) => {
  app.route('/auth/signin')
    .post(app.routes.auth.signin);
  app.route('/auth/signup')
    .post(app.routes.users.create);
  app.route('/users')
    .all(app.config.passport.authenticate())
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);
  app.route('/users/:id')
    .all(app.config.passport.authenticate())
    .get(app.routes.users.show);
  app.route('/movies')
    .all(app.config.passport.authenticate())
    .get(app.routes.movies.findAll)
    .post(app.routes.movies.create);
  app.route('/movies/:id')
    .all(app.config.passport.authenticate())
    .get(app.routes.movies.show)
    .put(app.routes.movies.update);
};
