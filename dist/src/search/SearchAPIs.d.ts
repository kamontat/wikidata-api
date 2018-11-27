import { AxiosRequestConfig } from "axios";
import { WikidataLanguage } from "wikidata-sdk";
import { SearchResultType } from "./SearchResult";
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
export declare class LowLevelAPIs {
    static SearchEntitiesLink(options: SearchOption): string;
    static SearchEntities(options: SearchOption): Promise<import("axios").AxiosResponse<SearchResultType>>;
}
