import { fastify } from "fastify";
import { FastifyPluginCallback } from "fastify";
import cardRoutes from "./card/CardRouter";

const lectureRoutes: FastifyPluginCallback = async (fastify, opts) => {
  fastify.register(cardRoutes, {
    prefix: "/cards",
  });
};

export default lectureRoutes;
