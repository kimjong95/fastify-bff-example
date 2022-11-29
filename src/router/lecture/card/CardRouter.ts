import fastify, { FastifyPluginCallback } from "fastify";
import { getLearningContentsByCardId } from "../../../service/lecture/LectureService";
import { parseHeader } from "../../../shared/header.util";

const server = fastify();

const cardRoutes: FastifyPluginCallback = async (fastify, opts) => {
  fastify.get("/:cardId", async (req, res) => {
    //
    const headers = parseHeader(req.raw.headers);
    const params = req.params as { cardId: string };
    return await getLearningContentsByCardId(headers, params.cardId);
  });
};

export default cardRoutes;
