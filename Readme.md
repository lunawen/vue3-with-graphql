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

The subscription is not working properly because server side is using a deprecated library.

You can find a working example here.

[Client](https://github.com/Code-Pop/graphql-client/tree/L9-end)
[Server](https://github.com/Code-Pop/graphql-server)
