# TMpro

## Table of Contents

- [Introduction](#introduction)
- [About](#about)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Docker](#docker)
  - [Manual](#manual)
- [Production](#production)
- [Testing](#testing)

## Introduction

TMpro is a Task priority and deadline tracker application that helps you organize your task and helps you track your deadline.

## About

TMpro is developed with Nodejs and Reactjs. The technologies used are:

- Nodejs
- Reactjs
- MongoDB
- Expressjs
- Nodemailer

## Installation

### Prerequisites

Before proceeding, make sure you have **Nodejs** and **mongoDB** installed in your local machine. (You can use Mongo atlas if you prefer).  
Head over to `server/` directory and open `.env.example` file and fill in the details. Then rename the file to `.env`. You can use [Ethereal](https://ethereal.email) for dummy email.

### Docker

Easiest way to run the application is by using `docker compose` utility. You must have docker installed in you local machine.  
Go to root directory and run the command:

```bash
docker compose -f docker-compose-dev.yml up --build -d
```

Once done, the server runs at port `3030` and client runs at `3000`.

### Manual

To run the application manually. First head over to `client/` and `server/` and run

```bash
npm install
npm run dev
```

on both directories. The server will run on port `3030` and client runs at `3000`.

## Production

_The current Production build is accessible on https://tmpro.ryuo.tech_

You can use `docker compose` in your production environment to deploy your application. TMpro also provides you with CI/CD github action workflows.  
All you need to do is pull the application on your server and create a `.env.production` file on the root directory, where `docker-compose.yml` is, and fill in the details. Then run

```bash
docker-compose up --build -d
```

The default port for server is `5001` and client is `5000`. You can change that as you see fit.

## Testing

Tests are done with the help of jest. Create a `.env.test` inside `server/` directory and fill in the environment details same as for development. You need to run mongo locally or put atlas url in env file.  
Once done, run the command

```bash
npm test
```

and it will run all the test.  
Alternately, if you have docker installed, you can use `run-test.sh` in root directory. Just run

```
sh run-test-sh
```
