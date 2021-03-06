import { WikidataLanguage } from "wikidata-sdk";
export declare type EntityMatchType = {
    type: string;
    language: WikidataLanguage;
    text: string;
};
export declare type SearchResultType = {
    repository: string;
    id: string;
    concepturi: string;
    title: string;
    pageid: number;
    url: string;
    label: string;
    description?: string;
    match?: EntityMatchType;
    aliases?: string[];
    [key: string]: any;
};
export declare type RawSearchResultType = {
    searchinfo: {
        search: string;
    };
    search: SearchResultType[];
};
export declare class SearchResult {
    private _id;
    readonly id: string;
    private _title;
    readonly title: string;
    private _label;
    readonly label: string;
    readonly description: string;
    readonly concepturi: string;
    readonly url: string;
    readonly pageid: number;
    readonly match: EntityMatchType | undefined;
    readonly aliases: string[];
    private information;
    constructor(queryResult: SearchResultType);
    getMoreInformation(key: string): any;
    toString(): string;
    toJSON(): SearchResultType;
}
