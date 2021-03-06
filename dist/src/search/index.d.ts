import { AxiosRequestConfig } from "axios";
import { WikidataLanguage } from "wikidata-sdk";
import { RawSearchResultType } from "./SearchResult";
import { SearchCollection } from "./SearchCollection";
export declare type SearchOption = {
    search: string;
    language?: WikidataLanguage;
    limit?: string | number;
    uselang?: WikidataLanguage;
    config?: AxiosRequestConfig;
};
export declare function SearchEntities(options: SearchOption): Promise<SearchCollection>;
export declare function SearchEntity(options: SearchOption): Promise<any>;
export declare class LowLevelSearchAPIs {
    static GetLink(options: SearchOption): string;
    static GetEntities(options: SearchOption): Promise<import("axios").AxiosResponse<RawSearchResultType>>;
}
