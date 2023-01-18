/**
 * @author FrierenDv
 * @version 1.0.0
 */
import { getPdf } from "./pdf";
export declare const bacaKomik: {
    popular: () => Promise<{
        succeed?: boolean | undefined;
        error?: Error | undefined;
        result?: {
            title?: string | undefined;
            url?: string | undefined;
            img?: string | undefined;
            type?: string | undefined;
            score?: string | undefined;
            status?: string | undefined;
            views?: string | undefined;
            colorized?: string | undefined;
            data?: {
                url?: string | undefined;
                chapter?: string | undefined;
                time?: string | undefined;
            } | undefined;
        }[] | undefined;
    }>;
    latest: () => Promise<{
        succeed?: boolean | undefined;
        error?: Error | undefined;
        result?: {
            title?: string | undefined;
            url?: string | undefined;
            img?: string | undefined;
            type?: string | undefined;
            score?: string | undefined;
            status?: string | undefined;
            views?: string | undefined;
            colorized?: string | undefined;
            data?: {
                url?: string | undefined;
                chapter?: string | undefined;
                time?: string | undefined;
            } | undefined;
        }[] | undefined;
    }>;
    search: (query: string, page?: number | undefined) => Promise<{
        succeed: boolean;
        error?: Error | undefined;
        result?: {
            title?: string | undefined;
            url?: string | undefined;
            img?: string | undefined;
            type?: string | undefined;
            score?: string | undefined;
            genres?: string | undefined;
        }[] | undefined;
    }>;
    detail: (url: string) => Promise<{
        succeed: boolean;
        error?: Error | undefined;
        title?: string | undefined;
        cover?: string | undefined;
        img?: string | undefined;
        type?: string | undefined;
        author?: string | undefined;
        released?: string | undefined;
        status?: string | undefined;
        score?: string | undefined;
        genres?: string | undefined;
        synopsis?: string | undefined;
        chapters?: {
            chapter?: string | undefined;
            url?: string | undefined;
            download?: string | undefined;
        }[] | undefined;
    } | {
        succeed: boolean;
        error?: Error | undefined;
        title?: string | undefined;
        thumb?: string | undefined;
        chapter?: string | undefined;
        images?: string[] | undefined;
    }>;
    getPdf: typeof getPdf;
};
//# sourceMappingURL=index.d.ts.map