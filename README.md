<h1 align="center">PlusAuth NodeJS Express Backend Starter Project</h1>

 <p align="center">
    Simple NodeJS Express project demonstrates basic API authorization flow with PlusAuth
    <br />
    <br />
    <a href="https://docs.plusauth.com/"><strong>Explore the PlusAuth Express API docs »</strong></a>
</p>

<details>
  <summary>Table of Contents</summary>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#license">License</a></li>
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

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

## What is PlusAuth

PlusAuth helps to individuals, team and organizations for implementing authorization and authentication system in a secure, flexible and easy way.

<a href="https://docs.plusauth.com/"><strong>Explore the PlusAuth Docs »</strong></a>
