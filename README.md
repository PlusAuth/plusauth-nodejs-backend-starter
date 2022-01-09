<h1 align="center">PlusAuth NodeJS Express Backend Starter Project</h1>

 <p align="center">
    Simple NodeJS Express project demonstrates basic API authorization flow with PlusAuth
    <br />
    <br />
    <a href="https://docs.plusauth.com/quickStart/server-to-server/nodejs/express"><strong>Explore the PlusAuth Express API docs »</strong></a>
</p>

<details>
  <summary>Table of Contents</summary>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#calling-endpoints">Calling Endpoints</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#what-is-plusauth">What is PlusAuth</a></li>
  </ol>
</details>

## About The Project

This is a very simple NodeJS project demonstrating basic API authorization flows with PlusAuth. To keep things simple Express.js used as the server framework and express-jwt for authorization.


## Prerequisites
Before running the project, you must first follow these steps:

### Create PlusAuth Account

- Create a PlusAuth account and a tenant at https://dashboard.plusauth.com
- Navigate to `Clients` tab and create a client of type `Server to Server`.


### Create PlusAuth API
- Go to `Api's` page and create a new Api. 
- Navigate to `Permissions` tab and create permissions below for your Api.

  - `users:read`
  - `users:write`
  - `users:update`
  - `users:delete`

- Finally navigate to `Authroized Clients` tab, authorize your `client` and grant the permissions.

Finally write down your api `audience` and tenant id for server configuration 

## Getting Started

First install dependencies 
```shell script
$ npm install
# or with yarn
$ yarn install
```

After that all you need to do is configuring the application. Rename `.env.example` file as just`.env`.

Then configure the `.env` file using your api `audience` and PlusAuth tenant id.

Now you can start the server:

```shell script
$ npm run start
// or with yarn
$ yarn start
```
    

The example is hosted at http://localhost:3000/

## Calling Endpoints

All endpoints are secured and requires `access token` in request header. You can make requests to following endpoints: 

- **GET** http://localhost:3000/users
- **POST** http://localhost:3000/users
- **PUT** http://localhost:3000/users
- **DELETE** http://localhost:3000/users

Obtain an access token using command line or a REST Client with your PlusAuth Client and API properties.

```bash
# bash

curl --request POST \
  --url 'https://<YOUR_TANENT_ID>.plusauth.com/oauth2/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=client_credentials' \
  --data 'client_id=<YOUR_CLIENT_ID>' \
  --data 'client_secret=<YOUR_CLIENT_SECRET>' \
  --data 'audience=<YOUR_AUDIENCE>' \
  --data 'scope=users:read users:write users:update users:delete'
  
```

Create a `GET` request and pass the access token you obtained as `Authorization` header. You will get following response:

```bash
# bash

> curl -i http://localhost:3000/users \
-H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCIsImtpZCI6Inh4T3l2R0hWV3dCIsImtpZ..."
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Content-Type: text/html; charset=utf-8
Content-Length: 14
Connection: keep-alive
Keep-Alive: timeout=5

All Users List
```

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

## What is PlusAuth

PlusAuth helps to individuals, team and organizations for implementing authorization and authentication system in a secure, flexible and easy way.

<a href="https://docs.plusauth.com/"><strong>Explore the PlusAuth Docs »</strong></a>
