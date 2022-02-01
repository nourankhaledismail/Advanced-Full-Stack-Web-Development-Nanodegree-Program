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
exports.pathOfImage = exports.pathOfResizedImage = void 0;
var express_1 = __importDefault(require("express"));
/* The path module provides utilities for working with file and directory paths */
var path_1 = __importDefault(require("path"));
/* The fs module is to check if the file is exist or not */
var fs_1 = __importDefault(require("fs"));
var resizeImage_1 = __importDefault(require("../../utilities/resizeImage"));
var imageProcessing = express_1.default.Router();
/*The absolute path of the image after resizing it*/
var pathOfResizedImage = path_1.default.join(path_1.default.resolve("./"), "/images/thumb");
exports.pathOfResizedImage = pathOfResizedImage;
/*The absolute path of the image*/
var pathOfImage = path_1.default.join(path_1.default.resolve("./"), "/images");
exports.pathOfImage = pathOfImage;
imageProcessing.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nameOfImage, height, width, originalImagePath, image_R, resizedImage, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nameOfImage = req.query.image;
                height = parseInt(req.query.height);
                width = parseInt(req.query.width);
                originalImagePath = path_1.default.resolve(pathOfImage, "".concat(nameOfImage, ".jpg"));
                /* check if the user enters a valid value for width and height, and enters the name of image or name of non existing image */
                if (!nameOfImage ||
                    (!fs_1.default.existsSync(originalImagePath) &&
                        (isNaN(height) || !height || height <= 0) &&
                        (isNaN(width) || !width || width <= 0))) {
                    /* Return 400 because it's a Bad Request, The User uses incorrect Syntax in the Request */
                    res
                        .status(400)
                        .send("Please enter the name of image, height and width greater than 1");
                    return [2 /*return*/];
                }
                /* check if the user enters a valid value for width and height */
                if ((isNaN(height) || !height || height <= 0) &&
                    (isNaN(width) || !width || width <= 0)) {
                    /* Return 400 because it's a Bad Request, The User uses incorrect Syntax in the Request */
                    res
                        .status(400)
                        .send("Please enter the height and width of the image greater than 1");
                    return [2 /*return*/];
                }
                /* check if the user doesn't enter the image name or enters a name of non existing image */
                if (!nameOfImage || !fs_1.default.existsSync(originalImagePath)) {
                    console.log(!fs_1.default.existsSync(originalImagePath));
                    /* Return 400 because it's a Bad Request, The User uses incorrect Syntax in the Request */
                    res.status(400).send("Please enter the name of image");
                    return [2 /*return*/];
                }
                /* Check if the user doesn't enter the height or enters it less than zero or enters a digit instead of a number */
                if (isNaN(height) || !height || height <= 0) {
                    /* Return 400 because it's a Bad Request, The User uses incorrect Syntax in the Request */
                    res
                        .status(400)
                        .send("Please enter the height of the image greater than 1");
                    return [2 /*return*/];
                }
                /* Check if the user doesn't enter the width or enters it less than zero or enters a digit instead of a number */
                if (isNaN(width) || !width || width <= 0) {
                    /* Return 400 because it's a Bad Request, The User uses incorrect Syntax in the Request */
                    res
                        .status(400)
                        .send("Please enter the width of the image greater than 1");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                image_R = path_1.default.resolve(pathOfResizedImage, "".concat(nameOfImage, "W").concat(width, "H").concat(height, ".jpg"));
                if (!fs_1.default.existsSync(image_R)) return [3 /*break*/, 2];
                res.sendFile(image_R);
                return [2 /*return*/];
            case 2: return [4 /*yield*/, (0, resizeImage_1.default)(nameOfImage, height, width)];
            case 3:
                resizedImage = _a.sent();
                res.sendFile(resizedImage);
                try {
                    res.sendFile(resizedImage);
                }
                catch (error) {
                    res.status(400).send(error);
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(400).send(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = imageProcessing;
