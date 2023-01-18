import PDFDocument from "pdfkit";
import request from "request";

// TODO: transform  this code to TypeScript
export { getPdf };
async function getPdf(imageUrls: string[]): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		const doc = new PDFDocument();
		let imgUrls: string[] = [];
		let promises: any[] = [];
		imageUrls.forEach((url: string) => {
			promises.push(
				new Promise((resolve: any, reject: any): void => {
					request.get({ url, encoding: null }, (err, response, body) => {
						if (err) {
							reject(err);
						} else {
							imgUrls.push(body);
							resolve();
						}
					});
				})
			);
		});
		Promise.all(promises).then(() => {
			imgUrls.forEach((image: string) => {
				doc.image(image, 0, 0, {
					width: doc.page.width,
					height: doc.page.height,
				});
				doc.addPage();
			});
			doc.end();
			let chunks: any[] = [];
			doc.on("data", (chunk: any) => {
				chunks.push(chunk);
			});
			doc.on("end", () => {
				const result = Buffer.concat(chunks);
				resolve(result);
			});
		});
	});
}
