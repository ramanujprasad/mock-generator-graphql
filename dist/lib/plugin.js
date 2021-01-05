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
exports.validate = exports.plugin = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var helpers_1 = require("./helpers");
var wiremock_1 = require("./wiremock");
var proxy_1 = require("./proxy");
var plugin = function (_, documents, config) { return __awaiter(void 0, void 0, void 0, function () {
    var document, requestMapping, response, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                document = helpers_1.getDocumentByName(config.operation.name, documents);
                if (!document)
                    throw new Error('It seems no GraphQL operations could be found');
                requestMapping = wiremock_1.getRequestMapping(config, document);
                if (!config.proxy) return [3 /*break*/, 3];
                _b = (_a = JSON).stringify;
                return [4 /*yield*/, proxy_1.getResponse(document, config)];
            case 1:
                response = _b.apply(_a, [_c.sent()]);
                return [4 /*yield*/, fs_extra_1.default.outputFile(config.wiremock.mocksDirectory + "/" + requestMapping.response.bodyFileName, response)];
            case 2:
                _c.sent();
                _c.label = 3;
            case 3: return [2 /*return*/, JSON.stringify(requestMapping)];
        }
    });
}); };
exports.plugin = plugin;
var validate = function (_, __, config) {
    if (!config.wiremock || !config.wiremock.mocksDirectory) {
        throw new Error("invalid configuration: mocksDirectory is not specified");
    }
    if (!config.operation || !config.operation.name) {
        throw new Error("invalid configuration: no operation is specified");
    }
    if (!config.proxy || !config.proxy.schema) {
        console.trace("configuration warning: could not generate response as no proxy configuration is given.");
    }
};
exports.validate = validate;
