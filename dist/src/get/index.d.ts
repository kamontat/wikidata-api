import { WikidataProperty, WikidataLanguage, WikidataSite } from "wikidata-sdk";
import { AxiosRequestConfig } from "axios";
declare type StringOrStringArray = string | string[];
export declare function GetEntity(from: {
    id?: StringOrStringArray;
    title?: StringOrStringArray;
}, setting?: {
    languages?: WikidataLanguage | WikidataLanguage[];
    props?: WikidataProperty | WikidataProperty[];
    sitelink?: WikidataSite;
}, config?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<any>>;
export {};
