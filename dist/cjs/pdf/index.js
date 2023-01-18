"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPdf = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const request_1 = __importDefault(require("request"));
async function getPdf(imageUrls) {
    return new Promise((resolve, reject) => {
        const doc = new pdfkit_1.default();
        let imgUrls = [];
        let promises = [];
        imageUrls.forEach((url) => {
            promises.push(new Promise((resolve, reject) => {
                request_1.default.get({ url, encoding: null }, (err, response, body) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        imgUrls.push(body);
                        resolve();
                    }
                });
            }));
        });
        Promise.all(promises).then(() => {
            imgUrls.forEach((image) => {
                doc.image(image, 0, 0, {
                    width: doc.page.width,
                    height: doc.page.height,
                });
                doc.addPage();
            });
            doc.end();
            let chunks = [];
            doc.on("data", (chunk) => {
                chunks.push(chunk);
            });
            doc.on("end", () => {
                const result = Buffer.concat(chunks);
                resolve(result);
            });
        });
    });
}
exports.getPdf = getPdf;
//# sourceMappingURL=index.js.map