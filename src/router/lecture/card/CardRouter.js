"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("@sku/data");
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)();
const cardRoutes = (fastify, opts) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.get("/:cardId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //
        console.log("##REQ", req.params);
        const params = req.params;
        const axios = (0, data_1.getAxios)();
        const response = yield axios
            .get(`https://stg.mysuni.sk.com/api/lecture/cards/${params.cardId}`, {
            headers: {
                cineroomids: req.raw.headers.cineroomids || "",
                audienceid: req.raw.headers.audienceid || "",
                Authorization: req.raw.headers.authorization || "",
            },
        })
            .then(data_1.AxiosReturn)
            .catch((err) => console.log("##################################################\n", err));
        return response.card.id;
    }));
});
exports.default = cardRoutes;
