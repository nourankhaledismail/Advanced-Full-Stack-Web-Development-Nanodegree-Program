"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var application = (0, express_1.default)();
var port = 3000;
application.get("/", function (req, res) {
    res.send("HELLOO");
});
application.use("/api", index_1.default);
application.listen(port, function () {
    console.log("Listening on the localhost at http://localhost:".concat(port));
});
exports.default = application;
