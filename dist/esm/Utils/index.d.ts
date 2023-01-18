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
export declare const popular: () => Promise<ResultPopular>;
export declare const latest: () => Promise<ResultPopular>;
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
export declare const search: (query: string, page?: number) => Promise<searchResult>;
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
export declare const detail: (url: string) => Promise<DetailManga | DetailChapter>;
export {};
//# sourceMappingURL=index.d.ts.map