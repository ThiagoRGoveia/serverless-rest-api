# Serverless REST

This is a basic implementation of a REST API using the Serverless Framework, AWS Lambda and DynamoDB

# Endpoints

## GET /users/{email}

Retrieves a user by email

## POST /users

Creates a new user

## GET /visits

Retrieves the visit counter

## PUT /visits

Increments the visit counter

## Usage

### Deployment

```
serverless deploy
```

### Installation

```
npm install
```

### Local development

```
npm run dev
```

### Testing

```
npm test
```

# Architecture

This project follows the Clean Architecture principles, which means that the code is divided into layers, each one with a specific responsibility.

## Folder structure

```
├──src
   ├── clients
   ├── errors
   ├── factories
   ├── functions
   ├── factories
   ├── handlers
   ├── models
   ├── use-cases
   ├── utils
```

# Documentation

[Postman collection](https://documenter.getpostman.com/view/10932304/2s93kz4QGm)

# TODOs

- [ ] Add integration tests
- [ ] Add configuration for multiple stages
- [ ] Add authentication
- [ ] Add authorization
- [ ] Add CI/CD
