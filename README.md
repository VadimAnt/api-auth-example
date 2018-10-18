## Folder with strategies: app/libs/passport/strategies
## Connect all strategies: app/libs/passport/index.js
## Initialize passport: app/app.js

## Strategies: Local | JWT | GOOGLE | FACEBOOK | GITHUB

## Routes: 
 - `/auth/google` - send scope, auth (This is done from the front end)
 - `/auth/google/redirect` - after sucess auth (Passport set req.user, and recieve jwt token)
 - `/auth/facebook`
 - `/auth/facebook/redirect`
 - `/auth/github`
 - `/auth/github/redirect`
 - `/auth/signup` - Local strategy, register new user by email and password
 - `/auth/signin` - Local strategy, login by email, password
 - `/auth/secret` - check auth

Also you need to create oauth application in each system (See in passport documentation).
