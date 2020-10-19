module.exports = (app) => {
  const findAll = () => {
    const movies = new app.parse.Query('Movies');
    return movies.find();
  };

  const save = (data) => {
    const movie = new app.parse.Object('Movies');
    return movie.save(data);
  };

  const show = (id) => {
    const movie = new app.parse.Query('Movies');
    return movie.get(id);
  };

  const update = async (id, data) => {
    const Movie = new app.parse.Object('Movies');
    const query = new app.parse.Query(Movie);
    query.equalTo('objectId', id);
    const results = await query.find();

    for (let i = 0; i < results.length; i += 1) {
      results[i].save(data);
    }
    return results[0];
  };

  return {
    findAll, save, show, update,
  };
};
