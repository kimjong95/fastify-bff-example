import cors from "@fastify/cors";
import { AxiosReturn, getAxios } from "@sku/data";
import fastify, { FastifyListenOptions } from "fastify";
import { callbackify } from "util";
import AppConfig from "./config/server.config";
import apiRoutes from "./router/routes";

const server = fastify({
  logger: true,
});

// router config
server.register(apiRoutes, {
  prefix: "/", // optional
});

// router config
// server.register(require("@fastify/http-proxy"), {
//   upstream: "http://stg.mysuni.sk.com",
//   // prefix: "/api", // optional
//   http2: false, // optional
// });

// test code/////
server.get("/ping", async (request, reply) => {
  return "ponggg\n";
});

server.get("/pong", async (req, res) => {
  if (!res.status(200)) {
    console.log("--");
    return "1234";
  }
});

///////////////

const appConfig = AppConfig();

const options: FastifyListenOptions = {
  host: appConfig.host,
  port: appConfig.port,
};

server.listen(options, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
