"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_URL = void 0;
const BASE_URL = "https://apk.bacakomik.co/";
exports.API_URL = {
    popular: `${BASE_URL}?page=terpopuler`,
    latest: `${BASE_URL}?page=latest`,
    search: function (query, page) {
        return `${BASE_URL}?page=search&search=${query}&paged=${page}`;
    },
};
//# sourceMappingURL=Config.js.map