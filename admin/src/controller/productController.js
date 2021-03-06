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
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("./../entity/product");
var typeorm_1 = require("typeorm");
var rabbitmq_1 = require("../util/rabbitmq");
var ProductController = /** @class */ (function () {
    function ProductController() {
        var _this = this;
        this.productRepo = null;
        this.model = null;
        this.getProducts = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.productRepo = (0, typeorm_1.getRepository)(this.model);
                        return [4 /*yield*/, this.productRepo.find()];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, res.send(products)];
                }
            });
        }); };
        this.saveProduct = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var product, result, broker, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.productRepo = (0, typeorm_1.getRepository)(this.model);
                        return [4 /*yield*/, this.productRepo.create(req.body)];
                    case 1:
                        product = _a.sent();
                        return [4 /*yield*/, this.productRepo.save(product)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, rabbitmq_1.default.getInstance()];
                    case 3:
                        broker = _a.sent();
                        return [4 /*yield*/, broker.send('product_created', Buffer.from(JSON.stringify(result)))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, res.send(result)];
                    case 5:
                        ex_1 = _a.sent();
                        console.log(ex_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getProduct = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.productRepo = (0, typeorm_1.getRepository)(this.model);
                        return [4 /*yield*/, this.productRepo.findOne(req.params.id)];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, res.send(product)];
                }
            });
        }); };
        this.updateProduct = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var product, result, broker, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.productRepo = (0, typeorm_1.getRepository)(this.model);
                        return [4 /*yield*/, this.productRepo.findOne(req.params.id)];
                    case 1:
                        product = _a.sent();
                        this.productRepo.merge(product, req.body);
                        return [4 /*yield*/, this.productRepo.save(product)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, rabbitmq_1.default.getInstance()];
                    case 3:
                        broker = _a.sent();
                        return [4 /*yield*/, broker.send('product_updated', Buffer.from(JSON.stringify(result)))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, res.send(result)];
                    case 5:
                        ex_2 = _a.sent();
                        console.log(ex_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteProduct = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, broker, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.productRepo = (0, typeorm_1.getRepository)(this.model);
                        return [4 /*yield*/, this.productRepo.delete(req.params.id)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, rabbitmq_1.default.getInstance()];
                    case 2:
                        broker = _a.sent();
                        return [4 /*yield*/, broker.send('product_deleted', Buffer.from(JSON.stringify(req.params.id)))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.send(result)];
                    case 4:
                        ex_3 = _a.sent();
                        console.log(ex_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.likeProduct = function (eventProductId) { return __awaiter(_this, void 0, void 0, function () {
            var product, result, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.productRepo = (0, typeorm_1.getRepository)(this.model);
                        return [4 /*yield*/, this.productRepo.findOne(eventProductId)];
                    case 1:
                        product = _a.sent();
                        product.likes++;
                        return [4 /*yield*/, this.productRepo.save(product)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        ex_4 = _a.sent();
                        console.log(ex_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.model = product_1.Product;
        this.getProducts = this.getProducts.bind(this);
    }
    return ProductController;
}());
exports.default = ProductController;
