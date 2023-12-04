import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import serverless from "serverless-http";

import appRouter from './appRouter';

/**
 * @param optionsSuccessStatus Provides a status code for successfully resolving OPTIONS requests (for legacy browser support).
 * @param credential Permission to provide a response to external JavaScript code by browsers.
 * @param origin A list of sources for which CORS is enabled.
 */
const corsOptions = {
	optionsSuccessStatus: 200,
	credentials: true,
	origin: '*',
};

const cors = require('cors');

const app = express();
app.use(cors(corsOptions));
app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	response.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});

const createContext = ({
	req: request,
	res: response,
}: trpcExpress.CreateExpressContextOptions) => ({});
app.use(
	'/',
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
		responseMeta() {
			return {
			  status: 200,
			  headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, PUT",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Credentials": "true",
			  },
			};
		  },
	})
);

export const handler = serverless(app);
