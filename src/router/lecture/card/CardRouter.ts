import { AxiosReturn, getAxios } from "@sku/data";
import fastify, { FastifyPluginCallback } from "fastify";
import { join } from "path";

const server = fastify();

const cardRoutes: FastifyPluginCallback = async (fastify, opts) => {
  fastify.get("/:cardId", async (req, res) => {
    //
    console.log("##REQ", req.params);
    const params = req.params as { cardId: string };
    const axios = getAxios();
    const response = await axios
      .get(`http://lecture:8080/cards/${params.cardId}`, {
        headers: {
          cineroomids: (req.raw.headers.cineroomids as string) || "",
          audienceid: (req.raw.headers.audienceid as string) || "",
          Authorization: req.raw.headers.authorization || "",
        },
      })
      .then(AxiosReturn)
      .catch((err) =>
        console.log("##################################################\n", err)
      );
    console.log(response.card.id);
    return response.card.id;
  });
};

export default cardRoutes;
