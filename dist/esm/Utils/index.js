import axios from "axios";
import { API_URL } from "./Config.js";
export const popular = async () => {
    let Result;
    try {
        const { data } = await axios.get(API_URL.popular);
        Result = {
            succeed: true,
            result: data,
        };
    }
    catch (e) {
        Result = {
            succeed: false,
            error: new Error(e),
        };
    }
    return Result;
};
export const latest = async () => {
    let Result;
    try {
        const { data } = await axios.get(API_URL.latest);
        Result = {
            succeed: true,
            result: data,
        };
    }
    catch (e) {
        Result = {
            succeed: false,
            error: new Error(e),
        };
    }
    return Result;
};
export const search = async (query, page) => {
    let Result;
    try {
        const { data } = await axios.get(API_URL.search(query, page ? page : 1));
        if (data && Array.isArray(data)) {
            data.map((v) => {
                v.img = v.img.replace(/\?.*/, "");
                v.genres = v.genre.join(", ");
                delete v.genre;
            });
        }
        else {
            throw "data is not an Array";
        }
        Result = {
            succeed: true,
            result: data,
        };
    }
    catch (e) {
        Result = {
            succeed: false,
            error: new Error(e),
        };
    }
    return Result;
};
const _detail = {
    manga: async function (url) {
        let Result;
        try {
            let Data;
            let tmp_data;
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
                let tmp_genre = [];
                Data.genre.map((v) => {
                    tmp_genre.push(v.name);
                });
                Data.genres = tmp_genre.join(", ");
                delete Data.genre;
            }
            else {
                throw "data is not an Array, wrong url?";
            }
            Result = {
                succeed: true,
                ...Data,
                chapters: tmp_data,
            };
        }
        catch (e) {
            Result = {
                succeed: false,
                error: new Error(e), // wkwk
            };
        }
        return Result;
    },
    chapter: async function (url) {
        let Result;
        try {
            let tmp_images;
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
            }
            else {
                throw "data did not contains image, wrong url?";
            }
            Result = {
                succeed: true,
                ...data,
            };
        }
        catch (e) {
            Result = {
                succeed: false,
                error: new Error(e),
            };
        }
        return Result;
    },
};
export const detail = async (url) => {
    let Result;
    let _Result = await _detail.manga(url);
    if (_Result.succeed) {
        Result = _Result;
    }
    else {
        _Result = await _detail.chapter(url);
        if (_Result.succeed) {
            Result = _Result;
        }
        else {
            Result = {
                succeed: false,
                error: new Error("Is that url correct?"),
            };
        }
    }
    return Result;
};
//# sourceMappingURL=index.js.map