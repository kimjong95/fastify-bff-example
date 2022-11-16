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
const fastify_1 = __importDefault(require("fastify"));
const server_config_1 = __importDefault(require("./config/server.config"));
const routes_1 = __importDefault(require("./router/routes"));
const server = (0, fastify_1.default)({
    logger: true,
});
// router config
server.register(routes_1.default, {
    prefix: "/bff", // optional
});
// router config
// server.register(require("@fastify/http-proxy"), {
//   upstream: "http://stg.mysuni.sk.com",
//   // prefix: "/api", // optional
//   http2: false, // optional
// });
// test code/////
server.get("/ping", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return "ponggg\n";
}));
server.get("/pong", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.status(200)) {
        console.log("--");
        return "1234";
    }
}));
///////////////
const appConfig = (0, server_config_1.default)();
const options = {
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
