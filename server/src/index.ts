import express from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

import appRouter from "./appRouter";

const app = express();

const createContext = ({
  req: request,
  res: response,
}: trpcExpress.CreateExpressContextOptions) => ({});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

const PORT = 4000;

const server = createHTTPServer({
  router: appRouter,
  
});

server.listen(PORT);

console.log(`Running on PORT ${PORT}`);