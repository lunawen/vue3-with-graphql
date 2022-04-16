# How to run

## 1. Run backend

```shell
cd backend-graphql-server
npm i
npm run apollo
# GraphQL Server is running on http://localhost:4000/graphql
```

## 2. Run frontend

frontend will consume backend graphql api

```shell
cd frontend-vite
npm i
npm run dev
```

## 3. Issues

The subscription is not working properly, I've raised an [issue](https://github.com/enisdenjo/graphql-ws/issues/351) to the library repo.
