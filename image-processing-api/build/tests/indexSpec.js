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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var resizeImage_1 = __importDefault(require("../utilities/resizeImage"));
var index_1 = __importDefault(require("../index"));
var path_1 = __importDefault(require("path"));
var request = (0, supertest_1.default)(index_1.default);
/* This for testing the endpoints */
describe("Test endpoint responses", function () {
    it("gets the api endpoint", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/api")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    /* This for testing if the user gets the original image */
    it("test to get the api of the original image", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/api/icelandwaterfall.jpg")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    /* This for testing when the user enter the name of the image and height but doesn't enter a number for width  */
    it("test /api/resized enter a digit in width instead of number", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/api/resized/?image=icelandwaterfall&width=a&height=300")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
    /* This for testing when the user enter the name of the image and width but forget the height  */
    it("test /api/resized forget width", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/api/resized/?image=icelandwaterfall&width=250")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Test the resize dimensions of the image", function () {
    it("The return value will be true", function () { return __awaiter(void 0, void 0, void 0, function () {
        var nameOfImage, outputPath, resize;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nameOfImage = "icelandwaterfall";
                    outputPath = path_1.default.join(__dirname, "../../images/thumb/icelandwaterfallW300H400.jpg");
                    return [4 /*yield*/, (0, resizeImage_1.default)(nameOfImage, 300, 400)];
                case 1:
                    resize = _a.sent();
                    console.log(outputPath);
                    expect(resize).toBe(outputPath);
                    return [2 /*return*/];
            }
        });
    }); });
});
