-import yarn add jsonwebtoken
-const jwt = require(jsonwebtoken)
require it


-go to login and create the token 
const token = generateToken(user)

-create a function to pass to the token at bottom of file

-create a secret file in config folder in the root of project. Add code
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'add a third table for many to many joins'
}

i-mport secret to the the auth-router wich is passed into the function at the buttom of the file

-pass the token back in the message, after the back ticks


-refactor the restricted middleware file
but need to put token on auth headers in postman
Create an Authorization and then past in the token from the login(dont copy the "")

/// that was the first major lists of steps

-create middleware for the users endpoint(students need their own info)

-now we need access to certain parts of a website depending who the client is. How do we create that type of middleware? Add to the Auth folder check-role-middleware.js for this new middleware


-go to users router and update user endpoint by importing -with require
then add new middleware from check-role-middleware into the pathway

now add Roles to the generatetoken function inside the auth-router

now that there is a 'roles' on the token generator function, save all and re log in to get access to the get users pathway