"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentByName = void 0;
var graphql_1 = require("graphql");
var getDocumentByName = function (operationName, documents) {
    var _a;
    return (_a = documents.find(function (_a) {
        var _b, _c;
        var document = _a.document;
        return document && ((_c = (_b = graphql_1.getOperationAST(document)) === null || _b === void 0 ? void 0 : _b.name) === null || _c === void 0 ? void 0 : _c.value) === operationName;
    })) === null || _a === void 0 ? void 0 : _a.document;
};
exports.getDocumentByName = getDocumentByName;
