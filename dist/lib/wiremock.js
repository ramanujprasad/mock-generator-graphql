"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBodyPatterns = exports.getBodyFileName = exports.createResponseMapping = exports.createRequestMapping = exports.getRequestMapping = void 0;
var isOperationDefinition = function (def) {
    return def.kind === "OperationDefinition";
};
var getRequestMapping = function (config, document) { return ({
    request: exports.createRequestMapping(config, document),
    response: exports.createResponseMapping(config, document),
}); };
exports.getRequestMapping = getRequestMapping;
var createRequestMapping = function (config, document) {
    var operation = (document.definitions.find(isOperationDefinition));
    return __assign(__assign({}, config.wiremock.request), { bodyPatterns: exports.getBodyPatterns(operation, config === null || config === void 0 ? void 0 : config.operation.variables) });
};
exports.createRequestMapping = createRequestMapping;
var createResponseMapping = function (config, document) {
    var _a, _b;
    var operation = (document.definitions.find(isOperationDefinition));
    var bodyFileName = ((_b = (_a = config === null || config === void 0 ? void 0 : config.wiremock) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.bodyFileName) ||
        exports.getBodyFileName(operation, config.operation);
    return __assign(__assign({}, config.wiremock.response), { bodyFileName: bodyFileName });
};
exports.createResponseMapping = createResponseMapping;
var getBodyFileName = function (operation, config) {
    var _a;
    var keyValString = (_a = operation.variableDefinitions) === null || _a === void 0 ? void 0 : _a.map(function (_a) {
        var variable = _a.variable;
        return "" + variable.name.value + (config.variables && config.variables[variable.name.value] ? "-" + config.variables[variable.name.value] : "");
    }).join("-");
    return "" + config.name + (keyValString ? "-" + keyValString : "") + ".json";
};
exports.getBodyFileName = getBodyFileName;
var getBodyPatterns = function (operation, variables) {
    var _a, _b;
    return (_a = operation.variableDefinitions) === null || _a === void 0 ? void 0 : _a.map(function (_a) {
        var variable = _a.variable;
        if (!variables || variables[variable.name.value] === undefined) {
            throw new Error("Could not provide query variable " + variable.name.value + ", " + variable.name.value + " is not given");
        }
        return {
            matchesJsonPath: "$.variables[?(@." + variable.name.value + " == '" + variables[variable.name.value] + "')]",
        };
    }).concat({
        matchesJsonPath: "$[?(@.operationName == '" + ((_b = operation === null || operation === void 0 ? void 0 : operation.name) === null || _b === void 0 ? void 0 : _b.value) + "')]",
    });
};
exports.getBodyPatterns = getBodyPatterns;
