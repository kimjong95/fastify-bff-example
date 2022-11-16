import { FastifyPluginCallback } from "fastify";
import lectureRoutes from "./lecture/LectureRouter";

const apiRoutes: FastifyPluginCallback = async (fastify, opts) => {
  fastify.register(lectureRoutes, {
    prefix: "/lecture",
  });
  // fastify.register(workdayRoutes, {
  //   prefix: "/workday",
  // });
};

export default apiRoutes;
