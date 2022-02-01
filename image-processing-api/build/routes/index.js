"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageProcessing_1 = __importDefault(require("./api/imageProcessing"));
var routes = express_1.default.Router();
routes.get("/", function (req, res) {
    res.send("WELCOME API");
});
/* It's used when we want to resize the image */
routes.use("/resized", imageProcessing_1.default);
/* To get The original image from the folder */
routes.use("/", express_1.default.static("./images"));
exports.default = routes;
