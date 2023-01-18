import PDFDocument from "pdfkit";
import request from "request";
// TODO: transform  this code to TypeScript
export { getPdf };
async function getPdf(imageUrls) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        let imgUrls = [];
        let promises = [];
        imageUrls.forEach((url) => {
            promises.push(new Promise((resolve, reject) => {
                request.get({ url, encoding: null }, (err, response, body) => {
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
//# sourceMappingURL=index.js.map