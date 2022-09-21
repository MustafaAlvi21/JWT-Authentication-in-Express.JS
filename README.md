
# JWT Authentication in Express.JS

It an example of user registration, login and private routes with backend restAPI using mongoDB, Nodejs(Express.js) and mongoose, authentication using JWT token.


## Acknowledgements

 - [Node JS](https://nodejs.org/en//)
 - [Express JS](https://expressjs.com/)
 - [MongoDB](https://www.mongodb.com/)

### Packages Used
 - [express](https://www.npmjs.com/package/express)
 - [body-parser](https://www.npmjs.com/package/body-parser)
 - [mongoose](https://www.npmjs.com/package/mongoose)
 - [morgan](https://www.npmjs.com/package/morgan)
 - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
 - [cors](https://www.npmjs.com/package/cors)
 - [bcrypt](https://www.npmjs.com/package/bcrypt)
 - [mongoose-error-beautifier](https://www.npmjs.com/package/mongoose-error-beautifier)
 - [dotenv](https://www.npmjs.com/package/dotenv)


## API Reference

#### Register User

```http
  POST /auth/add-user
```

| Parameter  | Type     | Unique | Description                 |
| :--------  | :------- | :----- | :-------------------------- |
| `email`    | `string` | `yes`  | **Required**. Your username |
| `username` | `string` | `yes`  | **Required**. Your email    |
| `password` | `string` | `no`   | **Required**. Your password |

##### ***Response***
`Success message or Error message`


#### Login

```http
  POST /auth/login
```

| Parameter   | Type     | Description                       |
| :--------   | :------- | :-------------------------------- |
| `username`  | `string` | **Required**. Id of item to fetch |
| `password`  | `string` | **Required**. Id of item to fetch |

###### ***Response***
`JWT Token and success message` **or** `Error message`


#### User Profile
`You just need to pass JWT Token in hearders`

```http
  GET /auth/profile
```

| Parameter   | Type     | Description                       |
| :--------   | :------- | :-------------------------------- |
| `JWT Token` | `string` |  `When you logged In you will receive JWT Token in response` |

##### ***Response***
`User data and isLoggedIn: true will receive.`**or** `Error message and isLoggedIn: false`

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`: `mongodb://localhost:27017/__Name Of Database__`

`PORT`: `On which you want to run your server`

`JWT_SECRET`: `Your SECRET string for JWT Authentication`
## Feedback

If you have any feedback, please reach out to us at mustafaalvi21@gmail.com

