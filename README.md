# moviesApi

Api for registering, updating, listing and searching for films using Parse Server + Node.js.

## Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Consign](https://github.com/jarradseers/consign)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [JWT-simple](https://github.com/hokaccha/node-jwt-simple)
- [Parse Server](https://github.com/parse-community/parse-server)
- [Passport](http://www.passportjs.org/)
- [Passport-jwt](http://www.passportjs.org/packages/passport-jwt/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## Installation

The following steps will help install and run moviesApi on your local computer. Make sure MongoDB instances are active:

1. git clone https://github.com/Caxandre/moviesApi.git;

2. Install all project dependencies with *npm install* or *yarn install*;

3. Enter values ​​for the authentication and Parse Server variables in the ENV file, located at the root of the project;

4. Start the development server with *npm start* or *yarn start*.

## Main Endpoints

* POST /signup

Sending Body ->
```json
{
 "nome": "newUser",
 "email": "newuserd@example.com",
 "password": "123456"
}
```

* POST /signin

Sending Body ->
```json
{
 "email": "newuserd@example.com",
 "password": "123456"
}
```

Returns Object ->
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InBndGlGUEhHSW8iLCJlbWFpbCI6InNkc2RAZXhhbXBsZS5jb20ifQ.C_UrG71jIheGhPuvpi7gYlH9QDORtPXgL2SsUdNnvLs"
}
```

* GET /movies

Returns Array ->
```json
[
	{
    "titulo": "filme",
    "descricao": "descricao do filme",
    "poster": "//cdn.catawiki.net/assets/marketing/uploads-files/45361-986ea3823cec48712f7f18a2e3168720a4d08776-story_inline_image.png",
    "data_lancamento": "15/10/2020",
    "createdAt": "2020-10-16T00:21:30.822Z",
    "updatedAt": "2020-10-16T00:21:30.822Z",
    "objectId": "rpwKkmD4r0"
  },{...}
]
```

* POST /movies

Sending Body ->
```json
{
    "titulo": "filme",
    "descricao": "descricao do filme",
    "poster": "//cdn.catawiki.net/assets/marketing/uploads-files/45361-986ea3823cec48712f7f18a2e3168720a4d08776-story_inline_image.png",
    "data_lancamento": "15/10/2020",
}
```

Returns Object ->
```json
{
     "titulo": "filme",
    "descricao": "descricao do filme",
    "poster": "//cdn.catawiki.net/assets/marketing/uploads-files/45361-986ea3823cec48712f7f18a2e3168720a4d08776-story_inline_image.png",
    "data_lancamento": "15/10/2020",
    "createdAt": "2020-10-16T00:21:30.822Z",
    "updatedAt": "2020-10-16T00:21:30.822Z",
    "objectId": "rpwKkmD4r0"
}
```
* GET /movies/:id
Sending -> '/movies/rpwKkmD4r0'

Returns Object ->
```json
{
    "titulo": "filme",
    "descricao": "descricao do filme",
    "poster": "//cdn.catawiki.net/assets/marketing/uploads-files/45361-986ea3823cec48712f7f18a2e3168720a4d08776-story_inline_image.png",
    "data_lancamento": "15/10/2020",
    "createdAt": "2020-10-16T00:21:30.822Z",
    "updatedAt": "2020-10-16T00:21:30.822Z",
    "objectId": "rpwKkmD4r0"
}
```

## Tests

To run the tests use the command *npm test* or *yarn test*

## Contact

Carlos Perrout - [Github](https://github.com/Caxandre) - **carlosperrout@gmail.com.br**
