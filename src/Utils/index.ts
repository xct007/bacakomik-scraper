import axios from "axios";
import { API_URL } from "./Config";

type ResultPopular = {
	succeed?: boolean;
	error?: Error;
	result?: {
		title?: string;
		url?: string;
		img?: string;
		type?: string;
		score?: string;
		status?: string;
		views?: string;
		colorized?: string;
		data?: {
			url?: string;
			chapter?: string;
			time?: string;
		};
	}[];
};
export const popular = async (): Promise<ResultPopular> => {
	let Result: ResultPopular;
	try {
		const { data } = await axios.get(API_URL.popular);
		Result = {
			succeed: true,
			result: data,
		};
	} catch (e: any) {
		Result = {
			succeed: false,
			error: new Error(e),
		};
	}
	return Result;
};
export const latest = async (): Promise<ResultPopular> => {
	let Result: ResultPopular;
	try {
		const { data } = await axios.get(API_URL.latest);
		Result = {
			succeed: true,
			result: data,
		};
	} catch (e: any) {
		Result = {
			succeed: false,
			error: new Error(e),
		};
	}
	return Result;
};

type searchResult = {
	succeed: boolean;
	error?: Error;
	result?: {
		title?: string;
		url?: string;
		img?: string;
		type?: string;
		score?: string;
		genres?: string;
	}[];
};
export const search = async (
	query: string,
	page?: number
): Promise<searchResult> => {
	let Result: searchResult;
	try {
		const { data } = await axios.get(API_URL.search(query, page ? page : 1));
		if (data && Array.isArray(data)) {
			data.map((v: any) => {
				v.img = v.img.replace(/\?.*/, "");
				v.genres = v.genre.join(", ");
				delete v.genre;
			});
		} else {
			throw "data is not an Array";
		}
		Result = {
			succeed: true,
			result: data,
		};
	} catch (e: any) {
		Result = {
			succeed: false,
			error: new Error(e),
		};
	}
	return Result;
};
type DetailManga = {
	succeed: boolean;
	error?: Error;
	title?: string;
	cover?: string;
	img?: string;
	type?: string;
	author?: string;
	released?: string;
	status?: string;
	score?: string;
	genres?: string;
	synopsis?: string;
	chapters?: {
		chapter?: string;
		url?: string;
		download?: string;
	}[];
};
type DetailChapter = {
	succeed: boolean;
	error?: Error;
	title?: string;
	thumb?: string;
	chapter?: string;
	images?: string[];
};
const _detail = {
	manga: async function (url: string): Promise<DetailManga> {
		let Result: DetailManga;
		try {
			let Data: any;
			let tmp_data: DetailManga["chapters"];
			const { data } = await axios.get(url);
			if (data && Array.isArray(data)) {
				tmp_data = data[0].data;
				Data = data[0];

				Data.cover = Data.cover.replace(/\?.*/, "");
				Data.img = Data.img.replace(/\?.*/, "");

				delete Data.limit;
				delete Data.typeads;
				delete Data.version;
				delete Data.status_apk;
				delete Data.comment;
				delete Data.data;
				let tmp_genre: string[] = [];
				Data.genre.map((v: any) => {
					tmp_genre.push(v.name);
				});
				Data.genres = tmp_genre.join(", ");
				delete Data.genre;
			} else {
				throw "data is not an Array, wrong url?";
			}
			Result = {
				succeed: true,
				...Data,
				chapters: tmp_data,
			};
		} catch (e: any) {
			Result = {
				succeed: false,
				error: new Error(e), // wkwk
			};
		}
		return Result;
	},
	chapter: async function (url: string): Promise<DetailChapter> {
		let Result: DetailChapter;
		try {
			let tmp_images: DetailChapter["images"];
			const { data } = await axios.get(url);
			if (data && data.image) {
				delete data.link; // don't needed ?
				delete data.prev; // don't needed ?
				delete data.next; // don't needed ?

				data.thumb = data.thumb.replace(/\?.*/, "");
				delete data.limit;
				delete data.typeads;
				delete data.version;
				delete data.comment;
				delete data.status;
				data.images = data.image;
				delete data.image;

				// should delete?
				delete data.image2;
			} else {
				throw "data did not contains image, wrong url?";
			}
			Result = {
				succeed: true,
				...data,
			};
		} catch (e: any) {
			Result = {
				succeed: false,
				error: new Error(e),
			};
		}
		return Result;
	},
};
export const detail = async (
	url: string
): Promise<DetailManga | DetailChapter> => {
	let Result: any;
	let _Result: any = await _detail.manga(url);
	if (_Result.succeed) {
		Result = _Result;
	} else {
		_Result = await _detail.chapter(url);
		if (_Result.succeed) {
			Result = _Result;
		} else {
			Result = {
				succeed: false,
				error: new Error("Is that url correct?"),
			};
		}
	}
	return Result;
};
